import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import axios from 'axios';
import calendarStyles from '../../../styles/Calendar.module.css';
import styles from '../../../styles/Home.module.css';
import ParentSchedule from './schedule';
import { apiClient, base_url } from '../../../api/client';
import { fetchUser } from '@/store/actions/userActions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
function ParentCalendar() {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());
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
        const response = await apiClient.get('/event/logged-user-events');

        console.log('response events', response);
        // console.log('EVENT DATAAAA',response.data)
        setBookedEvent(response.data);
      } catch (error) {
        console.log('Error fetching iCalendar data:', error);
      }
    };
    fetchEventData();
  }, []);

  //Calendar Click
  const handleCalendarClick = (clickedDate) => {
    const year = clickedDate.toISOString().slice(0, 4);
    const month = clickedDate.toISOString().slice(5, 7);
    const day = moment(clickedDate).format('DD');

    const modifiedClickedDate = `${year}-${month}-${day}`;

    setSelectedDate(modifiedClickedDate);
    const eventsArray = [];
    bookedEvents.map((el) => {
      el.start.slice(0, 10) === modifiedClickedDate
        ? eventsArray.push(el)
        : null;
    });

    console.log(eventsArray);
    setEvents(eventsArray);
  };

  useEffect(() => {
    var currentDate = new Date();
    if (bookedEvents.length > 0) {
      if (new Date().toString().includes('GMT+')) {
        currentDate.setDate(currentDate.getDate() - 1);
        //      currentDate.setDate(currentDate.getDate());
      }

      handleCalendarClick(currentDate);
    } else {
      const year = currentDate.toISOString().slice(0, 4);
      const month = currentDate.toISOString().slice(5, 7);
      const day = moment(currentDate).format('DD');

      const modifiedClickedDate = `${year}-${month}-${day}`;
      setSelectedDate(modifiedClickedDate);
    }
  }, [bookedEvents]);

  console.log('events', events);
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
            <Calendar onClickDay={handleCalendarClick} />
          </div>
          <ParentSchedule schedule={events} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(ParentCalendar, ['Parent']);
