import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import styles from "../../../styles/Home.module.css";
import calendarStyles from "../../../styles/Calendar.module.css";
import StudentSchedule from "./schedule";
import { apiClient, base_url } from "../../../api/client";
import { fetchUser } from "@/store/actions/userActions";
import { useDispatch } from 'react-redux';


function StudentCalandar() {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvent] = useState([]);
  const [singleIcalEvent, setSingleIcalEvent] = useState({});
  const [instructorName, setInstructorName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instructorId, setInstructorId] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);
  const [deleteable, setDeleteable] = useState(false);
  const [noEvent, setNoEvent] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser())
      .then(() => {
        setIsLoading(false); // Data fetched successfully, set loading to false
      })
      .catch((error) => {
        setIsLoading(false); // Data fetching failed, set loading to false
        console.error(error);
      });
  }, [dispatch]);

  //iCal data fetching
  useEffect(() => {
    const fetchICalendarData = async () => {
      try {
        const typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        const response = await fetch(
          `${base_url}/event/logged-user-events-iCal`,
          {
            headers: {
              Authorization: `Bearer ${typ.accessToken}`,
            },
          }
        );
        const iCalendarData = await response.text();
        const events = [];
        const dates = [];

        const eventLines = iCalendarData.split("BEGIN:VEVENT");
        eventLines.shift();
        eventLines.forEach((eventLine) => {
          const lines = eventLine.split("\n");
          const event = {};
          lines.forEach((line) => {
            const [property, value] = line.split(":");
            if (property && value) {
              event[property] = value.replace(/\r/g, "");
            }
          });
          events.push(event);
          dates.push(event.DTSTART);
        });
        setEvents(events);
      } catch (error) {
        console.log("Error fetching iCalendar data:");
      }
    };
    fetchICalendarData();
  }, []);

  //Logged user events
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await apiClient.get("/event/logged-user-events");
        setBookedEvent(response.data);
      } catch (error) {
        console.log("Error fetching iCalendar data:", error);
      }
    };
    fetchEventData();
  }, []);

  //Calendar Click
  const handleCalendarClick = (clickedDate) => {
    const year = clickedDate.toISOString().slice(0, 4);
    const month = clickedDate.toISOString().slice(5, 7);
    const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1)
      .toString()
      .padStart(2, "0");
    const modifiedClickedDate = `${year}${month}${day}`;

    const selectedIcalEvent = events.find(
      (singleEvent) =>
        singleEvent["DTSTART"].slice(0, 8) === modifiedClickedDate &&
        singleEvent["EVENT-ID"]
    );

    if (selectedIcalEvent) {
      setSingleIcalEvent(selectedIcalEvent);
      const matchedBookedEvent = bookedEvents.find(
        (singleBooked) => singleBooked.id == selectedIcalEvent["EVENT-ID"]
      );

      if (matchedBookedEvent) {
        console.log("matchedBook event", matchedBookedEvent);
        setInstructorName(matchedBookedEvent.instructorName);
        setEventTime(matchedBookedEvent.start.split(" ")[1]);
        setDeleteable(matchedBookedEvent.deleteable);
        setCourseName(matchedBookedEvent.courseName);
        //HERE WILL BE THE MEETING LINK
        setMeetingLink("meetinglink");
        setInstructorId(matchedBookedEvent.instructorId);
        setNoEvent(false);
        setEventId(matchedBookedEvent.id);
      } else {
        // Clear the states when a matching booked event is not found
        setNoEvent(true);
        setInstructorName("");
        setEventTime("");
        setDeleteable(false);
        setCourseName("");
        setMeetingLink("");
        setInstructorId("");
      }
    } else {
      // Clear the states when a matching iCal event is not found
      setNoEvent(true);
      setSingleIcalEvent(null);
      setInstructorName("");
      setEventTime("");
      setDeleteable(false);
      // setCourseId('');
      setMeetingLink("");
      setInstructorId("");
    }
  };

  return (
    <>
      <Navbar isLogin={true} />
      <main className="container">
        {isLoading && (
          <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
          </div>
        </div>
        )}
        <div className={`row ${styles.calendarWrapper}`}>
          <div className="col-12 col-lg-6 pt-5 react-calendar-text-red">
            <Calendar
              onClickDay={handleCalendarClick}
              className={calendarStyles.reactCalendar}
            />
          </div>
          <StudentSchedule
            instructorName={instructorName}
            start={eventTime}
            courseName={courseName}
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

export default withRole(StudentCalandar, ["Student"]);


