import { useState, useEffect } from 'react';
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
import DeleteSingleClassModal from '@/components/modals/DeleteSingleClassModal';
import DeleteRecurringClassModal from '@/components/modals/DeleteRecurringEvent';
import DeleteSingleEvent from '@/services/events/DeleteSingleEvent';
import DeleteRecurringEvent from '@/services/events/DeleteRecurringEvent';
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
  } = FirebaseChat();
  const [showModal, setModal] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [enabledCamera, setEnabledCamera] = useState(false);

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

  const student = {
    courseId: props?.eventId,
    name: loggedInUser?.firstName,
    id: loggedInUser?.id,
    parentId: props?.studentParents || 0,
  };

  console.log('loggesinduser', loggedInUser);
  const openChat = (chatId) => {
    console.log('chatinfo', {
      sender: {
        id: activeChat?.studentId,
        name: activeChat?.studentName,
      },
      receiver_user: {
        id: activeChat?.instructorId,
        name: activeChat?.instructorName,
      },
      chatId,
    });

    setChatInfo({
      sender: {
        id: activeChat?.studentId,
        name: activeChat?.studentName,
      },
      receiver_user: {
        id: activeChat?.instructorId,
        name: activeChat?.instructorName,
      },
      chatId,
    });
  };

  useEffect(() => {
    if (activeChat)
      openChat(activeChat?.instructorId + '-' + activeChat?.studentId);
  }, [activeChat]);
  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Call your function here
      setNewMessage(event.target.value);
      sendMessage({
        type: 'parent',
        chatId: activeChat?.instructorId + '-' + activeChat?.studentId,
        parentInfo: {
          id: loggedInUser?.id,
          name: loggedInUser?.firstName + ' ' + loggedInUser?.lastName,
        },
      });
    }
  }

  useEffect(() => {
    if (props?.schedule) {
      let sortedarray = props?.schedule.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );
      setSchedule(sortedarray);
    }
  }, [props?.schedule]);

  const onClose = () => {
    setModal('');
    setActiveEvent('');
  };
  const handleDelete = async (activeEvent, type) => {
    try {
      if (!type) {
        console.log('activeevent', activeEvent);
        let body = {
          eventId: activeEvent?.id,
          dateToCancel: activeEvent?.start?.split('T')[0],
        };
        let res = await DeleteSingleEvent(body);
        // console.log("res", res);
      } else {
        console.log('tye', type);
        if (type === 'single') {
          let body = {
            eventId: activeEvent?.id,
            dateToCancel: activeEvent?.start?.split('T')[0],
          };
          let res = await DeleteSingleEvent(body);
        } else {
          let res = await DeleteRecurringEvent(activeEvent?.id);
        }
      }
      let filterSchedule = schedule.filter((item) => item.id != activeEvent.id);
      setSchedule(filterSchedule);
      onClose();
      props.fetchEventData();
    } catch (err) {
      console.log('err', err);
      onClose();
    }
  };
  return (
    <>
      {showModal == 'ONETIME' ? (
        <DeleteSingleClassModal
          text={'Do you wish to cancel this class?'}
          onCancel={onClose}
          onAccept={() => handleDelete(activeEvent, true)}
        />
      ) : null}
      {showModal != 'ONETIME?' && showModal ? (
        <DeleteRecurringClassModal
          text1={'Delete this class'}
          text2={'Delete this and all future classes'}
          onCancel={onClose}
          onAccept={(type) => handleDelete(activeEvent, type)}
        />
      ) : null}

      <div className="col-12 col-lg-8">
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
              {schedule &&
                schedule.map((el) => {
                  // Define the specific event time as a Date object
                  var specificEventTime = new Date(el.start.slice(0, 19));
                  var specificEventTimes = new Date(el.start.slice(0, 19));

                  var modifiedDate = new Date(
                    specificEventTime.getTime() - 10 * 60000
                  );
                  let adjustedDuration = 0;
                  let duration = el.durationInHours;
                  if (duration >= 1) {
                    adjustedDuration = duration;
                  }

                  if (duration >= 1) {
                    specificEventTimes.setHours(
                      specificEventTimes.getHours() + adjustedDuration
                    );
                  } else if (duration == 0.5) {
                    specificEventTimes.setMinutes(
                      specificEventTimes.getMinutes() + 30
                    );
                  }
                  // Get the current time as a Date object
                  var currentTime = new Date();

                  // Calculate the time difference in milliseconds
                  var timeDifference = specificEventTime - currentTime;

                  // Calculate the time difference in minutes
                  var minutesDifference = Math.floor(
                    timeDifference / (1000 * 60)
                  );

                  let currentDate = new Date();
                  let timeDifferences = modifiedDate - currentDate;

                  // Convert the difference to hours
                  let hoursDifference = timeDifferences / (1000 * 60 * 60);
                  let time = moment(el.start).format('hh:mm a');
                  var past = specificEventTime <= currentTime;
                  return (
                    <tr>
                      <td className="p-0 m-0 flex-fill fw-bold flex-fill">
                        {el.instructorName}
                      </td>

                      <td className="p-0 m-0 flex-fill fw-bold flex-fill">
                        {el?.studentName}
                      </td>
                      <td className="p-0 m-0 flex-fill fw-bold flex-fill">
                        {time}
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
                          onClick={() => {
                            setNewMessage('');
                            setActiveChat(el);
                          }}
                        />
                      </td>

                      <td>
                        {currentTime.getTime() >= modifiedDate.getTime() &&
                        currentTime < specificEventTimes ? (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/4943/4943781.png "
                            width={24}
                            alt="click here to call"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              navigation.push(`/parent/video?${el?.courseName}`)
                            }
                          />
                        ) : (
                          <GoDeviceCameraVideo
                            style={{
                              fill: 'gray',
                            }}
                            className="p-0 m-0 flex-fill h4 flex-fill"
                          />
                        )}
                      </td>
                      {hoursDifference > 12 && (
                        <td>
                          <RiDeleteBin6Line
                            onClick={() => {
                              setActiveEvent(el);
                              setModal(
                                el?.classFrequency
                                  ? el?.classFrequency
                                  : 'ONETIME'
                              );
                            }}
                            style={{ cursor: 'pointer' }}
                            fill="gray"
                            className="p-0 m-0 h4 flex-fill"
                          />
                        </td>
                      )}
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
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5368/5368396.png"
                    style={{
                      height: '25px',
                      width: '25px',
                    }}
                    onClick={() => {}}
                  />
                </button>
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
                          {`${item?.user?.name}   ${moment(date).format(
                            'MMM DD, yyyy'
                          )}`}{' '}
                          {moment(date).format('hh:mm a')}
                        </small>
                      </div>
                    );
                  })}
                </div>

                <div className=" d-flex align-items-center px-2 gap-2">
                  <input
                    autoFocus={true}
                    value={newMessage}
                    onChange={handleTextChange}
                    type="text"
                    placeholde=""
                    className="border  p-2 rounded flex-fill"
                    onKeyDown={handleKeyPress}
                  />{' '}
                  <BsFillSendFill
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      sendMessage({
                        type: 'parent',
                        chatId:
                          activeChat?.instructorId +
                          '-' +
                          activeChat?.studentId,
                        parentInfo: {
                          id: loggedInUser?.id,
                          name:
                            loggedInUser?.firstName +
                            ' ' +
                            loggedInUser?.lastName,
                        },
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
