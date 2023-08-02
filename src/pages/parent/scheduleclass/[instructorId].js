import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ParentNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import { fetchUser } from "@/store/actions/userActions";
import { RRule } from 'rrule';
import calendarStyles from "../../../styles/Calendar.module.css";
import styles from "../../../styles/Home.module.css";
import { connect } from "react-redux";
import { apiClient } from "@/api/client";

function ParentScheduleClass({ userInfo, loading, error, fetchUser }) {
  const navigation = useRouter();
  const [value, onChange] = useState(new Date());
  const router = useRouter();
  const { instructorId } = router.query;
  const [instructorData, setInstructorData] = useState({});
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");
  const [courseDuration, setCourseDuration] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [classFrequency, setClassFrequency] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsloading] = useState(false)
  const [availableTime, setAvailableTime] = useState([]);
  //const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [time, setTime] = useState();

  useEffect(() => {
    fetchUser();
  }, []);
 
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
    useEffect(() => {
      getCourses();
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

        setIsloading(false);
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
   

   

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        const response = await axios.get(
          `http://34.227.65.157/instructor/details-for-scheduling?instructorId=22`,
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
      getInstructorData();
  }, []);
  



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


    const onContinue = () => {
      const data = {
        start: selectedDate,
        durationInHours: courseDuration,
        classFrequency: classFrequency,
        courseId: courseId,
        studentId: userInfo.id,
        instructorId: instructorId,
        eventInPerson: selectedMode == "In-Person" ? true : false,
      };
      navigation.push({
        pathname: "/parent/coursepay",
        query: data,
    });
    };
  
   /*if (loading) {
      return ( <div>
        Loading...
        </div>
      )
    }
    */
/*
    if (error) {
      return (<div>Error:{error}</div>);
    }
    */

  return (
    <>
      <Head>
        <title>Parent Schedule Class</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentNavbar isLogin={true} />
      {isLoading && (
             <div className="d-flex justify-content-center">

             <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
             </div>
           </div>
      )}
 
      <main className="container-fluid">
        <div className="row" style={{ minHeight: "90vh" }}>
          <div className="col-12 col-lg-6 pt-5">
            <p className="fw-bold text-center">Schedule class with John Doe</p>
            <Calendar 
              onChange={handleDateChange} 
              value={selectedDate} 
             // tileClassName={tileClassName} 
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
                       <li key={index}>
                         {`${slot.start.toLocaleTimeString()} - ${slot.end.toLocaleTimeString()}`}
                       </li>
                     ))}
                   </ul>
                </div>
                <div className=" w-100">
                  <p className="p-0 m-0 fw-bold text-center py-2">
                    Your information
                  </p>
                  <p className="p-0 m-0 fw-bold py-2">
                    Course duration in Hours
                  </p>
                  <input
                    onChange={handleDuration}
                    type="number"
                    className={`p-2 rounded outline-0 border border_gray w-100 ${styles.landingInputs}`}
                  />
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
                  className="w-25 btn_primary text-light p-2 rounded fw-bold "
                  onClick={() => onContinue()}
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
  connect(mapStateToProps, { fetchUser })(ParentScheduleClass),
  ["Parent"]
);

