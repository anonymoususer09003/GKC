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
import { RRule } from "rrule";
import { fetchUser } from "../../../store/actions/userActions";
import { apiClient } from "@/api/client";
import { useDispatch } from "react-redux";

function StudentScheduleClass({ userInfo, loading, error, fetchUser }) {

  const router = useRouter();
  const { instructorId } = router.query;
  const status = router.isReady;

  console.log("router query", router.query);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [selectedMode, setSelectedMode] = useState("");
  const [instId, setInstId] = useState(instructorId);
  const [instructorData, setInstructorData] = useState();
  const [courseDuration, setCourseDuration] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [classFrequency, setClassFrequency] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [time, setTime] = useState();
  const [duration, setDuration] = useState(0);
  const [err, setErr] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    if(status){
      fetchUser();
      const fetchUnavailableDates = async () => {
        const disabledDates = []
        try{
          const responce = await apiClient(`/instructor/unavailable-days-in-UTC-TimeZone?instructorId=${instructorId}`) //hardcoded
          console.log(responce.data)
          responce.data.forEach((el)=>{
            disabledDates.push(new Date(el.end))
          })
        console.log(disabledDates)
        setUnavailableDates(disabledDates)
        }catch (err) {
          console.log(err)
        }
  
  
      }
      fetchUnavailableDates()
      const fetchInstructorData = async () => {
        try{
          const responce = await apiClient(`/instructor/details-for-scheduling?instructorId=${instructorId}`) //hardcoded
          console.log(responce.data)
          setSelectedInstructor(responce.data)
        }catch (err) {
          console.log(err)
        }
      }
      fetchInstructorData()
    }
  }, [instructorId]);

  //Get Courses
  const getCourses = async () => {
    try {
      const response = await axios.get(
        `https://staging-api.geekkidscode.com/public/course/with-instructors`
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
  }, [instructorId]);

  //get Instructor Data

  useEffect(() => {
    const getInstructorData = async () => {
      try {
        var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));

        const response = await axios.get(
          `https://staging-api.geekkidscode.com/instructor/details-for-scheduling?instructorId=${instructorId}`,
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
    if (view === "month") {
      if (isDateUnavailable(date)) {
        return {
          backgroundColor: "gray",
          color: "black",
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
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const formattedDateStr = `${year}-${month}-${day}`;
    setDuration(0)

    setSelectedDate(formattedDateStr);
    console.log(formattedDateStr)
    try {
      const response = await apiClient.get(
        `/instructor/available-time-slots-from-date?instructorId=${instructorId}&date=${formattedDateStr}`
      );
      
      const timeSlots = response.data.map((slot) => ({
        start: new Date(slot.start),
        end: new Date(slot.end),
      }));
      console.log(timeSlots)
      const isOnHalfHour = (date) => date.getMinutes() === 0 || date.getMinutes() === 30;



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
      if(formattedTimeSlots.length>0){
        setErr('')
      } else{
        setErr('Tutor unavailable')
      }
      
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
            .replace("T", " ");

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
      courseId: instructorCourses.find(el => el.label === courseId).value,
      studentId: userInfo.id,
      instructorId: instructorId,
      eventInPerson: selectedMode == "In-Person" ? true : false
    };
    console.log("class frequency", data);
    router.push({
      pathname: "/student/coursepay",
      query: data,
    });
  };

  return (
    <>
      <Head>
        <title>Student Schedule Class</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      <main className="container-fluid">
        <div className="row" style={{ minHeight: "90vh" }}>
          <div className="col-12 col-lg-6 pt-5">
            {
              selectedInstructor &&
              <h3
              style={{
                textAlign:'center'
              }}
              >Calendar for {selectedInstructor?.firstName} {selectedInstructor?.lastName}</h3>
            }
            <Calendar
              value={selectedDate}
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
            <div className="shadow rounded py-5">
              <div
                className="d-flex flex-sm-nowrap flex-wrap justify-content-between gap-4 px-5"
                style={{ minHeight: "400px" }}
              >
                <div className="w-100 ">
                  <p className="p-0 m-0 fw-bold pb-2">{ duration > 0 ? <>You selected {duration} hours</> : <>Select time</>}</p>
                  <p>{err}</p>
                    {availableTime && availableTime.map((slot, index) => (
                      <li
                        key={index}
                        className={`m-03 py-1 fw-bold list-unstyled ${
                          selectedSlots.some(
                            (selectedSlot) =>
                              selectedSlot.start.getTime() ===
                                slot.start.getTime() &&
                              selectedSlot.end.getTime() === slot.end.getTime()
                          )
                            ? "bg-secondary text-white"
                            : ""
                        }`}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {`${slot.start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} - ${slot.end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`}
                      </li>
                    ))}
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
                      onChange={(event)=>{handleCourseId(event)}}
                      value={courseId}
                    >
                      <option>Select</option>
                      {selectedInstructor && selectedInstructor?.coursesToTutorAndProficiencies.map((course) => {
                        return (
                          <option key={course.course.id} value={course.course.name}>
                            {course.course.name}
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
                      {instructorData?.hourlyRate} USD/hr
                    </h6>
                  </div>

                  <div className="py-2 d-flex align-items-start gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Grade:</h6>
                    <div>
                      {
                        instructorData && instructorData?.gradesToTutor.map((el)=>{
                          return <>
                          <h6 key={el.id}  className="text-dark fw-bold m-0 p-0">
                            {el.description}
                          </h6>   
                          </>
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center pt-5">
                <button
                  className={`w-25 text-light p-2 rounded fw-bold  ${
                    !classFrequency || !time ? "btn_disabled" : "btn_primary"
                  }`}
                  disabled={!classFrequency || !time ? true : false}
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
