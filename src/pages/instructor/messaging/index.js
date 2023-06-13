import React, { useEffect } from "react";
import Head from "next/head";
import { TutorNavbar, Footer } from "../../../components";
import { BsFillSendFill } from "react-icons/bs";
import firebaseChatHook from "../../../hooks/firebase-chat";
import moment from "moment";
import { withRole } from '../../../utils/withAuthorization';

function InstructorMessaging() {
  const {
    sendMessage,
    messages,
    getMyChatList,
    myChatList,
    setActiveChat,
    activeChat,
    setNewMessage,
    newMessage,
    setChatInfo,
  } = firebaseChatHook();

  const instructor = {
    name: "Nouman",
    id: 1,
  };

  const student = {
    courseId: 1,
    name: "John",
    id: 2,
    parentId: 4,
  };

  useEffect(() => {
    getMyChatList(instructor.id);
    setChatInfo({
      sender: {
        ...instructor,
      },
      receiver_user: {
        ...student,
      },
      course_id: activeChat,
    });
  }, []);

  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Instructor Messaging</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <main className="container">
        <br />
        <br />
        <br />

        <div className="row" style={{ minHeight: "90vh" }}>
          <div className="col-12 col-lg-3">
            <ul className="p-0 m-0" style={{ listStyle: "none" }}>
              {myChatList?.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      item?.chatId != activeChat
                        ? setActiveChat(item.chatId)
                        : null;
                    }}
                    key={index}
                    className="p-0 m-0 fw-bold bg-light p-3 my-3 rounded "
                  >
                    {item?.receiver?.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-12 col-lg-9">
            <div
              className=" border d-flex flex-column justify-content-between p-3 rounded"
              style={{ height: "600px" }}
            >
              <div className=" p-3" style={{ minHeight: "400px" }}>
                {messages.map((item, index) => {
                  let date = item.timestamp.seconds * 1000;
                  return (
                    <div
                      key={index}
                      className={`py-1 ${
                        item?.user?.id == instructor?.id ? "text-end" : ""
                      }`}
                    >
                      <p className="p-0 m-0 fw-bold">{item.message}</p>
                      <small className="p-0 m-0">
                        {`${item?.user?.name}  ${moment(date).format(
                          "d/MM/YY"
                        )}`}{" "}
                        {moment(date).format("hh:mm a")}
                      </small>
                    </div>
                  );
                })}
              </div>

              <div className=" d-flex align-items-center px-2 gap-2">
                <input
                  value={newMessage}
                  onChange={handleTextChange}
                  type="text"
                  placeholde=""
                  className="border  p-2 rounded flex-fill"
                />{" "}
                <BsFillSendFill
                  onClick={() => sendMessage({ type: "instructor" })}
                  className="h3 p-0 m-0"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(InstructorMessaging, ['Instructor']);
