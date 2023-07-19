import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, TutorNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import moment from "moment";
import FirebaseChat from "../../../hooks/firebase-chat";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import { parseISO, format } from 'date-fns'
import styles from "../../../styles/Home.module.css"
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import { fetchUser } from "@/store/actions/userActions";
import InstructorSchedule from "./instructor-schedule";
import calendarStyles from "../../../styles/Calendar.module.css"


function InstructorCalendar() {
  const navigation = useRouter();
  const loggedInUser = useSelector((state) => state.user.userInfo)

  const { sendMessage, messages, setChatInfo, setNewMessage, newMessage } =
    FirebaseChat();
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvent] =useState([])
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [eventTime, setEventTime] = useState("");
  const [eventId, setEventId] = useState(null)
  const dispatch = useDispatch();
  const [meetingLink, setMeetingLink] = useState(null)
  const [deleteable, setDeleteable] = useState(false);
  const [noEvent, setNoEvent] = useState(false);
  const [student, setStudent] = useState("")
  const [courseName, setCourseName] = useState("")
  const [singleIcalEvent, setSingleIcalEvent] = useState({})
  const [studentId, setStudentId] = useState("");



  const onContinue = () => {
    navigation.push("/instructor/video");
  };

  //iCal data fetching
  useEffect(() => {
    const fetchICalendarData = async () => {
      try {
        const typ = JSON.parse(window.localStorage.getItem("gkcAuth"));

        const response = await fetch(`http://34.227.65.157/instructor/events-iCal?instructorId=${loggedInUser.id}`, {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        });
        const iCalendarData = await response.text();
        const events = [];
        const dates = []

        const eventLines = iCalendarData.split('BEGIN:VEVENT');
        eventLines.shift();
        eventLines.forEach(eventLine => {
          const lines = eventLine.split('\n');
          const event = {};
          lines.forEach(line => {
            const [property, value] = line.split(':');
            if (property && value) {
              event[property] = value.replace(/\r/g, '');
            }
          });
          events.push(event);
          dates.push(event.DTSTART)
        });
        setEvents(events);
      } catch (error) {
        console.error('Error fetching iCalendar data:', error);
      }
    };
fetchICalendarData();
}, [loggedInUser]);

    //Logged user events
    useEffect(() => {
        const fetchEventData = async () => {
          try {
            const typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        
            const response = await axios.get('http://34.227.65.157/event/logged-user-events', {
              headers: {
                Authorization: `Bearer ${typ.accessToken}`,
              },
            });
            
        
            setBookedEvent(response.data);
            console.log("events", response.data)
          } catch (error) {
            console.error('Error fetching iCalendar data:', error);
          }
        };
        fetchEventData();
      }, [])
    
    //Calendar Click
     const handleCalendarClick = (clickedDate) => {
       const year = clickedDate.toISOString().slice(0, 4);
       const month = clickedDate.toISOString().slice(5, 7);
       const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1).toString().padStart(2, '0');
       const modifiedClickedDate = `${year}${month}${day}`;
     
       const selectedIcalEvent = events.find((singleEvent) => singleEvent['DTSTART'].slice(0, 8) === modifiedClickedDate && singleEvent['EVENT-ID']);
     
       if (selectedIcalEvent) {
         setSingleIcalEvent(selectedIcalEvent);
        bookedEvents.find((singleBooked) => singleBooked.id == selectedIcalEvent['EVENT-ID']);
        
         const matchedBookedEvent = bookedEvents.find((singleBooked) => singleBooked.id == selectedIcalEvent['EVENT-ID']);
         if (matchedBookedEvent) {
           setStudent(matchedBookedEvent.studentName);
           setEventTime(matchedBookedEvent.start);
           setDeleteable(matchedBookedEvent.deleteable);
           //HERE WILL BE THE MEETING LINK
           setMeetingLink("meetinglink");
           setNoEvent(false);
           setEventId(matchedBookedEvent.id);
           setCourseName(matchedBookedEvent.courseName)
           setStudentId(matchedBookedEvent.studentId);
       } else {
         // Clear the states when a matching booked event is not found
         setNoEvent(true)
         setEventTime('');
         setDeleteable(false);
         setMeetingLink('');
         setStudentId("")
       }
     } else {
       // Clear the states when a matching iCal event is not found
         setNoEvent(true)
         setSingleIcalEvent(null);
         setEventTime('');
         setDeleteable(false);
         setMeetingLink('');
         setStudentId("")
     }
   };
   

  return (
    <>
      <Navbar isLogin={true} />
        <main className="container-fluid">
        <div>
        <div className={`row ${styles.calendarWrapper}`}>
          <div className="col-12 col-lg-6 ">
            <div
              className="d-flex justify-content-end p-2"
              onClick={() => navigation.push("/instructor/editcalandar")}
            >
              <FiEdit style={{ fontSize: "24px" }} />
            </div>
            <Calendar 
              onClickDay={handleCalendarClick}
              className={calendarStyles.reactCalendar}
            />
          </div>
           <InstructorSchedule 
             studentName={student}
             start={eventTime}
             courseName={courseName}
             meetingLink={meetingLink} 
             deleteable={deleteable} 
             noEvent={noEvent}
             eventId={eventId}
             studentId={studentId}
           />
           </div>
         <Footer />
        </div>
      </main>
    </>
  );
}


export default withRole(InstructorCalendar, ["Instructor"]);
