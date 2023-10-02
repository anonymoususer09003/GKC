import { collection } from 'firebase/firestore';
import React, { useEffect, useState, useCallback } from 'react';
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
} from '../utils/config';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const useCustomFirebaseHook = () => {
  const loggedInUser = useSelector((state) => state.user?.userInfo);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatInfo, setChatInfo] = useState('');
  const [myChatList, setMyChatList] = useState([]);
  const [activeChat, setActiveChat] = useState('');
  const router = useRouter();
  let unsubscribe = null;
  const [firstTimeRender, setFirstTimeRender] = useState(false);
  // ...

  function removeDuplicatesByProperty(arr, property) {
    const seen = new Set();
    return arr.filter((item) => {
      const value = item[property];
      if (!seen.has(value)) {
        seen.add(value);
        return true;
      }
      return false;
    });
  }

  const fetchChat = async (chatInfo) => {
    try {
      setMessages([]);

      const chatId = chatInfo?.chatId;
      const messagesCollectionRef = collection(
        firestore,
        'chat',
        chatId,
        'messages'
      );
      const messagesQueryOrderBy = query(
        messagesCollectionRef,
        orderBy('timestamp')
      );
      const addedMessageIds = [];
      setFirstTimeRender(true);
      unsubscribe = onSnapshot(messagesQueryOrderBy, (snapshot) => {
        let temp = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const messageData = change.doc.data();
            const messageId = change.doc.id;

            // Check if the message ID is not already added

            temp.push({ ...messageData, chatId, messageId: change?.doc?.id });

            // Process the newly added message as needed
          }
        });

        setMessages((prevMessages) =>
          removeDuplicatesByProperty([...prevMessages, ...temp], 'messageId')
        );
      });
      // setUnsubscribe(unsubscribe);
      // Store the unsubscribe function to remove the listener later
      // when the chat document is no longer needed
      // Make sure to store the unsubscribe function in a state variable or ref
      // so that it can be accessed and called later when needed
      // For example, you can use the 'useState' hook to store the unsubscribe function:
      // setUnsubscribeFunctions((prevState) => [...prevState, unsubscribe]);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (unsubscribe) {
      unsubscribe(); // Call the unsubscribe function to end the listener
    }
  }, [activeChat, chatInfo?.chatId]);

  useEffect(() => {
    if (chatInfo && !router.pathname.includes('messaging')) {
      fetchChat(chatInfo);
    }

    // Clean up the listeners when the component unmounts
  }, [chatInfo, activeChat]);

  const resetValues = useCallback(() => {
    setMessages([]);

    setMyChatList([]);
    setActiveChat('');
    setNewMessage('');
  }, [chatInfo]);

  const getMyChatList = async (senderId) => {
    try {
      const chatCollectionRef = collection(firestore, 'chat');
      onSnapshot(chatCollectionRef, async (snapshot) => {
        // Create separate queries for each 'array-contains' condition
        const query1 = query(
          chatCollectionRef,
          where('participants', 'array-contains', senderId),
          orderBy('timestamp', 'desc')
        );

        // Execute each query and merge the results
        const [querySnapshot1] = await Promise.all([getDocs(query1)]);

        const mergedSnapshot = {
          empty: querySnapshot1.empty,
          docs: [...querySnapshot1.docs],
        };

        let messages = [];
        const addedMessageIds = []; // Track added message IDs
        let chat = [];

        for (let i = 0; i < mergedSnapshot.docs.length; i++) {
          let chatDoc = mergedSnapshot.docs[i];
          const messageSubcollectionRef = collection(chatDoc.ref, 'messages');

          // Query and fetch messages from the subcollection
          const messageSnapshot = await getDocs(messageSubcollectionRef);
          let messages = [];
          messageSnapshot.forEach((messageDoc) => {
            messages.push({ ...messageDoc.data(), messageId: messageDoc?.id });
            // Add your logic to process the messages here
          });

          chat.push({
            chatId: chatDoc.id,
            chatInfo: { ...chatDoc.data() },
            messages,
          });

          setMyChatList(chat);
          let index = 0;
          if (activeChat) {
            index = chat.findIndex((item) => item.chatId === activeChat);
          }
          let chatId = activeChat || chat[index]?.chatId;
          let otherUserId = chat[index]?.chatInfo?.participants.filter(
            (id) => id != loggedInUser?.id
          );
          let user = chat[index]?.chatInfo.userData;

          const student = {
            courseId: chatId,
            name: loggedInUser?.firstName,
            id: loggedInUser?.id,
            parentId: loggedInUser?.id,
          };

          const instructor = {
            ...user,
          };

          let users = [];
          Object?.keys(user)?.map((item) => {
            users.push(user[item]);
          });

          let body = {};
          if (loggedInUser.userType === 'Student') {
            body['sender'] = {
              ...users[1],
            };
            body['receiver_user'] = {
              ...users[0],
            };
          } else {
            body['sender'] = {
              ...users[0],
            };
            body['receiver_user'] = {
              ...users[1],
            };
          }
          setChatInfo({
            ...body,
            course_id: chatId,
          });

          setMessages(chat[0]?.messages || []);
          setActiveChat(chatId);
          fetchChat({ chatId });
        }
      });
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const createUserCollection = async (chatId, senderInfo, receiverInfo) => {
    try {
      let id = senderInfo?.id;
      const userRef = doc(firestore, 'user', id.toString());

      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        // The user document exists
        const userDocRef = doc(firestore, 'user', id.toString());

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
      console.log('Error:', err);
    }
  };

  const sendMessage = async (props) => {
    try {
      const collectionRef = collection(firestore, 'chat');

      const collectionDocRef = doc(collectionRef, props.chatId);
      // const chatDocSnapshot = collection(
      //   firestore,
      //   "chat",
      //   JSON.stringify("event" + "-" + props?.chatId)
      // );
      const chatDocSnapshot = await getDoc(collectionDocRef);

      if (chatDocSnapshot.exists()) {
        // Document exists
        const userData = chatDocSnapshot.data();

        let participantsArray = [chatInfo?.sender?.id];
        if (props.type === 'parent') {
          participantsArray.push(props?.parentInfo?.id);
        }

        if (props.type === 'student') {
          props?.parentInfo.map((item) => {
            participantsArray.push(item?.id);
          });
        }

        await updateDoc(collectionDocRef, {
          participants: arrayUnion(...participantsArray),
          timestamp: Timestamp.fromDate(new Date()),
          userData: {
            ...userData.userData,
            [chatInfo?.sender?.id]: { ...chatInfo?.sender },
            [chatInfo?.receiver_user?.id]: { ...chatInfo?.receiver_user },
          },
        });

        const messageReference = collection(
          firestore,
          'chat',
          props?.chatId,
          'messages'
        );

        await addDoc(messageReference, {
          message: newMessage,
          timestamp: Timestamp.fromDate(new Date()),
          _id: props?.chatId,
          user: props?.type == 'parent' ? props?.parentInfo : chatInfo.sender,
        });
      } else {
        const chatId = props?.chatId; // Replace with your own unique ID

        const collectionRef = collection(firestore, 'chat');

        const chatDocRef = doc(collectionRef, props.chatId);

        const participants = [
          chatInfo?.sender?.id,
          chatInfo?.receiver_user?.id,
        ];
        if (props.type === 'parent') {
          participants.push(props?.parentInfo?.id);
        }
        if (props.type === 'student') {
          props?.parentInfo.map((item) => {
            participants.push(item?.id);
          });
        }

        const chatData = {
          participants: participants,

          timestamp: Timestamp.fromDate(new Date()),
          userData: {
            [chatInfo?.sender?.id]: { ...chatInfo?.sender },
            [chatInfo?.receiver_user?.id]: { ...chatInfo?.receiver_user },
          },
          // Add other fields to the chat document as needed
        };

        await setDoc(chatDocRef, chatData);

        const messageReference = collection(chatDocRef, 'messages');

        await addDoc(messageReference, {
          message: newMessage,
          timestamp: Timestamp.fromDate(new Date()),
          _id: chatId,
          user: props?.type === 'parent' ? props?.parentInfo : chatInfo.sender,
        });
      }

      setNewMessage('');
    } catch (error) {
      console.log('Error sending message:', error);
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
    setMessages,
    resetValues,
    fetchChat,
  };
};

export default useCustomFirebaseHook;
