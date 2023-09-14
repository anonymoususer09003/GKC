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
import { useDispatch } from "react-redux";

function StudentCalandar() {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [dispatch]);

  //Logged user events
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await apiClient.get("/event/logged-user-events");
        // console.log('EVENT DATAAAA',response.data)
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
    const modifiedClickedDate = `${year}-${month}-${day}`;
    const eventsArray = []
    bookedEvents.map(el =>
      el.start.slice(0,10) === modifiedClickedDate ? eventsArray.push(el) : null
    )

    console.log(eventsArray)
    setEvents(eventsArray)
  };

  return (
    <>
      <Navbar isLogin={true} />
      <main className="container">
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
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
            schedule={events}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(StudentCalandar, ["Student"]);