import React, { useEffect } from 'react';
import Head from 'next/head';
import { TutorNavbar, Footer } from '../../../components';
import { BsFillSendFill } from 'react-icons/bs';
import firebaseChatHook from '../../../hooks/firebase-chat';
import moment from 'moment';
import { withRole } from '../../../utils/withAuthorization';
import { useSelector } from 'react-redux';
import { fetchUser } from '@/store/actions/userActions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

function InstructorMessaging() {
  const {
    sendMessage,
    messages,
    getMyChatList,
    myChatList,
    setActiveChat,
    chatInfo,
    activeChat,
    setNewMessage,
    newMessage,
    setChatInfo,
    setMessages,
    resetValues,
    fetchChat,
  } = firebaseChatHook();

  const loggedInUser = useSelector((state) => state.user?.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      console.log('loggedinuser', loggedInUser);
      getMyChatList(loggedInUser?.id || 51);
    }
  }, [loggedInUser]);

  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Instructor Messaging</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <TutorNavbar isLogin={true} />
      <main className="container">
        <br />
        <br />
        <br />

        <div className="row" style={{ minHeight: '90vh' }}>
          <div className="col-12 col-lg-3">
            <ul className="p-0 m-0" style={{ listStyle: 'none' }}>
              {myChatList?.map((item, index) => {
                let otherUserId = item.chatInfo.participants.filter(
                  (id) => id != loggedInUser?.id
                );
                let user = item.chatInfo.userData[otherUserId[0]];
                return (
                  <li
                    onClick={() => {
                      if (item?.chatId != activeChat) {
                        setActiveChat(item.chatId);
                        setMessages([]);
                        fetchChat({ chatId: item?.chatId });
                        let filterchat = myChatList?.filter(
                          (chat) => chat.chatId === item.chatId
                        );
                      }
                    }}
                    key={index}
                    className="p-0 m-0 fw-bold bg-light p-3 my-3 rounded "
                  >
                    {user?.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-12 col-lg-9">
            <div
              className=" border d-flex flex-column justify-content-between p-3 rounded"
              style={{ height: '600px' }}
            >
              <div
                className=" p-3"
                style={{ minHeight: '400px', overflow: 'scroll' }}
              >
                {messages.map((item, index) => {
                  let date = item.timestamp.seconds * 1000;
                  return (
                    <div
                      key={index}
                      className={`py-1 ${
                        item?.user?.id == loggedInUser?.id ? 'text-end' : ''
                      }`}
                    >
                      <p className="p-0 m-0 fw-bold">{item.message}</p>
                      <small className="p-0 m-0">
                        {`${item?.user?.name}  ${moment(date).format(
                          'DD/MM/YY'
                        )}`}{' '}
                        {moment(date).format('hh:mm a')}
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
                />{' '}
                <BsFillSendFill
                  onClick={() => sendMessage({ chatId: chatInfo?.course_id })}
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
