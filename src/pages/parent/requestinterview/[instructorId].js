

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Calendar from "react-calendar";
import { withRole } from '../../../utils/withAuthorization';
import { connect } from "react-redux";
import { fetchUser } from "../../../store/actions/userActions";

import { Navbar, Footer } from "../../../components";
import { useRouter } from 'next/router';
import axios from "axios"
import { apiClient } from "@/api/client";
import { useSelector } from "react-redux";

function ParentRequestInterview({ userInfo, loading, error, fetchUser }) {
  const router = useRouter();
  const { instructorId } = router.query;
  const [time, setTime] = useState(null);
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const [courseId, setCourseId] = useState(null);
  const [mode, setMode] = useState(null);
  const [courses, setCourses] = useState([]);
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [start, setStart] = useState(null)
  const [events, setEvents] = useState([]);
  const [instructorData, setInstructorData] = useState({});
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");
  const [classFrequency, setClassFrequency] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [err, setErr] = useState('')


  const handleContinue = async () => {
    const data = {
      start:  time,
      courseId: instructorCourses.find(el => el.label === courseId).value,
      studentId: studentId,
      instructorId: instructorId,
    }
    try{
      const res = await apiClient.post('/event/create-interview', data)
      console.log('rees', res)
    } catch(err){
      console.log(err)
    }
  };

  const handleCourseId = (event) => {
    setCourseId(event.target.value);
  };

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

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlots(slot);
  };

  const getInstructorInfo = async () => {
    
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.get(`https://staging-api.geekkidscode.com/instructor/details-for-scheduling?instructorId=${instructorId}`, {
      headers: {
        Authorization: `Bearer ${typ.accessToken}`,
      },
    });
    console.log(res.data);
    setSelectedInstructor(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
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
    setTime(null)

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



// Create 15-minute intervals for each time slot
const formattedTimeSlots = [];
timeSlots.forEach((slot) => {
  const start = new Date(slot.start);
  start.setSeconds(0); // Set seconds to 0
  start.setMilliseconds(0); // Set milliseconds to 0

  while (start.getMinutes() % 15 !== 0) {
    start.setTime(start.getTime() + 15 * 60 * 1000); // Move to the next 15-minute interval
  }

  const end = new Date(start.getTime() + 15 * 60 * 1000);
  end.setSeconds(0); // Set seconds to 0
  end.setMilliseconds(0); // Set milliseconds to 0

  formattedTimeSlots.push({
    start,
    end,
  });
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
    getInstructorInfo();
  }, []);


  // const tileContent = ({ date, view }) => {
  //   if (view === 'month') {
  //     const event = events.find((event) => event?.dtStart.getTime() === date.getTime());
  //     if (event) {
  //       return 'event-day';
  //     }
  //   }

  //   return null;
  // };




  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  console.log(userInfo)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Request Interview</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
      <div
          className="row"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12 col-lg-6 pt-5">
          <p className="fw-bold text-center">
              Schedule Interview with {selectedInstructor?.firstName + ' ' + selectedInstructor?.lastName}
            </p>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              // tileDisabled={tileDisabled}
              tileDisabled={unavailableDates.length >1 ? ({date, view})=> view === 'month' && unavailableDates.some(disabledDate =>
                new Date(date).getFullYear() === new Date(disabledDate).getFullYear() &&
                new Date(date).getMonth() === new Date(disabledDate).getMonth() &&
                new Date(date).getDate() === new Date(disabledDate).getDate()
                ) : () => false} />
          </div>
          <div className="col-12 col-lg-6 pt-5">
          <p className="fw-bold text-center text-white">I</p>
            <div className="shadow rounded py-5">
              <div
                className="d-flex justify-content-between gap-4 px-3"
                style={{ minHeight: "400px" }}
              >
                <div className="w-100 ">
                  <p className="p-0 m-0 fw-bold pb-2">{ duration > 0 ? <>You selected {duration} time slots</> : <>Select time</>}</p>
                  <p>{err}</p>
                  {availableTime && availableTime.map((slot, index) => (
                      <li
                        key={index}
                        className={`m-03 py-1 fw-bold list-unstyled ${
                          time == `${slot.start.getFullYear()}-${String(slot.start.getMonth() + 1).padStart(2, '0')}-${slot.start.getDate()} ${slot.start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}` ?
                          "bg-secondary text-white" : ''
                        }`}
                        onClick={() => {setTime(`${slot.start.getFullYear()}-${String(slot.start.getMonth() + 1).padStart(2, '0')}-${slot.start.getDate()} ${slot.start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}`)}}
                      >
                        {`${slot.start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} - ${slot.end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`}
                      </li>
                    ))}
                </div>
                <div className=" w-100">
                  <p className="p-0 m-0 fw-bold text-center py-2">
                    Your information
                  </p>
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
                    <h6 className="text-dark fw-bold m-0 p-0">Mode:</h6>

                    <select
                      className="w-25 p-2 rounded outline-0 border border_gray   "
                      value={selectedMode}
                      onChange={handleModeChange}
                      style={{position:'relative',left:10}}
                    >
                      <option value="">Select</option>
                      <option value="Online">Online</option>
                      <option value="In-Person">In-Person</option>
                    </select>
                  </div>

                  {/* <h6 className="text-dark fw-bold">Skill:</h6> */}

                  <p className="text-dark fw-bold py-2"></p>

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
                 className={`w-25 text-light p-2 rounded fw-bold btn_primary`}
                 onClick={()=> handleContinue()}>
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

export default withRole(connect(mapStateToProps, { fetchUser })(ParentRequestInterview), ['Parent']);