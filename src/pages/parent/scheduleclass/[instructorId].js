import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ParentNavbar, Footer } from '../../../components';
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import axios from 'axios';
import { fetchUser } from '@/store/actions/userActions';
import Link from 'next/link';

import { connect } from 'react-redux';
import { apiClient } from '@/api/client';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import GetUnConfirmedEventById from '@/services/events/GetUnConfirmedEventById';
import Modal from '@/components/parent/modal/Modal';
import { useScreenSize } from '@/hooks/mobile-devices';
import bookingAcceptance from '@/services/Booking/booking-acceptance';
import getBookingAcceptance from '@/services/Booking/get-booking-acceptance';
function ParentScheduleClass({ loading, error }) {
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(router);

  const { isLargeScreen } = useScreenSize();
  const { instructorId } = router.query;

  const userInfo = useSelector((state) => state.user.userInfo);

  const [instructorData, setInstructorData] = useState({});
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedMode, setSelectedMode] = useState('');
  const [courseId, setCourseId] = useState('');
  const [classFrequency, setClassFrequency] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [time, setTime] = useState();
  const [studentId, setStudentId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [err, setErr] = useState('');
  const [ifSignedUser, setIfSignedUser] = useState(false);
  const [eventslotsexists, setEventslotsexists] = useState(false);
  const [paymentSubmit, setPaymentSubmit] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [slectedValues, setSelectedValues] = useState([]);
  const [success, setSuccess] = useState(false);
  const [instructorAcceptance, setInstructorAcceptanceStatus] =
    useState('PENDING');
  const eventId = router?.query?.eventId;
  const bookingAcceptanceId = router?.query?.bookingAcceptanceId;
  console.log('selected instructor', selectedInstructor);
  let dur = null;
  let eventStartTimeslot = undefined;
  let ca = [];
  let sid = null;
  const [dependent, setDependent] = useState(null);

  //Get Courses
  const getCourses = async () => {
    try {
      const response = await apiClient.get(`/public/course/with-instructors`);

      var coursesArray = [];

      response.data.map((v) => {
        coursesArray.push({ value: v.id, label: v.name });
      });
      ca = coursesArray;
      console.log(response);
      setInstructorCourses(coursesArray);
      return ca;
    } catch (error) {
      console.log(error);
    }
  };

  const getEventDetail = async () => {
    try {
      let res = await GetUnConfirmedEventById(eventId);
      let coursesArr = await getCourses();
      console.log('coursesarr', coursesArr);
      console.log('res', res);
      const { data } = res;
      eventStartTimeslot = data.start;

      // console.log(instructorCourses)
      // console.log(ca.find(el => el.value === data.courseId).label)
      dur = data?.durationInHours;
      sid = data?.studentId;
      // console.log("dependent", loggedInUser.dependents.find(el=>el.id === sid));
      // setDependent(loggedInUser.dependents.find(el=>el.id === sid))
      setStudentId(data?.studentId);
      const date = new Date(data?.start);
      const formattedDateStr = date
        .toISOString()
        .slice(0, 16)
        .replace('T', ' ');
      setTime(formattedDateStr);
      console.log('formated', formattedDateStr);
      setDuration(data.durationInHours);
      setDate(data.start.slice(0, 10));
      setClassFrequency(data.classFrequency);
      setCourseId(coursesArr.find((el) => el.value === data.courseId).label);
      setSelectedMode(data?.eventInPerson ? 'In-Person' : 'Online');
      // setDuration(data?.duration)
      setPaymentSubmit(true);

      await handleDateChange(new Date(data?.start), data.durationInHours);
    } catch (err) {
      console.log('err', err);
    }
  };

  const getBookingDetail = async () => {
    try {
      let res = await getBookingAcceptance(bookingAcceptanceId);
      let coursesArr = await getCourses();
      console.log(ca);

      const { data } = res;

      console.log('data00000', data);
      eventStartTimeslot = data.start;

      // console.log(instructorCourses)
      // console.log(ca.find(el => el.value === data.courseId).label)
      dur = data?.durationInHours;
      sid = data?.studentId;
      // console.log("dependent", loggedInUser.dependents.find(el=>el.id === sid));
      // setDependent(loggedInUser.dependents.find(el=>el.id === sid))
      setStudentId(data?.studentId);
      const date = new Date(data?.startAtBookingUserTimeZone);
      const formattedDateStr = date
        .toISOString()
        .slice(0, 16)
        .replace('T', ' ');

      console.log('formatted time', formattedDateStr);
      setTime(formattedDateStr);
      setDuration(data.durationInHours);
      setDate(data?.startAtBookingUserTimeZone?.slice(0, 10));
      setClassFrequency(data.classFrequency);
      setCourseId(coursesArr.find((el) => el.value === data.courseId).label);
      setSelectedMode(data?.eventInPerson ? 'In-Person' : 'Online');
      setInstructorAcceptanceStatus(data?.instructorAcceptanceStatus);
      await handleDateChange(
        new Date(data?.startAtBookingUserTimeZone),
        data.durationInHours
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    if (bookingAcceptanceId) {
      getBookingDetail();
    }
  }, [bookingAcceptanceId]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  useEffect(() => {
    getCourses();
    if (eventId) {
      setPaymentSubmit(true);
      getEventDetail();
    } else {
      setPaymentSubmit(false);
    }
  }, [eventId]);

  useEffect(() => {
    const getUnavailableDate = async () => {
      try {
        const response = await apiClient.get(
          `/instructor/unavailable-days-in-UTC-TimeZone?instructorId=${
            selectedInstructor?.id ?? instructorId
          }`
        );

        console.log(response.data);
        setUnavailableDates(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUnavailableDate();
    window.localStorage.removeItem('goScheduleFromSignIn');
  }, []);

  const isDateUnavailable = (date) => {
    return unavailableDates.some((unavailableDate) => {
      const startDate = new Date(unavailableDate.start);
      const endDate = new Date(unavailableDate.end);
      return date >= startDate && date <= endDate;
    });
  };

  //apply styles for unavailableDate
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isDateUnavailable(date)) {
        return {
          backgroundColor: 'gray',
          color: 'black',
        };
      }
    }
    return null;
  };

  useEffect(() => {
    const run = () => {
      const getInstructorData = async () => {
        try {
          var typ = JSON.parse(window.localStorage.getItem('gkcAuth'));
          const response = await apiClient.get(
            `/instructor/details-for-scheduling?instructorId=${instructorId}`
          );
          setInstructorData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      if (instructorId) getInstructorData(instructorId);
      const fetchUnavailableDates = async () => {
        const disabledDates = [];
        try {
          const responce = await apiClient(
            `/instructor/unavailable-days-in-UTC-TimeZone?instructorId=${instructorId}`
          );
          console.log(responce.data);
          responce.data.forEach((el) => {
            disabledDates.push(new Date(el.end));
          });
          console.log(disabledDates);
          setUnavailableDates(disabledDates);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUnavailableDates();
      const fetchInstructorData = async () => {
        try {
          const responce = await apiClient(
            `/instructor/details-for-scheduling?instructorId=${instructorId}`
          );
          console.log('ress', responce.data);
          setSelectedInstructor(responce.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchInstructorData();
    };
    if (instructorId) run();

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('goScheduleFromSignIn');
      if (eventId !== undefined) {
        window.localStorage.setItem(
          'goBackSchedule',
          JSON.stringify({ event: eventId, id: instructorId })
        );
        if (
          JSON.parse(window.localStorage.getItem('gkcAuth'))?.role === undefined
        ) {
          setIfSignedUser(true);
        }
      }
    }
  }, [instructorId]);
  console.log('selected', selectedSlots);
  const handleDateChange = async (clickedDate, duration) => {
    console.log('lcliekcdate', clickedDate);

    const dateObj = new Date(clickedDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    let formattedDateStr = `${year}-${month}-${day}`;
    if (eventId === undefined) {
      setDuration(0);
    }

    setSelectedDate(formattedDateStr);

    try {
      if (bookingAcceptanceId) {
        const date = moment(formattedDateStr);

        // Add one day to the date
        date.add(1, 'days');
        formattedDateStr = date.format('YYYY-MM-DD');
      }
      const response = await apiClient.get(
        `/instructor/available-time-slots-from-date?instructorId=${
          selectedInstructor?.id ?? instructorId
        }&date=${formattedDateStr}`
      );

      const timeSlots = response.data.map((slot) => ({
        start: new Date(slot.start),
        end: new Date(slot.end),
      }));

      const isOnHalfHour = (date) =>
        date.getMinutes() === 0 || date.getMinutes() === 30;

      // Create half-hour intervals for each time slot
      const formattedTimeSlots = [];

      if (eventId !== undefined || bookingAcceptanceId !== undefined) {
        let timeclickeddate = moment(dateObj).format('hh:mm');
        let findIndex = timeSlots.findIndex((obj) =>
          moment(obj.start).format('hh:mm').includes(timeclickeddate)
        );

        console.log('findindex', findIndex);
        console.log('timesots', timeSlots);
        console.log('timeclickedate', timeclickeddate);
        let count = duration + findIndex;
        console.log('duration', duration);
        timeSlots.forEach((slot, index) => {
          console.log('index', index);

          console.log('count', count);
          if (
            // isOnHalfHour(slot.start) &&
            index >= findIndex &&
            index <= count
          ) {
            const start = new Date(slot.start);
            start.setSeconds(0); // Set seconds to 0
            start.setMilliseconds(0); // Set milliseconds to 0

            const end = new Date(slot.start.getTime() + 30 * 60 * 1000);
            end.setSeconds(0); // Set seconds to 0
            end.setMilliseconds(0); // Set milliseconds to 0

            formattedTimeSlots.push({
              start,
              end,
            });
          }
        });
        // let filterarr = formattedTimeSlots.filter(
        //   (item, index) => index >= findIndex && index <= count
        // );
        setSelectedSlots(formattedTimeSlots);
        // console.log('filterarr', filterarr);
        setAvailableTime(formattedTimeSlots);
      } else {
        timeSlots.forEach((slot) => {
          if (isOnHalfHour(slot.start)) {
            const start = new Date(slot.start);
            start.setSeconds(0); // Set seconds to 0
            start.setMilliseconds(0); // Set milliseconds to 0

            const end = new Date(slot.start.getTime() + 30 * 60 * 1000);
            end.setSeconds(0); // Set seconds to 0
            end.setMilliseconds(0); // Set milliseconds to 0

            formattedTimeSlots.push({
              start,
              end,
            });
          }
        });
      }

      setAvailableTime(formattedTimeSlots);
      if (formattedTimeSlots.length > 0) {
        setErr('');
      } else {
        setErr('Tutor unavailable');
      }

      console.log(formattedTimeSlots, 'formatted time slots');
    } catch (error) {
      console.log(error);
    }
  };
  //Get Modes
  //eventInPerson
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };
  //Get course duration
  const handleDuration = (e) => {
    setCourseDuration(e.target.value);
  };

  const handleCourseId = (event) => {
    setCourseId(event.target.value);
  };

  const handleSlotClick = (slot, index) => {
    setSelectedSlots((prevSelectedSlots) => {
      const isSlotSelected = prevSelectedSlots.some(
        (selectedSlot) =>
          selectedSlot.start.getTime() === slot.start.getTime() &&
          selectedSlot.end.getTime() === slot.end.getTime()
      );

      if (isSlotSelected) {
        setDuration((prevDuration) => prevDuration - 1);

        const updatedSelectedSlots = prevSelectedSlots.filter(
          (selectedSlot) =>
            selectedSlot.start.getTime() !== slot.start.getTime() ||
            selectedSlot.end.getTime() !== slot.end.getTime()
        );
        console.log('updated', updatedSelectedSlots);
        setTime(
          updatedSelectedSlots.length > 0
            ? updatedSelectedSlots[index].start
            : null
        );

        return updatedSelectedSlots;
      } else {
        setDuration((prevDuration) => prevDuration + 1);

        if (!time) {
          const date = new Date(slot.start);
          const formattedDateStr = date
            .toISOString()
            .slice(0, 16)
            .replace('T', ' ');

          setTime(formattedDateStr);
        }

        return [...prevSelectedSlots, slot];
      }
    });
  };

  const onContinue = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('goBackSchedule');
    }

    const timeSTampHour = moment(selectedSlots[0].start).format('HH');
    const timeSTampMin = moment(selectedSlots[0].start).format('mm');

    var originalDate = moment(time, 'YYYY-MM-DD HH:mm');

    // Define the new hours and minutes you want
    var newHours = parseInt(timeSTampHour); // Replace with your desired value
    var newMinutes = parseInt(timeSTampMin); // Replace with your desired value

    // Set the new hours and minutes
    originalDate.hours(newHours);
    originalDate.minutes(newMinutes);

    // Format the updated date as a string

    var updatedDateStr = originalDate.format('YYYY-MM-DD HH:mm');
    console.log('updatedetae', updatedDateStr);

    const data = {
      start: updatedDateStr,
      durationInHours: duration / 2,
      classFrequency: classFrequency,
      courseId: instructorCourses.find((el) => el.label === courseId).value,
      studentId: studentId,
      instructorId: selectedInstructor.id,
      eventInPerson: selectedMode == 'In-Person' ? true : false,
    };

    if (instructorAcceptance != 'ACCEPTED') {
      let res = await bookingAcceptance({ ...data, whoPaysId: userInfo?.id });
      console.log('res of booking', res);
      setSuccess(true);
    } else {
      router.push({
        pathname: '/parent/coursepay',
        query: data,
      });
    }
  };
  const calculateDifference = (number1, number2) => Math.abs(number1 - number2);
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !window.localStorage.getItem('gkcAuth') &&
      router.query?.bookingAcceptanceId
    ) {
      window.localStorage.setItem(
        'goBookingScheduleFromSignIn',
        JSON.stringify({
          path: router.asPath,
          params: JSON.stringify(router.query),
        })
      );

      router.push('/auth/signin');
    }
  }, [userInfo, router?.query]);

  return (
    <>
      <Head>
        <title>Parent Schedule Class</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <div
        style={{ position: 'relative' }}
        className={`${router.asPath.includes('eventId') ? 'tw-z-30' : ''}`}
      >
        <ParentNavbar isLogin={true} />
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {success ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              background: 'white',
              margin: '500px auto',
              padding: 20,
              width: '380px',
            }}
          >
            <p
              style={{
                width: 350,
                margin: 'auto',
                textAlign: 'center',
                fontSize: 18,
              }}
            >
              request has been sent to Tutor for booking acceptance
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  router.push(`/`);
                }}
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: 100 }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {paymentSubmit ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: 'white',
            fontSize: 20,
          }}
        >
          <div
            style={{
              background: 'white',
              margin: '200px auto',
              padding: 20,
              width: '500px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
            <p
              style={{
                width: 'auto',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              {' '}
              {userInfo &&
                userInfo?.dependents?.find((el) => el.id === studentId)
                  ?.firstName +
                  ' ' +
                  userInfo.dependents?.find((el) => el.id === studentId)
                    ?.lastName}{' '}
              has requested that you review, approve and pay for the following
              class:
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '60px 0',
              }}
            >
              <ul
                style={{
                  listStyleType: 'none',
                  width: 200,
                  padding: 0,
                  textAlign: 'center',
                }}
              >
                <li>Tutor</li>
                <li>Course</li>
                <li>Cost/hr</li>
                <li># of hours</li>
                <li>Date</li>
                <li>Mode</li>
              </ul>
              <ul
                style={{
                  listStyleType: 'none',
                  width: 200,
                  padding: 0,
                  textAlign: 'center',
                }}
              >
                <li>
                  {instructorData !== undefined
                    ? instructorData.firstName + ' ' + instructorData.lastName
                    : ''}
                </li>
                <li>{courseId !== 0 ? courseId : ''}</li>
                <li>{instructorData.hourlyRate ?? ''}</li>
                <li>{duration / 2}</li>
                <li>{date}</li>
                <li>{selectedMode}</li>
              </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: '300px', position: 'relative' }}
                onClick={() => {
                  setPaymentSubmit(false);
                }}
              >
                Review and Approve
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="fw-bold mt-3"
                style={{
                  width: '180px',
                  position: 'relative',
                  border: 'none',
                  background: 'none',
                }}
                onClick={() => {
                  setPaymentSubmit(false);
                }}
              >
                <u>Go to main page</u>
              </button>
            </div>
            \{' '}
          </div>
        </div>
      ) : null}
      {ifSignedUser ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              background: 'white',
              margin: '500px auto',
              padding: 20,
              width: '22%',
            }}
          >
            <p style={{ width: 300, margin: 'auto' }}>
              Please sign in before scheduling a class.
            </p>

            <button
              onClick={() => {
                console.log('event id', eventId);
                console.log('isntructorid', instructorId);
                window.localStorage.setItem(
                  'Scheduler',
                  JSON.stringify({
                    eventId,
                    instructorId,
                  })
                );
                router.push('/auth/signin');
              }}
              className="btn_primary text-light p-2 rounded fw-bold mt-3"
              style={{ width: 50, position: 'relative', margin: '0 42%' }}
            >
              Ok
            </button>
          </div>
        </div>
      ) : null}
      {!paymentSubmit && (
        <>
          <main className="container-fluid">
            <div className="row" style={{ minHeight: '90vh' }}>
              <div className="col-12 col-lg-6 pt-5">
                {selectedInstructor && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {isLargeScreen && (
                      <p
                        style={{
                          color: 'red',
                          fontSize: 18,
                          textAlign: 'center',
                        }}
                      >
                        Step 1: Pick Date
                      </p>
                    )}
                    <h3
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      Calendar for {selectedInstructor?.firstName}{' '}
                      {selectedInstructor?.lastName}
                      {` (GMT ${selectedInstructor?.timeZoneOffset})`}
                    </h3>
                  </div>
                )}
                <Calendar
                  value={date}
                  onChange={handleDateChange}
                  tileClassName={tileClassName}
                  // tileDisabled={unavailableDates.length >1 ? ({date, view})=> view === 'month' && unavailableDates.some(disabledDate =>
                  //   new Date(date).getFullYear() === new Date(disabledDate).getFullYear() &&
                  //   new Date(date).getMonth() === new Date(disabledDate).getMonth() &&
                  //   new Date(date).getDate() === new Date(disabledDate).getDate()
                  //   ) : () => false}
                />
              </div>
              <div className="col-12 col-lg-6 pt-5">
                <div className="tw-flex tw-justify-center">
                  <p
                    onClick={() => setOpen(true)}
                    type="button"
                    className="tw-block !tw-bg-[#f48342] tw-rounded-md tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
                  >
                    Information for {selectedInstructor?.firstName}{' '}
                    {selectedInstructor?.lastName}
                  </p>
                  <Modal
                    selectedInstructor={selectedInstructor}
                    setOpen={setOpen}
                    open={open}
                  >
                    Modal
                  </Modal>
                </div>

                {isLargeScreen && (
                  <div
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      display: 'flex',
                      paddingRight: '150px',
                    }}
                  >
                    <p style={{ fontSize: 18 }}>
                      <span style={{ color: 'red' }}>Step 2: Pick Time</span>
                    </p>
                    <p style={{ fontSize: 18 }}>
                      <span style={{ color: 'red' }}>
                        Step 3: Select Details
                      </span>
                    </p>
                  </div>
                )}
                <div className="shadow rounded py-5">
                  <div
                    className="d-flex flex-sm-nowrap flex-wrap justify-content-between gap-4 px-3"
                    style={{ minHeight: '400px' }}
                  >
                    <div className="w-100 ">
                      <p className="p-0 m-0 fw-bold pb-2">
                        {duration > 0 ? (
                          <>You selected {duration / 2} hours</>
                        ) : (
                          <>Select time</>
                        )}
                      </p>
                      <p>{err}</p>
                      <div
                        style={{
                          height: 500,
                          overflow: 'hidden',
                          overflowY: 'auto',
                          width: 200,
                        }}
                      >
                        {availableTime &&
                          availableTime.map((slot, index) => (
                            <li
                              key={index}
                              className={`m-03 py-1 fw-bold list-unstyled ${
                                selectedSlots.some(
                                  (selectedSlot) =>
                                    selectedSlot.start.getTime() ===
                                      slot.start.getTime() &&
                                    selectedSlot.end.getTime() ===
                                      slot.end.getTime()
                                )
                                  ? 'bg-secondary text-white'
                                  : ''
                              } ${
                                eventslotsexists
                                  ? 'bg-secondary text-white'
                                  : ''
                              }`}
                              onClick={() => {
                                if (eventId) return null;
                                let temp = [...slectedValues];

                                if (
                                  index >= slectedValues[0] &&
                                  index <= slectedValues[1]
                                ) {
                                  if (
                                    index == slectedValues[0] ||
                                    index == slectedValues[1]
                                  ) {
                                    if (duration > 2) {
                                      slectedValues.map((item, index1) => {
                                        if (item == index)
                                          temp[index1] = item - 1;
                                      });
                                      setSelectedValues([...temp]);
                                      handleSlotClick(slot, index);
                                    } else {
                                      let filterArr = slectedValues.filter(
                                        (item) => item != index
                                      );
                                      setSelectedValues(filterArr);
                                      handleSlotClick(slot, index);
                                    }
                                  }
                                } else {
                                  if (slectedValues.length === 0) {
                                    temp.push(index);
                                    setSelectedValues([...temp]);
                                    handleSlotClick(slot);
                                  } else if (slectedValues.length > 0) {
                                    if (
                                      calculateDifference(
                                        slectedValues[0],
                                        index
                                      ) === 1 ||
                                      calculateDifference(
                                        slectedValues[1],
                                        index
                                      ) === 1
                                    ) {
                                      const isSlotSelected = selectedSlots.some(
                                        (selectedSlot) =>
                                          selectedSlot.start.getTime() ===
                                            slot.start.getTime() &&
                                          selectedSlot.end.getTime() ===
                                            slot.end.getTime()
                                      );

                                      if (slectedValues.length < 2) {
                                        !isSlotSelected && temp.push(index);
                                      } else {
                                        temp.map((item, index1) => {
                                          if (
                                            calculateDifference(item, index) ===
                                            1
                                          ) {
                                            temp[index1] = index;
                                          }
                                        });
                                      }

                                      setSelectedValues([...temp]);
                                      handleSlotClick(slot);
                                    } else {
                                      if (slectedValues[0] === index) {
                                        setSelectedValues([]);
                                        handleSlotClick(slot);
                                      }
                                    }
                                  }
                                }
                              }}
                            >
                              {`${slot.start.toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                              })} - ${slot.end.toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}`}
                            </li>
                          ))}
                      </div>
                    </div>

                    <div className=" w-100">
                      <p className="p-0 m-0 fw-bold text-center py-2">
                        Your information
                      </p>

                      <div className="py-1">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="ONETIME"
                            checked={classFrequency == 'ONETIME'}
                            onChange={(e) =>
                              eventId ? null : setClassFrequency(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            One-Time
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="WEEKLY"
                            checked={classFrequency == 'WEEKLY'}
                            onChange={(e) =>
                              eventId ? null : setClassFrequency(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Weekly Recurrence
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="BIWEEKLY"
                            checked={classFrequency == 'BIWEEKLY'}
                            onChange={(e) =>
                              eventId ? null : setClassFrequency(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Bi-Weekly
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            vale="MONTHLY"
                            checked={classFrequency == 'MONTHLY'}
                            onChange={(e) =>
                              eventId ? null : setClassFrequency(e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Monthly
                          </label>
                        </div>
                      </div>

                      <div className="py-2 d-flex align-items-center gap-4">
                        <h6 className="text-dark fw-bold m-0 p-0">
                          On Behalf of:
                        </h6>

                        <select
                          className="w-25 p-2 rounded outline-0 border border_gray"
                          value={studentId}
                          onChange={(e) => {
                            eventId ? null : setStudentId(e.target.value);
                          }}
                        >
                          {console.log('loginuser', userInfo)}
                          <option>Select</option>
                          {userInfo &&
                            userInfo?.dependents?.map((dependent) => {
                              return (
                                <option
                                  key={dependent.email}
                                  value={dependent.id}
                                >
                                  {dependent.firstName +
                                    ' ' +
                                    dependent.lastName}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      <div className="py-2 d-flex align-items-center gap-4">
                        <h6 className="text-dark fw-bold m-0 p-0">Course:</h6>

                        <select
                          className="w-25 p-2 rounded outline-0 border border_gray"
                          onChange={(event) => {
                            eventId ? null : handleCourseId(event);
                          }}
                          value={courseId}
                        >
                          <option>Select</option>
                          {selectedInstructor &&
                            selectedInstructor?.coursesToTutorAndProficiencies.map(
                              (course) => {
                                return (
                                  <option key={course.course.id}>
                                    {course.course.name}
                                  </option>
                                );
                              }
                            )}
                        </select>
                      </div>

                      <div className="py-2 d-flex align-items-center gap-4">
                        <h6 className="text-dark fw-bold m-0 p-0">Mode:</h6>

                        <select
                          className="w-25 p-2 rounded outline-0 border border_gray   "
                          value={selectedMode}
                          onChange={(event) =>
                            eventId ? null : handleModeChange(event)
                          }
                        >
                          <option value="">Select</option>
                          {selectedInstructor &&
                            selectedInstructor?.deliveryModes.map((mode) => {
                              return (
                                <option key={mode.id} value={mode.name}>
                                  {mode.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      <div className="py-2 d-flex align-items-center gap-4">
                        <h6 className="text-dark fw-bold m-0 p-0">
                          Hourly Rate:
                        </h6>

                        <h6 className="text-dark fw-bold m-0 p-0">
                          {instructorData?.hourlyRate} USD/hr
                        </h6>
                      </div>

                      {/* <div className="py-2 d-flex align-items-start gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Grade:</h6>
                    <div>
                      {
                        selectedInstructor && selectedInstructor?.gradesToTutor.map((el)=>{
                          return <>
                          <h6 key={el.id}  className="text-dark fw-bold m-0 p-0">
                            {el.name +`\n`+ el.description}
                          </h6>   
                          </>
                        })
                      }
                    </div>
                  </div> */}
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-center pt-5">
                    <button
                      disabled={
                        !classFrequency ||
                        !time ||
                        !courseId ||
                        !selectedMode ||
                        !studentId
                      }
                      className={`w-25 text-light p-2 rounded fw-bold  ${
                        !classFrequency ||
                        !time ||
                        !courseId ||
                        !selectedMode ||
                        !studentId
                          ? 'btn_disabled'
                          : 'btn_primary'
                      }`}
                      onClick={() => onContinue()}
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div
            style={{ position: 'relative', bottom: 0 }}
            className={`${router.asPath.includes('eventId') ? 'tw-z-30' : ''}`}
          >
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  loading: state.user.loading,
  error: state.user.error,
});

export default ParentScheduleClass;
