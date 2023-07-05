import React, { useState, useEffect } from "react";
import { ParentNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";

import { useRouter } from "next/router";

import { withRole } from '../../../utils/withAuthorization';
import axios from "axios";
import styles from "../../../styles/Home.module.css"

import StudentSchedule from "./schedule";

function ParentCalandar() {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(0);
  const deleteable = true;

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


  //Calendar Click

  const handleCalendarClick = (clickedDate) => {
     const year = clickedDate.toISOString().slice(0, 4);
     const month = clickedDate.toISOString().slice(5, 7);
     const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1).toString().padStart(2, '0');
     const modifiedClickedDate = `${year}${month}${day}`;
  
     events.map((singleEvent) =>{  
     if((singleEvent['DTSTART'].slice(0, 8) === modifiedClickedDate) && (singleEvent['EVENT-ID'] != undefined || singleEvent['EVENT-ID'] != null)) {
         setEventId(parseInt(singleEvent['EVENT-ID']))
     }}
  )



  fetchEventData();
};

//Event Data Fetching

const fetchEventData = async () => {
  try {
    const typ = JSON.parse(window.localStorage.getItem("gkcAuth"));

    const response = await axios.get('http://34.227.65.157/event/logged-user-events', {
      headers: {
        Authorization: `Bearer ${typ.accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error fetching iCalendar data:', error);
  }
};


  return (
    <>
      <ParentNavbar isLogin={true} />
        <main className="container">
          <div className={`row ${styles.calendarWrapper}`}>
            <div className="col-12 col-lg-6 pt-5">
              <Calendar 
              onClickDay={handleCalendarClick}
              /> 
            </div>
         <StudentSchedule instructorName={"Nino Glonti"} start={"11:00"} courseName={"Biology"} deleteable={deleteable}/>
         </div>
       </main>
    <Footer />
    </>
  );
}


export default withRole(StudentCalandar, ['Student']);