import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import Calendar from 'react-calendar';
import { withRole } from '../../../utils/withAuthorization';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import calendarStyles from '../../../styles/Calendar.module.css';
import axios from 'axios';
import styles from '../../../styles/Home.module.css';
import { RRule } from 'rrule';
import { fetchUser } from '../../../store/actions/userActions';
import { apiClient } from '@/api/client';
import { useDispatch } from 'react-redux';
import { useScreenSize } from '@/hooks/mobile-devices';
import moment from 'moment';
import bookingAcceptance from '@/services/Booking/booking-acceptance';
function StudentScheduleClass({ userInfo, loading, error, fetchUser }) {
  const router = useRouter();
  const { isLargeScreen } = useScreenSize();
  const { instructorId } = router.query;
  const status = router.isReady;

  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedMode, setSelectedMode] = useState('');
  const [instId, setInstId] = useState(instructorId);
  const [instructorData, setInstructorData] = useState();
  const [courseDuration, setCourseDuration] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [classFrequency, setClassFrequency] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [time, setTime] = useState();
  const [duration, setDuration] = useState(0);
  const [success, setSuccess] = useState(false);
  const [slectedValues, setSelectedValues] = useState([]);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const [instructorAcceptance, setInstructorAcceptanceStatus] =
    useState('PENDING');
  const bookingAcceptanceId = router?.query?.bookingAcceptanceId;

  useEffect(() => {
    if (status) {
      fetchUser();
      const fetchUnavailableDates = async () => {
        const disabledDates = [];
        try {
          const responce = await apiClient(
            `/instructor/unavailable-days-in-UTC-TimeZone?instructorId=${instructorId}`
          ); //hardcoded
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
          ); //hardcoded
          console.log(responce.data);
          setSelectedInstructor(responce.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchInstructorData();
    }
  }, [instructorId]);

  //Get Courses
  const getCourses = async () => {
    try {
      const response = await apiClient.get(`/public/course/with-instructors`);

      var coursesArray = [];

      response.data.map((v) => {
        coursesArray.push({ value: v.id, label: v.name });
      });
      console.log(response);
      setInstructorCourses(coursesArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingDetail = async () => {
    try {
      let res = await getBookingAcceptance(bookingAcceptanceId);
      let coursesArr = await getCourses();

      const { data } = res;

      const date = new Date(data?.startAtBookingUserTimeZone);
      const formattedDateStr = date
        .toISOString()
        .slice(0, 16)
        .replace('T', ' ');

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

  //Fetch user details from redux
  useEffect(() => {
    setInstId(instructorId);
  }, [instructorId]);

  //get Instructor Data

  useEffect(() => {
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
  }, [instructorId]);

  useEffect(() => {
    const getUnavailableDate = async () => {
      try {
        const response = await apiClient.get(
          `/instructor/unavailable-days-in-UTC-TimeZone?instructorId=${instructorId}`
        );

        console.log(response.data);
        setUnavailableDates(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUnavailableDate();
  }, [instructorId]);

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

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const handleCourseId = (event) => {
    setCourseId(event.target.value);
  };

  const handleDateChange = async (clickedDate) => {
    const dateObj = new Date(clickedDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const formattedDateStr = `${year}-${month}-${day}`;
    setDuration(0);

    setSelectedDate(formattedDateStr);
    console.log(formattedDateStr);
    try {
      const response = await apiClient.get(
        `/instructor/available-time-slots-from-date?instructorId=${instructorId}&date=${formattedDateStr}`
      );

      const timeSlots = response.data.map((slot) => ({
        start: new Date(slot.start),
        end: new Date(slot.end),
      }));
      console.log(timeSlots);
      const isOnHalfHour = (date) =>
        date.getMinutes() === 0 || date.getMinutes() === 30;

      // Create half-hour intervals for each time slot
      const formattedTimeSlots = [];
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

  useEffect(() => {
    getCourses();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('goScheduleFromSignIn');
    }
  }, []);

  const handleSlotClick = (slot) => {
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

        setTime(
          updatedSelectedSlots.length > 0 ? updatedSelectedSlots[0] : null
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

  const handleContinue = async () => {
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

    const data = {
      start: updatedDateStr,
      durationInHours: duration / 2,
      classFrequency: classFrequency,
      courseId: instructorCourses.find((el) => el.label === courseId)?.value,
      studentId: userInfo.id,
      instructorId: instructorId,
      eventInPerson: selectedMode == 'In-Person' ? true : false,
    };

    if (instructorAcceptance != 'ACCEPTED') {
      let res = await bookingAcceptance({ ...data, whoPaysId: userInfo?.id });
      console.log('res of booking', res);
      setSuccess(true);
    } else {
      router.push({
        pathname: '/student/coursepay',
        query: data,
      });
    }
  };
  const calculateDifference = (number1, number2) => Math.abs(number1 - number2);
  return (
    <>
      <Head>
        <title>Student Schedule Class</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>

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

      <Navbar isLogin={true} />
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      <main className="container-fluid">
        <div className="row" style={{ minHeight: '90vh' }}>
          <div className="col-12 col-lg-6 pt-5">
            {selectedInstructor && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
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
                </div>
                <div>
                  <h3
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    Calendar for {selectedInstructor?.firstName}{' '}
                    {selectedInstructor?.lastName}{' '}
                    {` (GMT ${selectedInstructor?.timeZoneOffset})`}
                  </h3>
                </div>
              </div>
            )}
            <Calendar
              onChange={handleDateChange}
              tileClassName={tileClassName}
              // tileDisabled={unavailableDates.length >1 ? ({date, view})=> view === 'month' &&
              // unavailableDates.some(disabledDate =>
              //   new Date(date).getFullYear() === new Date(disabledDate).getFullYear() &&
              //   new Date(date).getMonth() === new Date(disabledDate).getMonth() &&
              //   new Date(date).getDate() === new Date(disabledDate).getDate()
              //   ) : () => false}
            />
          </div>
          <div className="col-12 col-lg-6 pt-5">
            <p className="fw-bold text-center text-white">I</p>
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
                  <span style={{ color: 'red' }}>Step 3: Select Details</span>
                </p>
              </div>
            )}
            <div className="shadow rounded py-5">
              <div
                className="d-flex flex-sm-nowrap flex-wrap justify-content-between gap-4 px-5"
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
                          }`}
                          onClick={() => {
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
                                    if (item == index) temp[index1] = item - 1;
                                  });
                                  setSelectedValues([...temp]);
                                  handleSlotClick(slot);
                                } else {
                                  let filterArr = slectedValues.filter(
                                    (item) => item != index
                                  );
                                  setSelectedValues(filterArr);
                                  handleSlotClick(slot);
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
                                        calculateDifference(item, index) === 1
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
                        onChange={(e) => setClassFrequency(e.target.value)}
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
                        onChange={(e) => setClassFrequency(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                      >
                        Weekly Recurrence
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        value="BIWEEKLY"
                        checked={classFrequency == 'BIWEEKLY'}
                        onChange={(e) => setClassFrequency(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault3"
                      >
                        Bi-Weekly
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault4"
                        vale="MONTHLY"
                        checked={classFrequency == 'MONTHLY'}
                        onChange={(e) => setClassFrequency(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault4"
                      >
                        Monthly
                      </label>
                    </div>
                  </div>

                  <div className="py-2 d-flex align-items-center gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Course:</h6>

                    <select
                      className="w-25 p-2 rounded outline-0 border border_gray"
                      onChange={(event) => {
                        handleCourseId(event);
                      }}
                      value={courseId}
                    >
                      <option>Select</option>
                      {selectedInstructor &&
                        selectedInstructor?.coursesToTutorAndProficiencies.map(
                          (course) => {
                            return (
                              <option
                                key={course.course.id}
                                value={course.course.name}
                              >
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
                      onChange={handleModeChange}
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
                    <h6 className="text-dark fw-bold m-0 p-0">Hourly Rate:</h6>

                    <h6 className="text-dark fw-bold m-0 p-0">
                      {instructorData?.hourlyRate} USD/hr
                    </h6>
                  </div>

                  {/* <div className="py-2 d-flex align-items-start gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Grade:</h6>
                    <div>
                      {instructorData &&
                        instructorData?.gradesToTutor.map((el) => {
                          return (
                            <>
                              <h6
                                key={el.id}
                                className="text-dark fw-bold m-0 p-0"
                              >
                                {el.description}
                              </h6>
                            </>
                          );
                        })}
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center pt-5">
                <button
                  className={`w-25 text-light p-2 rounded fw-bold  ${
                    !classFrequency || !time ? 'btn_disabled' : 'btn_primary'
                  }`}
                  // disabled={!classFrequency || !time ? true : false}
                  onClick={() => handleContinue()}
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  loading: state.user.loading,
  error: state.user.error,
});

export default withRole(
  connect(mapStateToProps, { fetchUser })(StudentScheduleClass),
  ['Student']
);
