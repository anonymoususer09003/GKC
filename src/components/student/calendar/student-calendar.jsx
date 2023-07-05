import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { withRole } from '../../../utils/withAuthorization';
import axios from "axios";
import styles from "../../../styles/Home.module.css"
import StudentSchedule from "./schedule";

function StudentCalandar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(0);
  const [bookedEvents, setBookedEvent] =useState([])
  const [bookedEventId, setbookedEventId] = useState(0);
  const [singleIcalEvent, setSingleIcalEvent] = useState({})
  const [instructorName, setInstructorName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null)
  const [deleteable, setDeleteable] = useState(false);

  //iCal data fetching
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
              console.log("parsed events", events)

              dates.push(event.DTSTART)
            });
            setEvents(events);
          } catch (error) {
            console.error('Error fetching iCalendar data:', error);
          }
        };
    fetchICalendarData();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
    
        const response = await axios.get('http://34.227.65.157/event/logged-user-events', {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        });
        
    
       // console.log(response.data.map((singleEvent) => singleEvent.id) ,"response");
        setBookedEvent(response.data);
  
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
    
     events.map((singleEvent) =>{  
       if((singleEvent['DTSTART'].slice(0, 8) === modifiedClickedDate) && (singleEvent['EVENT-ID'] != undefined || singleEvent['EVENT-ID'] != null)) {
         setSingleIcalEvent(singleEvent);
       }}
  )
  


  bookedEvents.map((singleBooked) => {
    console.log(singleBooked)

    if(singleBooked.id == (singleIcalEvent['EVENT-ID'])) {
      console.log(singleBooked)
      setInstructorName(singleBooked.instructorName);
      setEventTime(singleBooked.start);
      setDeleteable(singleBooked.deleteable);
      setCourseId(singleBooked.courseId);
      setMeetingLink(singleBooked.meetingLink);
      setInstructorId(singleBooked.instructorId);
    } 
  }
  )
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
              <StudentSchedule instructorName={instructorName} start={eventTime} courseName={courseId} deleteable={deleteable} instructorId={instructorId} meetingLink={meetingLink}/>
            
         </div>
       </main>
    <Footer />
    </>
  );
}


export default withRole(StudentCalandar, ['Student']);



 /*
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

