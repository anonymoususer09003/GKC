

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ParentNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import {useRouter} from "next/router"
import { withRole } from '../../../utils/withAuthorization';
import { connect } from "react-redux";
import { fetchUser } from "../../../store/actions/userActions";

function ParentRequestInterview({ userInfo, loading, error, fetchUser }) {
  const router = useRouter();
  const { instructorId } = router.query;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [courseId, setCourseId] = useState('');
  const [mode, setMode] = useState('');
  const [courses, setCourses] = useState([]);
  const [availableTime, setAvailableTime] = useState([ '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00', '18:00', '19:00',  ]);
  const [insName, setInsName] = useState(null);
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([
  console.log(instructorId  )
    // Add more events as needed
  ]);
  const [unavailableDates, setUnavailableDates] = useState([

  ]);


  const handleContinue = () => {
    
    const fullDate = date.toISOString();
    
    const data = {
      date: (fullDate),
      time:  time,
      courseId: courseId,
      mode: mode,
      instructorId:instructorId,
      hourlyRate: insName.hourlyRate
    };

    router.push({
      pathname: '/student/scheduleclass',
      query: data
    });
  };


  const getCourses = async () => {
    try {
      const response = await axios.get(
        `http://34.227.65.157/public/course/get-all-courses`
      );

      var technologyList = [];

      response.data.map((v) => {
        technologyList.push({ value: v.id, label: v.name });
      });
      setCourses(technologyList);
    } catch (error) {
      console.error(error);
    }
  };




  const getInstructorInfo = async () => {
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.get(`http://34.227.65.157/instructor/instructor-details-for-scheduling?instructorId=${instructorId}`
    //   , {
    //   headers: {
    //     Authorization: `Bearer ${typ.accessToken}`,
    //   },
    // }
    );
    console.log(res.data);
    setInsName(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };



  useEffect(() => {
    getCourses();
    getInstructorInfo();
    const fetchProfileData = async () => {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      console.log(typ)
      try {
        const res = await axios.get(`http://34.227.65.157/instructor/schedule-and-unavailable-days-iCal?instructorId=${instructorId}`, {
        headers: {
          Authorization: `Bearer ${typ.accessToken}`,
        },
      });
      console.log(res.data);

    const calendarData = res.data;

    const events = [];
    const unavailableDays = [];

    const lines = calendarData.split('\n');

    let currentEvent = null;
    let currentFreeBusy = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('BEGIN:VEVENT')) {
        currentEvent = {};
      } else if (line.startsWith('BEGIN:VFREEBUSY')) {
        currentFreeBusy = {};
      } else if (line.startsWith('UID:') && (currentEvent || currentFreeBusy)) {
        const uid = line.split(':')[1];
        if (currentEvent) {
          currentEvent.uid = uid;
        } else if (currentFreeBusy) {
          currentFreeBusy.uid = uid;
        }
      } else if (line.startsWith('DTSTART:') && currentEvent) {
        const dtStart = line.split(':')[1];
        const dateString = dtStart;
        const year = parseInt(dateString.slice(0, 4));
        const month = parseInt(dateString.slice(4, 6)) - 1; // Month is zero-based in JavaScript's Date object
        const day = parseInt(dateString.slice(6, 8));
        const date = new Date(year, month, day);
        currentEvent.dtStart =  date;

      } else if (line.startsWith('FREEBUSY;FBTYPE=BUSY:') && currentFreeBusy) {
        const [start, end] = line.split(':')[1].split('/');

        const dateString = start;
        const year = parseInt(dateString.slice(0, 4));
        const month = parseInt(dateString.slice(4, 6)) - 1; // Month is zero-based in JavaScript's Date object
        const day = parseInt(dateString.slice(6, 8));
        const date = new Date(year, month, day);
        currentFreeBusy.start = date;
        currentFreeBusy.end = end;
      } else if (line.startsWith('END:VEVENT')) {
        if (currentEvent) {
          events.push(currentEvent);
          currentEvent = null;
        }
      } else if (line.startsWith('END:VFREEBUSY')) {
        if (currentFreeBusy) {
          unavailableDays.push(currentFreeBusy);
          currentFreeBusy = null;
        }
      }
    }

    // this.setState({ events, unavailableDays });
    setUnavailableDates(unavailableDays)
    setEvents(events)
    console.log(events, unavailableDays)
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};

fetchProfileData()
  }, []);


  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events.find((event) => event?.dtStart.getTime() === date.getTime());
      if (event) {
        return 'event-day';
      }
    }

    return null;
  };

  
  const tileDisabled = ({ date }) => {
    return unavailableDates.some((disabledDay) => date.toDateString() === disabledDay.start.toDateString());
  };


  const handleTimeClick = (time) => {
    setTime(time);
  };



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

  const onContinue = () => {
    router.push("/parent/scheduleclass")
  }
  return (
    <>
      <Head>
        <title>Request Interview</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentNavbar isLogin={true} />
      <main className="container-fluid">
      <div
          className="row"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12 col-lg-6 pt-5">
          <p className="fw-bold text-center">
              Schedule Interview with {insName?.fullName}
            </p>
            <Calendar onChange={setDate} value={date} 
              tileDisabled={tileDisabled}
              tileClassName={tileContent} />
          </div>
          <div className="col-12 col-lg-6 pt-5">
          <p className="fw-bold text-center text-white">I</p>
            <div className="shadow rounded py-5">
              <div
                className="d-flex justify-content-between gap-4 px-3"
                style={{ minHeight: "400px" }}
              >
                <div className="w-100 ">
                  <p className="p-0 m-0 fw-bold pb-2">Select time</p>
                  <div className="border rounded p-2 px-3">
                    <p className="p-0 m-0 py-1 fw-bold">7:00 am</p>
                    <p className="p-0 m-0 py-1 fw-bold">7:15 am</p>
                    <p className="p-0 m-0 py-1 fw-bold">7:30 am</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p className="p-0 m-0 py-1 fw-bold">4:45 pm</p>
                    <p className="p-0 m-0 py-1 fw-bold">5:00 pm</p>
                  </div>
                </div>
                <div className=" w-100">
            

<p className="p-0 m-0 fw-bold text-center py-2">
                    Your dependent's information
                  </p>

                  <div className="d-flex align-items-center gap-3 py-3">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      On behalf of:
                    </h6>

                    <select className="w-25 p-2 flex-fill rounded outline-0 border border_gray ">
                      <option>Select</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-3">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      Course:
                    </h6>

                    <select className="w-25 flex-fill p-2 rounded outline-0 border border_gray ">
                      <option>Select</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-3">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      Mode:
                    </h6>

                    <select className="w-25 flex-fill p-2 rounded outline-0 border border_gray ">
                      <option>Select</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>

                  <h6 className="text-dark fw-bold">Mode:</h6>

                  <p className="text-dark fw-bold py-2">Intermediate</p>

                  <h6 className="text-dark fw-bold">Grade:</h6>

                  <p className="text-dark fw-bold py-2">Middle School</p>
               
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center pt-5">
                <button className="w-25 btn_primary text-light p-2 rounded fw-bold " 
                onClick={()=>onContinue()}
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

export default withRole(connect(mapStateToProps, { fetchUser })(ParentRequestInterview), ['Parent']);