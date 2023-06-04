import { collection } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import {
  firestore,
  getDocs,
  firestoreCollection,
  addDoc,
  orderBy,
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
  onSnapshot,
  getDoc,
  query,
  where,
  setDoc,
} from "../utils/config";

const useCustomFirebaseHook = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatInfo, setChatInfo] = useState("");
  const [myChatList, setMyChatList] = useState([]);
  const [activeChat, setActiveChat] = useState("");

  // ...

  const fetchChat = async (chatInfo) => {
    try {
      const chatCollectionRef = collection(firestore, "chat");
      onSnapshot(chatCollectionRef, async (snapshot) => {
        // Create separate queries for each 'array-contains' condition
        const query1 = query(
          chatCollectionRef,
          where("participants", "array-contains", chatInfo?.sender?.id)
        );

        const query2 = query(
          chatCollectionRef,
          where("participants", "array-contains", chatInfo?.receiver_user?.id)
        );

        // Execute each query and merge the results
        const [querySnapshot1, querySnapshot2] = await Promise.all([
          getDocs(query1),
          getDocs(query2),
        ]);

        const mergedSnapshot = {
          empty: querySnapshot1.empty && querySnapshot2.empty,
          docs: [...querySnapshot1.docs, ...querySnapshot2.docs],
        };

        let messages = [];
        const addedMessageIds = []; // Track added message IDs

        mergedSnapshot.docs.forEach((chatDoc) => {
          const chatId = chatDoc.id;
          const messagesCollectionRef = collection(
            firestore,
            "chat",
            chatId,
            "messages"
          );
          const messagesQueryOrderBy = query(
            messagesCollectionRef,
            orderBy("timestamp")
          );

          const unsubscribe = onSnapshot(messagesQueryOrderBy, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const messageData = change.doc.data();
                const messageId = change.doc.id;
                if (!addedMessageIds.includes(messageId)) {
                  // Check if the message ID is not already added
                  messages.push({ ...messageData, chatId });
                  addedMessageIds.push(messageId); // Track added message ID
                }

                // Process the newly added message as needed
              }
            });

            // Update the state with the updated messages array
            setMessages([...messages]);
          });

          // Store the unsubscribe function to remove the listener later
          // when the chat document is no longer needed
          // Make sure to store the unsubscribe function in a state variable or ref
          // so that it can be accessed and called later when needed
          // For example, you can use the 'useState' hook to store the unsubscribe function:
          // setUnsubscribeFunctions((prevState) => [...prevState, unsubscribe]);
        });
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (chatInfo) {
      fetchChat(chatInfo);
    }

    // Clean up the listeners when the component unmounts
    // return () => {
    //   unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    // };
  }, [chatInfo]);

  const getMyChatList = async (senderId) => {
    try {
      const documentRef = doc(firestore, "user", senderId.toString());
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        // Document exists
        const documentData = documentSnapshot.data();

        setMyChatList(documentData?.chatHistory);
        let chatId = documentData?.chatHistory[0].chatId;
        setActiveChat(chatId);

        // Subscribe to real-time updates on the user document
        onSnapshot(documentRef, (doc) => {
          const updatedData = doc.data();
          setMyChatList(updatedData?.chatHistory);
          let chatId = updatedData?.chatHistory[0].chatId;
          setActiveChat(chatId);

          // Handle real-time updates here
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const createUserCollection = async (chatId, senderInfo, receiverInfo) => {
    try {
      let id = senderInfo?.id;
      const userRef = doc(firestore, "user", id.toString());

      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        // The user document exists
        const userDocRef = doc(firestore, "user", id.toString());

        await updateDoc(userDocRef, {
          chatHistory: arrayUnion({
            receiver: receiverInfo,
            chatId,
          }),
        });
      } else {
        // The user document doesn't exist, create a new one
        await setDoc(userRef, {
          chatHistory: [{ receiver: receiverInfo, chatId }],
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const sendMessage = async (props) => {
    try {
      const chatRef = firestoreCollection(firestore, "chat");

      // Create separate queries for each 'array-contains' condition
      const query1 = query(
        chatRef,
        where("participants", "array-contains", chatInfo?.sender?.id)
      );

      const query2 = query(
        chatRef,
        where("participants", "array-contains", chatInfo?.receiver_user?.id)
      );

      // Execute each query and merge the results
      const [querySnapshot1, querySnapshot2] = await Promise.all([
        getDocs(query1),
        getDocs(query2),
      ]);

      const mergedSnapshot = {
        empty: querySnapshot1.empty && querySnapshot2.empty,
        docs: [...querySnapshot1.docs, ...querySnapshot2.docs],
      };

      if (mergedSnapshot.empty) {
        const chatRef = firestoreCollection(firestore, "chat");
        const newChatRef = await addDoc(chatRef, {
          participants: [chatInfo?.sender?.id, chatInfo?.receiver_user?.id],
        });

        const messageReference = firestoreCollection(
          firestore,
          "chat",
          newChatRef.id,
          "messages"
        );

        await addDoc(messageReference, {
          message: newMessage,
          timestamp: Timestamp.fromDate(new Date()),
          _id: newChatRef.id,
          user: props?.type == "parent" ? props?.parentInfo : chatInfo.sender,
        });

        await createUserCollection(
          newChatRef.id,
          chatInfo.sender,
          chatInfo?.receiver_user
        );
        await createUserCollection(
          newChatRef.id,
          chatInfo?.receiver_user,
          chatInfo.sender
        );
      } else {
        const chatRef = firestoreCollection(firestore, "chat");
        const firstDocument = mergedSnapshot.docs[0];
        const chatDocId = firstDocument.id;
        const chatDocRef = doc(chatRef, chatDocId);
        await updateDoc(chatDocRef, {
          participants: arrayUnion(
            chatInfo?.sender?.id,
            chatInfo?.receiver_user?.id
          ),
        });
        const messageReference = firestoreCollection(
          firestore,
          "chat",
          chatDocId,
          "messages"
        );
        await addDoc(messageReference, {
          message: newMessage,
          timestamp: Timestamp.fromDate(new Date()),
          _id: chatDocId,
          user: props?.type == "parent" ? props?.parentInfo : chatInfo.sender,
        });
        await createUserCollection(
          chatDocId,
          chatInfo.sender,
          chatInfo?.receiver_user
        );
        await createUserCollection(
          chatDocId,
          chatInfo?.receiver_user,
          chatInfo.sender
        );
      }
      setNewMessage("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return {
    messages,
    sendMessage,
    newMessage,
    setNewMessage,
    chatInfo,
    setChatInfo,
    createUserCollection,
    getMyChatList,
    myChatList,
    activeChat,
    setActiveChat,
  };
};

export default useCustomFirebaseHook;
