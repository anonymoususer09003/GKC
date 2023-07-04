import styles from "../../../styles/Home.module.css"
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import moment from "moment";
import FirebaseChat from "../../../hooks/firebase-chat";

const StudentSchedule = (props) => {
  const router = useRouter();
  const { sendMessage, messages, setChatInfo, setNewMessage, newMessage } = FirebaseChat();

  const handleDelete = () => {
    // Perform the delete action here
    console.log('Delete action triggered');
  };
  
  // THIS PROBABLY DOES NOT WORK, HAS TO BE DONE --- VIDEO
  const onContinue = () => {
    router.push("/instructor/video");
  };


  //MESSAGES ALSO PROBABLY NEEDS TO BE CHECKED --- MESSAGE

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

  const parent = {
    courseId: 1,
    name: "John",
    id: 4,
  };

  const openChat = (chatId) => {
    setChatInfo({
      sender: {
        ...student,
      },
      receiver_user: {
        ...instructor,
      },
      course_id: chatId,
    });
  };

  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
    <div className="col-12 col-lg-6">
       <h3 className={`text-center ${styles.scheduleHeader}` } >Schedule</h3>
       <div
         className={`shadow p-5 bg-white rounded ${styles.scheduleBox}`}
         style={{ minHeight: "400px" }}
       >
        <div
          onClick={() => openChat(1)}
          className="d-flex align-items-center py-3 gap-2"
        >
         <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
            {props.instructorName}
          </h6>
         <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">{props.start}</h6>
         <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">{props.courseName}</h6>

         <BsFillChatFill
           className="p-0 m-0 flex-fill h4 flex-fill"
           data-bs-toggle="modal"
           data-bs-target="#exampleModal2"
         />
   
         <GoDeviceCameraVideo
           className="p-0 m-0 flex-fill h4 flex-fill"
           onClick={() => onContinue()}
         />
         {props.deleteable && (
           <RiDeleteBin6Line className="p-0 m-0 h4 flex-fill" onClick={handleDelete}/>
         )}
      </div>
      </div> 
    </div>

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
                       item?.user?.id == parent?.id ? "text-end" : ""
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
                   sendMessage({ type: "student" })
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
  )
}
export default StudentSchedule;