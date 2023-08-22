import { useState } from "react";
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
import { base_url } from "../../../api/client";

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
      console.log("Error deleting event:", error);
    }
  };

  // Button click handler
  const handleDeleteButtonClick = () => {
    const eventID = props.eventId;
    const date = props.start.split(" ")[0];

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

  console.log("loggesinduser", loggedInUser);
  const openChat = (chatId) => {
    setChatInfo({
      sender: {
        ...student,
      },
      receiver_user: {
        ...instructor,
      },
      chatId,
    });
  };

  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };
  console.log("props", props);
  return (
    <>
      <div className="col-12 col-lg-6">
        <h3 className={`text-center ${styles.scheduleHeader}`}>Schedule</h3>
        <div
          className={`shadow p-5 bg-white rounded ${styles.scheduleBox}`}
          style={{ minHeight: "400px" }}
        >
          <div
            onClick={() => openChat(props?.eventId)}
            className="d-flex align-items-center py-3 gap-2"
          >
            {props.noEvent ? (
              <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
                No Events Found For This Day
              </h6>
            ) : (
              <>
                <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
                  {props.instructorName}
                </h6>
                <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
                  {props.start}
                </h6>
                <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
                  {props.courseName}
                </h6>
                {props.instructorId && (
                  <BsFillChatFill
                    className="p-0 m-0 flex-fill h4 flex-fill"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                  />
                )}

                {props.meetingLink && (
                  <GoDeviceCameraVideo
                    className="p-0 m-0 flex-fill h4 flex-fill"
                    onClick={() =>
                      navigation.push(`/student/video?${props?.courseName}`)
                    }
                  />
                )}
                {props.deleteable && (
                  <RiDeleteBin6Line
                    className="p-0 m-0 h4 flex-fill"
                    onClick={handleDeleteButtonClick}
                  />
                )}
              </>
            )}
          </div>
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
                <div className=" p-3" style={{ minHeight: "400px" }}>
                  {messages.map((item, index) => {
                    let date = item.timestamp.seconds * 1000;
                    return (
                      <div
                        key={index}
                        className={`py-1 ${
                          item?.user?.id == student?.id ? "text-end" : ""
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
                    onClick={() =>
                      sendMessage({ type: "student", chatId: props.eventId })
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
