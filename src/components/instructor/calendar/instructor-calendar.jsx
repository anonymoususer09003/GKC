import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, TutorNavbar, Footer } from '../../../components';
import Calendar from 'react-calendar';
import { BsFillChatFill, BsFillSendFill } from 'react-icons/bs';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import moment from 'moment';
import FirebaseChat from '../../../hooks/firebase-chat';
import { withRole } from '../../../utils/withAuthorization';
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import styles from '../../../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/actions/userActions';
import InstructorSchedule from './instructor-schedule';
import calendarStyles from '../../../styles/Calendar.module.css';
import { base_url, apiClient } from '../../../api/client';

function InstructorCalendar() {
  const navigation = useRouter();

  const { sendMessage, messages, setChatInfo, setNewMessage, newMessage } =
    FirebaseChat();
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvent] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [eventTime, setEventTime] = useState('');
  const [eventId, setEventId] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);
  const [deleteable, setDeleteable] = useState(false);
  const [noEvent, setNoEvent] = useState(false);
  const [student, setStudent] = useState('');
  const [courseName, setCourseName] = useState('');
  const [singleIcalEvent, setSingleIcalEvent] = useState({});
  const [studentId, setStudentId] = useState('');
  const [studentDetail, setStudentDetail] = useState(null);
  const [parentsId, setParentId] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const disabledDates = [];

  function guessContinent(timeZone) {
    const americaIdentifiers = [
      'America/',
      'US/',
      'Canada/',
      'Mexico/',
      'Argentina/',
      'Brazil/',
      'Chile/',
      'Colombia/',
    ];

    const europeIdentifiers = [
      'Asia/',
      'Europe/',
      'London/',
      'Paris/',
      'Berlin/',
      'Madrid/',
      'Rome/',
      'Athens/',
    ];

    for (const identifier of americaIdentifiers) {
      if (timeZone.startsWith(identifier)) {
        return 'America';
      }
    }

    for (const identifier of europeIdentifiers) {
      if (timeZone.startsWith(identifier)) {
        return 'Europe';
      }
    }

    // If neither America nor Europe is found, return "Unknown"
    return 'Unknown';
  }

  // // Example usage:
  // const timeZone = 'America/New_York'; // You can change this to test different time zones
  // const continent = guessContinent(timeZone);
  // console.log(`The time zone "${timeZone}" is in ${continent} continent.`);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      setUserInfoLoaded(true);
    }
  }, [loggedInUser]);

  const onContinue = () => {
    navigation.push('/instructor/video');
  };

  //iCal data fetching
  useEffect(() => {
    const fetchICalendarData = async () => {
      try {
        const typ = JSON.parse(window.localStorage.getItem('gkcAuth'));

        if (userInfoLoaded) {
          const response = await fetch(
            `${base_url}/instructor/events-iCal?instructorId=${loggedInUser.id}`,
            {
              headers: {
                Authorization: `Bearer ${typ.accessToken}`,
              },
            }
          );

          const iCalendarData = await response.text();
          const events = [];
          const dates = [];

          const eventLines = iCalendarData.split('BEGIN:VEVENT');
          eventLines.shift();
          eventLines.forEach((eventLine) => {
            const lines = eventLine.split('\n');
            const event = {};
            lines.forEach((line) => {
              const [property, value] = line.split(':');
              if (property && value) {
                event[property] = value.replace(/\r/g, '');
              }
            });
            events.push(event);
            dates.push(event.DTSTART);
          });
        }
      } catch (error) {
        console.log('Error fetching iCalendar data:', error);
      }
    };
    fetchICalendarData();

    const fetchUnavailableDates = async () => {
      try {
        const responce = await apiClient(
          `/instructor/unavailable-days-in-logged-instructor-TimeZone`
        );

        responce.data.forEach((el) => {
          let time = el.start;

          disabledDates.push(new Date(time));
        });

        setUnavailableDates(disabledDates);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUnavailableDates();
  }, [loggedInUser]);

  //Logged user events
  const fetchEventData = async () => {
    try {
      const typ = JSON.parse(window.localStorage.getItem('gkcAuth'));

      const response = await apiClient.get('/event/logged-user-events');

      let temp = [];
      response?.data.map((item) => {
        const formattedDate = new Date(item.start).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        temp.push({
          ...item,
          formattedDate,
        });
      });
      setBookedEvent(temp || []);
    } catch (error) {
      console.log('Error fetching iCalendar data:', error);
    }
  };
  useEffect(() => {
    fetchEventData();
  }, []);

  //Calendar Click
  const handleCalendarClick = (clickedDate) => {
    const year = clickedDate.toISOString().slice(0, 4);
    const month = clickedDate.toISOString().slice(5, 7);
    const day = moment(clickedDate).format('DD');

    const modifiedClickedDate = `${day}/${month}/${year}`;

    // setSelectedDate(modifiedClickedDate);
    const eventsArray = [];
    bookedEvents.map((el) => {
      el.formattedDate === modifiedClickedDate ? eventsArray.push(el) : null;
    });

    setEvents(eventsArray);
  };
  useEffect(() => {
    var currentDate = new Date();
    if (bookedEvents.length > 0) {
      if (new Date().toString().includes('GMT+')) {
        currentDate.setDate(currentDate.getDate() - 1);
      }

      handleCalendarClick(currentDate);
    }
  }, [bookedEvents]);

  return (
    <>
      <Navbar isLogin={true} role="instructor" />
      <main className="container-fluid">
        <div>
          <div className={`row ${styles.calendarWrapper}`}>
            <div className="col-12 col-lg-6 ">
              <div
                className="d-flex justify-content-end p-2"
                onClick={() => navigation.push('/instructor/editcalandar')}
              >
                <p className="tw-font-semibold tw-text-[#f48342] tw-text-lg tw-mx-auto">
                  Edit to add days you don't intend to work (vacation, holiday,
                  etc.) &rarr;
                </p>
                <FiEdit style={{ fontSize: '24px', cursor: 'pointer' }} />
              </div>
              <Calendar
                // style={calendarStyles}
                onChange={handleCalendarClick}
                // onClickDay={}
                // selectRange={true}
                className={calendarStyles.reactCalendar}
                tileDisabled={
                  unavailableDates.length !== 0
                    ? ({ date, view }) =>
                        view === 'month' &&
                        unavailableDates.some((disabledDate) => {
                          return (
                            new Date(date).getFullYear() ===
                              new Date(disabledDate).getFullYear() &&
                            new Date(date).getMonth() ===
                              new Date(disabledDate).getMonth() &&
                            new Date(date).getDate() ===
                              new Date(disabledDate).getDate()
                          );
                        })
                    : () => false
                }
              />
            </div>
            <InstructorSchedule
              fetchEventData={() => fetchEventData()}
              schedule={events}
            />
          </div>
          <div style={{ position: 'relative', bottom: 0, width: '100vw' }}>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default withRole(InstructorCalendar, ['Instructor']);
