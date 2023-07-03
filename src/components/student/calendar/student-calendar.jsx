import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import moment from "moment";
import FirebaseChat from "../../../hooks/firebase-chat";
import { withRole } from '../../../utils/withAuthorization';
import axios from "axios";
import styles from "../../../styles/Home.module.css"
import ICAL from "ical.js"
import  parseICS  from 'ics-parser';

function StudentCalandar() {
  const navigation = useRouter();
  const { sendMessage, messages, setChatInfo, setNewMessage, newMessage } =
    FirebaseChat();
  const [value, onChange] = useState(new Date());
  const [fetchedDate, fetcheDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([])

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([])


  const handleCalendarClick = (clickedDate) => {
    console.log("hey", clickedDate.toISOString())
    console.log("event dates", eventDate)
  // Find the event matching the clicked date
  let clickedDateISOString; 
  let eventStartISOString
 /* const clickedEvent = events.find((event) => {
    clickedDateISOString = clickedDate.toISOString();
    eventStartISOString = event.DTSTART;

  });
  if (eventStartISOString.startsWith(clickedDateISOString)) {
    setSelectedEvent(clickedEvent);

  } 
  console.log(selectedEvent, "me var nulii")
  */
};



  useEffect(() => {
        const fetchICalendarData = async () => {
          try {
            const typ = JSON.parse(window.localStorage.getItem("gkcAuth"));

            const response = await fetch('http://34.227.65.157/event/logged-user-events-iCal', {
              headers: {
                Authorization: `Bearer ${typ.accessToken}`,
              },
            });
            const iCalendarData = await response.text();
            const events = [];
            const eventLines = iCalendarData.split('BEGIN:VEVENT');
            eventLines.shift();
            eventLines.forEach(eventLine => {
              const lines = eventLine.split('\n');
              const event = {};
              const dates = []
              lines.forEach(line => {
                const [property, value] = line.split(':');
                if (property && value) {
                  event[property] = value.replace(/\r/g, '');

                }
              });
              events.push(event);
              dates.push(event.DTSTART)
              console.log(dates, "datesss")
            });
        
            console.log('Parsed iCalendar data:', events);
            setEvents(events);
            setEventDate(dates)
          } catch (error) {
            console.error('Error fetching iCalendar data:', error);
          }
        };
    fetchICalendarData();
  }, []);


const tileContent = ({ date, view }) => {
  if (view === 'month') {
    const event = events.find((event) => event.dtStart.getTime() === date.getTime());
    // const event = events.find((event) =>console.log(date.getTime()));
    if (event) {
      return 'event-day';
    }
  }

  return null;
};


const tileDisabled = ({ date }) => {
  // return unavailableDates.some((disabledDay) => date.start.toDateString() === disabledDay.toDateString());
  return unavailableDates.some((disabledDay) => date.toDateString() === disabledDay.start.toDateString());
};
  return (
    <>
      <Navbar isLogin={true} />
      <main className="container">
      <div className={`row ${styles.calendarWrapper}`}>
        <div className="col-12 col-lg-6 pt-5">
           <Calendar 
             onClickDay={handleCalendarClick}
   
           /> 
        </div>
  {/* 
        <Calendar 
    onClickDay={onCalendarClick}
    value={value} 
    tileDisabled={tileDisabled}
    tileClassName={tileContent}
  />
  */}
</div>
      


 
      </main>
      <Footer />
    </>
  );
}


export default withRole(StudentCalandar, ['Student']);



 /*
  const onContinue = () => {
    navigation.push("/instructor/video");
  };
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

;

const getEvents = async () => {
  try {
    var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
    const res = await axios.get("http://34.227.65.157/instructor/events-iCal?instructorId=44", {
    headers: {
      Authorization: `Bearer ${typ.accessToken}`,
    },
  });
  console.log(res.data);
  // setProfile(res.data);
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};



  const loogeduserdata = async () => {
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.get("http://34.227.65.157/user/logged-user-details", {
      headers: {
        Authorization: `Bearer ${typ.accessToken}`,
      },
    });
    console.log(res.data);
    // setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };



  const getUnavailableDays = async () => {
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.post(
        "http://34.227.65.157/instructor/unavailable-day",
        {
          date: "2000-12-31",
        },
        {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        }
      );
      console.log(res);
      // setProfile(res.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
 */


  /*

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
                     sendMessage({ type: "parent", parentInfo: parent })
                   }
                   className="h3 p-0 m-0"
                 />
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  */