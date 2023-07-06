import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { withRole } from '../../../utils/withAuthorization';
import axios from "axios";
import styles from "../../../styles/Home.module.css"
import ParentSchedule from "./schedule";

function ParentCalendar() {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvent] =useState([])
  const [singleIcalEvent, setSingleIcalEvent] = useState({})
  const [instructorName, setInstructorName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null)
  const [deleteable, setDeleteable] = useState(false);
  const [noEvent, setNoEvent] = useState(false);
  const [eventId, setEventId] = useState(null)

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
              dates.push(event.DTSTART)
            });
            setEvents(events);
          } catch (error) {
            console.error('Error fetching iCalendar data:', error);
          }
        };
    fetchICalendarData();
  }, []);

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
        console.log(response.data);
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
  
      const matchedBookedEvent = bookedEvents.find((singleBooked) => singleBooked.id == selectedIcalEvent['EVENT-ID']);
  
      if (matchedBookedEvent) {
        setInstructorName(matchedBookedEvent.instructorName);
        setEventTime(matchedBookedEvent.start);
        setDeleteable(matchedBookedEvent.deleteable);
        setCourseId(matchedBookedEvent.courseId);
        //HERE WILL BE THE MEETING LINK
        setMeetingLink("meetinglink");
        setInstructorId(matchedBookedEvent.instructorId);
        setNoEvent(false);
        setEventId(matchedBookedEvent.id)
      } else {
        // Clear the states when a matching booked event is not found
        setNoEvent(true)
        setInstructorName('');
        setEventTime('');
        setDeleteable(false);
        setCourseId('');
        setMeetingLink('');
        setInstructorId('');
      }
    } else {
      // Clear the states when a matching iCal event is not found
      setNoEvent(true)
      setSingleIcalEvent(null);
      setInstructorName('');
      setEventTime('');
      setDeleteable(false);
      setCourseId('');
      setMeetingLink('');
      setInstructorId('');
    }
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
              <ParentCalendar 
               instructorName={instructorName} 
               start={eventTime} 
               courseName={courseId}
               deleteable={deleteable} 
               instructorId={instructorId} 
               meetingLink={meetingLink} 
               noEvent={noEvent}
               eventId={eventId}
               /> 
         </div>
       </main>
    <Footer />
    </>
  );
}


export default withRole(ParentCalendar, ['Student']);


