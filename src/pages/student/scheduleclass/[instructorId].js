import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { BsFillSendFill } from "react-icons/bs";
import { withRole } from "../../../utils/withAuthorization";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { fetchUser } from "../../../store/actions/userActions";
import calendarStyles from "../../../styles/Calendar.module.css";
import axios from "axios";
import { GlobalInstructor } from "@/pages";
import styles from "../../../styles/Home.module.css";

function StudentScheduleClass({ userInfo, loading, error, fetchUser }) {
  const router = useRouter();
  const { instructorId } = router.query;

  // const [value, onChange] = useState(date);
  const [availableTime, setAvailableTime] = useState([
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ]);
  const [time, setTime] = useState();
  // console.log( date, mode, time, courseId, instructorId )
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [radioVal, setRadioVal] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [instId, setInstId] = useState(instructorId);
  const [instructorData, setInstructorData] = useState({});
  const [courseDuration, setCourseDuration] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [classFrequency, setClassFrequency] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleContinue = async () => {
    const data = {
      start: selectedDate,
      durationInHours: courseDuration,
      classFrequency: classFrequency,
      courseId: courseId,
      studentId: userInfo.id,
      instructorId: instructorId,
      eventInPerson: selectedMode == "In-Person" ? true : false,
    };

    // console.log(data)
    router.push({
      pathname: "/student/coursepay",
      query: data,
    });
  };

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
      console.error(error);
    }
  };
  //Fetch user details from redux
  useEffect(() => {
    fetchUser();
    setInstId(instructorId);
  }, [fetchUser]);

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
          `http://34.227.65.157/instructor/schedule-and-unavailable-days-iCal?instructorId=${instructorId}`,
          {
            headers: {
              Authorization: `Bearer ${typ.accessToken}`,
            },
          }
        );
        console.log(response, "Icaaaal");
      } catch (error) {
        console.log(error);
      }
    };

    getInstructorIcal();
  }, []);

  const handleDateChange = (clickedDate) => {
    /*const dateObj = new Date(clickedDate);
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDateStr = `${year}-${month}-${day}`;*/

    const dateObj = new Date(clickedDate);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");

    const formattedDateStr = `${year}-${month}-${day} ${hours}:${minutes}`;
    setSelectedDate(formattedDateStr);
  };

  useEffect(() => {
    getCourses();
  }, []);

  //Get Modes
  //eventInPerson
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  //Get course duration
  const handleDuration = (e) => {
    setCourseDuration(e.target.value);
  };

  //get courseId

  const handleCourseId = (event) => {
    setCourseId(event.target.value);
  };

  /*
  {
    "classDto": {
     -- "start": "2000-01-01 23:59",
      +"durationInHours": 0, 
      +"classFrequency": "ONETIME or DAILY or WEEKLY or BIWEEKLY or MONTHLY",
      + "courseId": 0,
      +"studentId": 0,
      +"whoPaysId": 0,
      +"instructorId": 0,
      +"eventInPerson": true
    },
    "stripeResponseDTO": {
      "paymentIntentId": "string",
      "paymentStatus": "string"
    }
  }
  */
  if (loading) {
    return ( <div>
      Loading...
      </div>
    )
  }

  if (error) {
    return (<div>Error:{error}</div>);
  }
  console.log("selected date", selectedDate);
  return (
    <>
      <Head>
        <title>Student Schedule Class</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div className="row" style={{ minHeight: "90vh" }}>
          <div className="col-12 col-lg-6 pt-5">
            <Calendar
              //value={date}
              onChange={handleDateChange}
              value={selectedDate}
              className={calendarStyles.reactCalendar}
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
                  <div className="border rounded ">
                    {availableTime.map((v, i) => {
                      return (
                        <p
                          className={`m-0 px-3 py-1 fw-bold ${
                            time == v && "bg-secondary text-white"
                          }`}
                          key={i}
                          onClick={() => {
                            setTime(v);
                          }}
                        >
                          {v}
                        </p>
                      );
                    })}
                  </div>
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
