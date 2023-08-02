import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { withRole } from "../../../utils/withAuthorization";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import calendarStyles from "../../../styles/Calendar.module.css";
import axios from "axios";
import styles from "../../../styles/Home.module.css";
import { RRule } from 'rrule';
import { fetchUser } from "../../../store/actions/userActions";
import { apiClient } from "@/api/client";
import { useDispatch } from 'react-redux';

function StudentScheduleClass({ userInfo, loading, error, fetchUser }) {
  const router = useRouter();
  const { instructorId } = router.query;
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");
  const [instId, setInstId] = useState(instructorId);
  const [instructorData, setInstructorData] = useState({});
  const [courseDuration, setCourseDuration] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [classFrequency, setClassFrequency] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [time, setTime] = useState();
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch();

 useEffect(() => {
  fetchUser()
 },[])

  //Get Courses
  const getCourses = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/public/course/with-instructors`
      );

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

  //Fetch user details from redux
  useEffect(() => {
    setInstId(instructorId);
  }, []);

  //get Instructor Data

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));

        const response = await axios.get(
          `http://34.227.65.157/instructor/details-for-scheduling?instructorId=${instId}`,
          {
            headers: {
              Authorization: `Bearer ${typ.accessToken}`,
            },
          }
        );
        setInstructorData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (instructorId) {
      getInstructorData();
    }
  }, []);

  useEffect(() => {
    const getInstructorIcal = async () => {
      try {
        var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));

        const response = await axios.get(
          `http://34.227.65.157/instructor/schedule-and-unavailable-days-iCal?instructorId=22`,
          {
            headers: {
              Authorization: `Bearer ${typ.accessToken}`,
            },
          }
          
        );
        //console.log(response.data, "ical data");
      
      // Access the iCal data directly from the response data property
      const iCalText = response.data;
      // Split the iCal data into separate VCALENDAR components
      const vcalendarComponents = iCalText.split('BEGIN:VCALENDAR').filter(Boolean);
      const rrRuleData = [];
      vcalendarComponents.forEach((vcalendarComponent) => {
        const veventStart = vcalendarComponent.indexOf('BEGIN:VEVENT');
        const veventEnd = vcalendarComponent.indexOf('END:VEVENT', veventStart) + 10; 
        const veventData = vcalendarComponent.substring(veventStart, veventEnd);
        
        const rrRuleStart = veventData.indexOf('RRULE:');
        const rrRuleEnd = veventData.indexOf('\r\n', rrRuleStart);
        const rrRule = veventData.substring(rrRuleStart, rrRuleEnd);
        rrRuleData.push(rrRule);
      });
      // Parse 
      const events = rrRuleData.map((rrRule) => RRule.fromString(rrRule));
      // Extract the unavailable dates
      const unavailableDates = [];

      events.forEach((event) => {
        event.all().forEach((date) => {
          unavailableDates.push(date);

        });
      });
      setUnavailableDates(unavailableDates);

      setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getInstructorIcal();
  }, []);


    //apply styles for unavailableDate
    const tileClassName = ({ date, view }) => {
      if (view === 'month') {
        const dateString = date.toDateString();
        if (unavailableDates.some((unavailableDate) => unavailableDate.toDateString() === dateString)) {
          return {
            backgroundColor: 'gray',
            color: "black",
          }
        }
      }
      return null;
    };
    const tileDisabled = ({ date }) =>
    unavailableDates.some(
      (unavailableDate) => unavailableDate.toDateString() === date.toDateString()
    );
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

 const handleDateChange = async (clickedDate) => {
    const dateObj = new Date(clickedDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const formattedDateStr = `${year}-${month}-${day}`;
  
    setSelectedDate(formattedDateStr);
  
    try {
      const response = await apiClient.get(
        `/instructor/available-time-slots-from-date?instructorId=22&date=${formattedDateStr}`
      );
  
      const timeSlots = response.data.map((slot) => ({
        start: new Date(slot.start),
        end: new Date(slot.end),
      }));
  
      const isOnTheHour = (date) => date.getMinutes() === 0;
  
      // Create one-hour intervals for each time slot
      const formattedTimeSlots = [];
      timeSlots.forEach((slot) => {
        if (isOnTheHour(slot.start)) {
          formattedTimeSlots.push({
            start: new Date(slot.start),
            end: new Date(slot.start.getTime() + 60 * 60 * 1000),
          });
        }
      });
  
      setAvailableTime(formattedTimeSlots);
      console.log(formattedTimeSlots, "formatted time slots");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
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
  
        setTime(updatedSelectedSlots.length > 0 ? updatedSelectedSlots[0] : null);
  
        return updatedSelectedSlots;
      } else {
        setDuration((prevDuration) => prevDuration + 1);
  
        if (!time) {
          const date = new Date(slot.start)
          const formattedDateStr = date.toISOString().slice(0, 16).replace('T', ' ');
  
          setTime(formattedDateStr);
  
        }
  
        return [...prevSelectedSlots, slot];
      }
    });
  
  };
  
  
      const handleContinue = () => {
        const data = {
          start: time,
          durationInHours: duration,
          classFrequency: classFrequency,
          courseId: courseId,
          studentId: userInfo.id,
          instructorId: instructorId,
          eventInPerson: selectedMode == "In-Person" ? true : false,
        };
        router.push({
          pathname: "/parent/coursepay",
          query: data,
      });
      };

  return (
    <>
      <Head>
        <title>Student Schedule Class</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
         {isLoading && (
             <div className="d-flex justify-content-center">
             <div className="spinner-border text-primary" role="status">
             </div>
           </div>
      )}
      <main className="container-fluid">
        <div className="row" style={{ minHeight: "90vh" }}>
          <div className="col-12 col-lg-6 pt-5">
            <Calendar
               value={selectedDate} 
               onChange={handleDateChange}
               //tileClassName={tileClassName} 
               //tileDisabled={tileDisabled}
            />
          </div>
          <div className="col-12 col-lg-6 pt-5">
            <p className="fw-bold text-center text-white">I</p>
            <div className="shadow rounded py-5">
              <div
                className="d-flex flex-sm-nowrap flex-wrap justify-content-between gap-4 px-5"
                style={{ minHeight: "400px" }}
              >
                <div className="w-100 ">
                  <p className="p-0 m-0 fw-bold pb-2">Select time</p>
                  <ul>
                 {availableTime.map((slot, index) => (
                   <li
                     key={index}
                     className={`m-03 py-1 fw-bold list-unstyled ${
                       selectedSlots.some(
                         (selectedSlot) =>
                           selectedSlot.start.getTime() === slot.start.getTime() &&
                           selectedSlot.end.getTime() === slot.end.getTime()
                       )
                         ? "bg-secondary text-white"
                         : ""
                     }`}
                     onClick={() => handleSlotClick(slot)}
                   >
                     {`${slot.start.toLocaleTimeString()} - ${slot.end.toLocaleTimeString()}`}
                   </li>
                 ))}
               </ul>
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
                        checked={classFrequency == "ONETIME"}
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
                        checked={classFrequency == "WEEKLY"}
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
                        id="flexRadioDefault1"
                        value="BIWEEKLY"
                        checked={classFrequency == "BIWEEKLY"}
                        onChange={(e) => setClassFrequency(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault1"
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
                        checked={classFrequency == "MONTHLY"}
                        onChange={(e) => setClassFrequency(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                      >
                        Monthly
                      </label>
                    </div>
                  </div>

                  <div className="py-2 d-flex align-items-center gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Course:</h6>

                    <select
                      className="w-25 p-2 rounded outline-0 border border_gray"
                      onChange={handleCourseId}
                      value={courseId}
                    >
                      <option>Select</option>
                      {instructorCourses.map((course) => {
                        return (
                          <option key={course.label} value={course.value}>
                            {course.label}
                          </option>
                        );
                      })}
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
                      <option value="Online">Online</option>
                      <option value="In-Person">In-Person</option>
                    </select>
                  </div>

                  <div className="py-2 d-flex align-items-center gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Hourly Rate:</h6>

                    <h6 className="text-dark fw-bold m-0 p-0">
                      {instructorData?.hourlyRate}
                    </h6>
                  </div>

                  <div className="py-2 d-flex align-items-start gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Grade:</h6>
                    <div>
                      <h6 className="text-dark fw-bold m-0 p-0"></h6>

                      <h6 className="text-dark fw-bold m-0 p-0">
                        &#40;12yrs - 14yrs&#41;
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center pt-5">
                <button
                  className={`w-25 text-light p-2 rounded fw-bold  ${
                    !classFrequency ? "btn_disabled" : "btn_primary"
                  }`}
                  disabled={!classFrequency ? true : false}
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
  ["Student"]
);

