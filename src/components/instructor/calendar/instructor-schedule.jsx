import { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/Home.module.css";
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import moment from "moment";
import FirebaseChat from "../../../hooks/firebase-chat";
import axios from "axios";
import { useSelector } from "react-redux";
import GetUserByid from "@/services/user/GetUserByid";
const InstructorSchedule = (props) => {
  const router = useRouter();
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const navigation = useRouter();
  const {
    sendMessage,
    messages,
    setChatInfo,
    setNewMessage,
    newMessage,
    setMessages,
  } = FirebaseChat();
  const [student, setStudent] = useState();
  const [chat, setChat] = useState([]);

  const [enabledCamera, setEnabledCamera] = useState(false);
  console.log("props", props);
  useEffect(() => {
    setChat([...chat, messages]);
  }, [messages]);
  const deleteSingleOccurrence = async (eventId, dateToCancel) => {
    try {
      const response = await axios.delete(
        'http://34.227.65.157/event/delete-single-occurrence',
        {
          data: {
            eventId: eventId,
            dateToCancel: dateToCancel,
          },
        }
      );

      console.log('Event deletion successful:', response.data);
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
    name: loggedInUser?.firstName,
    id: loggedInUser?.id,
  };

  // const student = {
  //   courseId: 1,
  //   name: "John",
  //   id: 2,
  //   parentId: 4,
  // };
  const getParticipantsDetail = async (id) => {
    if( loggedInUser?.id !== undefined){
      try {
        const res = await GetUserByid(loggedInUser?.id);
        setStudent({
          courseId: props?.eventId,
          name: res.data?.fullName,
          id: res.data?.userId,
          parentId: res.data?.parents?.length > 0 ? res.data.parents[0]?.id : "",
        });
        console.log("res------", res.data);
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  console.log("student", student);
  useEffect(() => {
    getParticipantsDetail(props?.studentId);
  }, [props?.eventId]);

  const openChat = useCallback(
    (chatId) => {
      setChatInfo({
        sender: {
          ...student,
        },
        receiver_user: {
          ...instructor,
        },
        chatId,
      });
    },
    [student, loggedInUser]
  );
  console.log("logged in user,", loggedInUser);
  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };

  console.log("message", messages);
  console.log("props", props.eventId);
  return (
    <>
      <div className="col-12 col-lg-6">
        <h3 className={`text-center ${styles.scheduleHeader}`}>Schedule</h3>
        <div
          className={`shadow p-5 bg-white rounded ${styles.scheduleBox}`}
          style={{ minHeight: "400px", maxHeight:620, overflow:'scroll', overflowX:'hidden' }}
        >
          {
            props.schedule.length === 0 &&
            <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
              No Events Found For This Day
            </h6>
          }
          {
            props.schedule && props.schedule.map((el)=>{
              return (
                <div
                onClick={() => openChat(el?.id)}
                className="d-flex py-3 gap-2"
                style={{flexDirection:'column'}}
              >
                      <div
                      style={{display:'flex', gap:20}}>
                      <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
                        {el.studentName}
                      </h6>
                      <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
                        {el.start.split(' ')[1]}
                      </h6>
                      <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
                        {el.courseName + (el.eventInterview ? ' (INTERVIEW)': '')}
                      </h6>
                      {el.instructorId && (
                        <BsFillChatFill
                          style={{fill:'blue', cursor:'pointer'}}
                          className="p-0 m-0 flex-fill h4"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal2"
                        />
                      )}
      
                      {!el.eventInPerson && (
                        <GoDeviceCameraVideo
                          style={{fill:'green', cursor:'pointer'}}
                          className="p-0 m-0 flex-fill h4 flex-fill"
                          onClick={() =>
                            navigation.push(`/student/video?${el?.courseName}`)
                          }
                        />
                      )}
                      {el.deleteable && (
                        <RiDeleteBin6Line
                        style={{cursor:'pointer'}}
                          fill="gray"
                          className="p-0 m-0 h4 flex-fill"
                          onClick={handleDeleteButtonClick}
                        />
                      )}
                    </div>
              </div>
              )
            })
          }
        </div>
      </div>

      {/* CHAT MODAL NEEDS TO BE FIXED */}
      <div className="d-flex justify-content-center align-items-center">
        <div
          // onClick={() => setMessages([])}
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
                          item?.user?.id == parent?.id ? 'text-end' : ''
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
                      sendMessage({ type: 'instructor', chatId: props.eventId })
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
export default InstructorSchedule;
