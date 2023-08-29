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
          console.log(response)
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
          setEvents(events);
        }



      } catch (error) {
        console.log('Error fetching iCalendar data:', error);
      }
    };
    fetchICalendarData();
  }, [loggedInUser]);

  //Logged user events
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const typ = JSON.parse(window.localStorage.getItem('gkcAuth'));

        const response = await apiClient.get('/event/logged-user-events');

        setBookedEvent(response.data);
        console.log('events', response.data);
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
    const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1)
      .toString()
      .padStart(2, '0');
    const modifiedClickedDate = `${year}${month}${day}`;

    const selectedIcalEvent = events.find(
      (singleEvent) =>
        singleEvent['DTSTART'].slice(0, 8) === modifiedClickedDate &&
        singleEvent['EVENT-ID']
    );

    if (selectedIcalEvent) {
      setSingleIcalEvent(selectedIcalEvent);
      bookedEvents.find(
        (singleBooked) => singleBooked.id == selectedIcalEvent['EVENT-ID']
      );

      const matchedBookedEvent = bookedEvents.find(
        (singleBooked) => singleBooked.id == selectedIcalEvent['EVENT-ID']
      );
      if (matchedBookedEvent) {
        console.log('matched book event', matchedBookedEvent);
        setStudentDetail({
          name: matchedBookedEvent?.studentName,
          id: matchedBookedEvent?.studentId,
        });
        setInstructorName(matchedBookedEvent.instructorName);
        setStudent(matchedBookedEvent.studentName);
        setEventTime(matchedBookedEvent.start.split(' ')[1]);
        setDeleteable(matchedBookedEvent.deleteable);
        //HERE WILL BE THE MEETING LINK
        setMeetingLink('meetinglink');
        setCourseId(matchedBookedEvent.courseId);
        setNoEvent(false);
        setEventId(49 || matchedBookedEvent.id);
        setCourseName(matchedBookedEvent.courseName);
        setStudentId(matchedBookedEvent.studentId);
        setParentId(matchedBookedEvent?.parentsId);
      } else {
        // Clear the states when a matching booked event is not found
        setNoEvent(true);
        setEventTime('');
        setInstructorName('');
        setDeleteable(false);
        setMeetingLink('');
        setStudentId('');
        setParentId(null);
        setCourseId('');
      }
    } else {
      setStudentDetail(null);
      setCourseId('');
      setParentId(null);
      // Clear the states when a matching iCal event is not found
      setNoEvent(true);
      setSingleIcalEvent(null);
      setEventTime('');
      setDeleteable(false);
      setMeetingLink('');
      setStudentId('');
      setCourseId('');
    }
  };
  console.log("event id", eventId);
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
                <FiEdit style={{ fontSize: '24px' }} />
              </div>
              <Calendar
                onClickDay={handleCalendarClick}
                className={calendarStyles.reactCalendar}
                defaultValue={new Date()}
              />
            </div>
            <InstructorSchedule
              studentDetail={studentDetail}
              studentParents={parentsId}
              instructorName={instructorName}
              courseId={courseId}
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

export default withRole(InstructorCalendar, ['Instructor']);
