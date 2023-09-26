import { useEffect, useState } from 'react';
import styles from '../../../styles/Home.module.css';
import { BsFillChatFill, BsFillSendFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import moment from 'moment';
import FirebaseChat from '../../../hooks/firebase-chat';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { base_url } from '../../../api/client';

const StudentSchedule = (props) => {
  const navigation = useRouter();
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const {
    sendMessage,
    messages,
    setChatInfo,
    setNewMessage,
    newMessage,
    setMessages,
    chatInfo,
  } = FirebaseChat();
  console.log('chat infi', chatInfo);
  const [activeChat, setActiveChat] = useState(null);

  const deleteSingleOccurrence = async (eventId, dateToCancel) => {
    try {
      const response = await axios.delete(
        `${base_url}/event/delete-single-occurrence`,
        {
          data: {
            eventId: eventId,
            dateToCancel: dateToCancel,
          },
        }
      );
    } catch (error) {
      console.log('Error deleting event:', error);
    }
  };

  // Button click handler
  const handleDeleteButtonClick = () => {
    const eventID = props.eventId;
    const date = props.start.split(' ')[0];

    deleteSingleOccurrence(eventID, date);
  };

  //MESSAGES ALSO PROBABLY NEEDS TO BE CHECKED --- MESSAGE

  const instructor = {
    name: props?.instructorName,
    id: props?.instructorId,
  };
  console.log('props', props);
  const student = {
    name: loggedInUser?.firstName,
    id: loggedInUser?.id,
  };

  console.log('loggesinduser', loggedInUser);
  const openChat = (chatId) => {
    setChatInfo({
      sender: {
        ...student,
      },
      receiver_user: {
        id: activeChat?.instructorId,
        name: activeChat?.instructorName,
      },
      chatId,
    });
  };
  useEffect(() => {
    if (activeChat) openChat(activeChat?.instructorId + '-' + loggedInUser?.id);
  }, [activeChat]);
  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };
  console.log('props', props);
  return (
    <>
      <div className="col-12 col-lg-6">
        <h3 className={`text-center ${styles.scheduleHeader}`}>Schedule</h3>
        <div
          className={`shadow p-5 bg-white rounded ${styles.scheduleBox}`}
          style={{
            minHeight: '400px',
            maxHeight: 620,
            overflow: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <table style={{ width: '100%' }}>
            <tbody>

            
            {props.schedule.length === 0 && (
              <tr>
                <td className="p-0 m-0 flex-fill fw-bold flex-fill">
                  No Events Found For This Day
                </td>
              </tr>
            )}
            {props.schedule &&
              props.schedule.map((el) => {
                // Define the specific event time as a Date object
                var specificEventTime = new Date(el.start);

                // Get the current time as a Date object
                var currentTime = new Date();

                // Calculate the time difference in milliseconds
                var timeDifference = specificEventTime - currentTime;

                // Calculate the time difference in minutes
                var minutesDifference = Math.floor(
                  timeDifference / (1000 * 60)
                );
                var past = specificEventTime <= currentTime;
                return (
                  <tr>
                    <td className="p-0 m-0 flex-fill fw-bold flex-fill">
                      {el.instructorName}
                    </td>
                    <td className="p-0 m-0 flex-fill fw-bold flex-fill">
                      {el.start.split(' ')[1]}
                    </td>
                    <td className="p-0 m-0 flex-fill fw-bold flex-fill">
                      {el.courseName +
                        (el.eventInterview ? ' (INTERVIEW)' : '')}
                    </td>
                    <td>
                      <BsFillChatFill
                        style={{ fill: 'blue', cursor: 'pointer' }}
                        className="p-0 m-0 flex-fill h4"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                        onClick={() => setActiveChat(el)}
                      />
                    </td>

                    <td>
                      <GoDeviceCameraVideo
                        style={{
                          fill:
                            minutesDifference >= 10 || past ? 'gray' : 'green',
                          cursor: 'pointer',
                        }}
                        className="p-0 m-0 flex-fill h4 flex-fill"
                        onClick={() => {
                          if (minutesDifference >= 10 || past) {
                            null;
                          } else {
                            navigation.push(`/student/video?${el?.courseName}`);
                          }
                        }}
                      />
                    </td>
                    <td>
                      <RiDeleteBin6Line
                        style={{ cursor: 'pointer' }}
                        fill="gray"
                        className="p-0 m-0 h4 flex-fill"
                        onClick={handleDeleteButtonClick}
                      />
                    </td>
                  </tr>
                );
              })}
              </tbody>
          </table>
        </div>
      </div>

      {/* CHAT MODAL NEEDS TO BE FIXED */}
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModal2Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="d-flex justify-content-between">
                <h5 className="modal-title" id="exampleModal2Label"></h5>
                <button
                  onClick={() => {
                    setMessages([]);
                  }}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className=" p-3" style={{ minHeight: '400px' }}>
                  {messages.map((item, index) => {
                    let date = item.timestamp.seconds * 1000;
                    return (
                      <div
                        key={index}
                        className={`py-1 ${
                          item?.user?.id == student?.id ? 'text-end' : ''
                        }`}
                      >
                        <p className="p-0 m-0 fw-bold">{item.message}</p>
                        <small className="p-0 m-0">
                          {`${item?.user?.name}  ${moment(date).format(
                            'd/MM/YY'
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
                    onClick={() =>
                      sendMessage({
                        type: 'student',
                        chatId:
                          activeChat?.instructorId + '-' + loggedInUser?.id,
                      })
                    }
                    className="h3 p-0 m-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentSchedule;
