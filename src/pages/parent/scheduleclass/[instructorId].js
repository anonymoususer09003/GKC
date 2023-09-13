import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ParentNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import { fetchUser } from "@/store/actions/userActions";

import { connect } from "react-redux";
import { apiClient } from "@/api/client";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import GetUnConfirmedEventById from "@/services/events/GetUnConfirmedEventById";
function ParentScheduleClass({ userInfo, loading, error, fetchUser }) {
  const router = useRouter();
  const { instructorId } = router.query;
  const loggedInUser = useSelector((state) => state.user.userInfo);
  console.log("loggedin user", loggedInUser);
  const [instructorData, setInstructorData] = useState({});
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [selectedMode, setSelectedMode] = useState("");
  const [courseId, setCourseId] = useState(null);
  const [classFrequency, setClassFrequency] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [time, setTime] = useState();
  const [studentId, setStudentId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [err, setErr] = useState('')
  const eventId = router?.query?.eventId;
  console.log("eventid", eventId);
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

  const getEventDetail = async () => {
    try {
      let res = await GetUnConfirmedEventById(eventId);

      console.log("res", res);
      const { data } = res;
      setStudentId(data?.studentId);
      setTime(moment(data?.start).format("YYYY-MM-DD HH:mm"));
      setDuration(data.durationInHours);
      setClassFrequency(data.classFrequency);
      setCourseId(data?.courseId);
      setSelectedMode(data?.eventInPerson ? "In-Person" : "Online");
      await handleDateChange(data?.start);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getCourses();
    if (eventId) getEventDetail();
  }, [eventId]);
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const getUnavailableDate = async () => {
      try {
        const response = await apiClient.get(`/instructor/unavailable-days-in-UTC-TimeZone?instructorId=${selectedInstructor?.id}`);

        console.log(response.data);
        setUnavailableDates(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUnavailableDate();
  }, []);

  const isDateUnavailable = (date) => {
    return unavailableDates.some((unavailableDate) => {
      const startDate = new Date(unavailableDate.start);
      const endDate = new Date(unavailableDate.end);
      return date >= startDate && date <= endDate;
    });
  };

  const tileDisabled = ({ date }) => {
    return isDateUnavailable(date);
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

  useEffect(() => {
    console.log(instructorId, 'id')
    const run = () => {
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
      const fetchUnavailableDates = async () => {
        const disabledDates = []
        try{
          const responce = await apiClient(`/instructor/unavailable-days-in-UTC-TimeZone?instructorId=${instructorId}`)
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
          const responce = await apiClient(`/instructor/details-for-scheduling?instructorId=${instructorId}`)
          console.log(responce.data)
          setSelectedInstructor(responce.data)
        }catch (err) {
          console.log(err)
        }
      }
      fetchInstructorData()
    }
    if(instructorId) run()
  }, [instructorId]);

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
        `/instructor/available-time-slots-from-date?instructorId=${selectedInstructor.id}&date=${formattedDateStr}`
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

  const onContinue = () => {
    const data = {
      start: time,
      durationInHours: duration,
      classFrequency: classFrequency,
      courseId: instructorCourses.find(el => el.label === courseId).value,
      studentId: studentId,
      instructorId: selectedInstructor.id,
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
            {
              selectedInstructor &&
              <h3
              style={{
                textAlign:'center'
              }}
              >Calendar for {selectedInstructor?.firstName} {selectedInstructor?.lastName}</h3>
            }
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={tileClassName}
              // tileDisabled={tileDisabled}
              tileDisabled={unavailableDates.length >1 ? ({date, view})=> view === 'month' && unavailableDates.some(disabledDate =>
                new Date(date).getFullYear() === new Date(disabledDate).getFullYear() &&
                new Date(date).getMonth() === new Date(disabledDate).getMonth() &&
                new Date(date).getDate() === new Date(disabledDate).getDate()
                ) : () => false}
            />
          </div>
          <div className="col-12 col-lg-6 pt-5">
            <p className="fw-bold text-center text-white">I</p>
            <div className="shadow rounded py-5">
              <div
                className="d-flex flex-sm-nowrap flex-wrap justify-content-between gap-4 px-3"
                style={{ minHeight: "400px" }}
              >
                <div className="w-100 ">
                  <p className="p-0 m-0 fw-bold pb-2">{ duration > 0 ? <>You selected {duration / 2} hours</> : <>Select time</>}</p>
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
                    <h6 className="text-dark fw-bold m-0 p-0">On Behalf of:</h6>

                    <select
                      className="w-25 p-2 rounded outline-0 border border_gray"
                      value={studentId}
                      onChange={(e)=>{setStudentId(e.target.value)}}
                    >
                      <option>Select</option>
                      {loggedInUser && loggedInUser?.dependents?.map((dependent) => {
                        return (
                          <option key={dependent.email} value={dependent.id}>
                            {dependent.email}
                          </option>
                        );
                      })}
                    </select>
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
                        selectedInstructor && selectedInstructor?.gradesToTutor.map((el)=>{
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
