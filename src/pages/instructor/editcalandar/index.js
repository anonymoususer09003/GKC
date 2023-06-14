import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, TutorNavbar, Footer } from "./../../../components";
import Calendar from "react-calendar";
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { withRole } from "../../../utils/withAuthorization";
import { isSameDay, format } from "date-fns";
import axios from "axios";

function EditCalandar() {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([

// Add more events as needed
]);
const [unavailableDates, setUnavailableDates] = useState([

]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  const getUnavailableDays = async () => {
    const dateToConvert = new Date(selectedDate);
    const convertedDate = format(dateToConvert, "yyyy-MM-dd");
    console.log(convertedDate);

    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.post(
        "http://34.227.65.157/instructor/unavailable-day",
        {
          date: convertedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        }
      );
      console.log(res);
      fetchProfileData()
      // setProfile(res.data);
      alert("success");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchProfileData = async () => {

try {
  var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
  const resp = await axios.get("http://34.227.65.157/user/logged-user-details", {
  headers: {
    Authorization: `Bearer ${typ.accessToken}`,
  },
  });
  console.log('=============>', resp.data.id);


try {
  var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
  const res = await axios.get(`http://34.227.65.157/instructor/schedule-and-unavailable-days-iCal?instructorId=${resp.data.id}`, {
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


// setProfile(res.data);
} catch (error) {
  console.error('Error fetching profile data:', error);
}

};

  useEffect(() => {

   

  

fetchProfileData()
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events.find((event) => event.dtStart.getTime() === date.getTime());
      // const event = events.find((event) =>console.log(date.getTime()));
      if (event) {
        return 'event-day';
      }
    }

    return null;
  };

  
  const tileDisabled = ({ date }) => {
    // return unavailableDates.some((disabledDay) => date.start.toDateString() === disabledDay.toDateString());
    return unavailableDates.some((disabledDay) => date.toDateString() === disabledDay.start.toDateString());
  };

  return (
    <>
      <Head>
        <title> Instructor Landing Page </title>{" "}
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <TutorNavbar isLogin={true} />{" "}
      <main className="container-fluid">
        <div style={{ height: "90vh" }}>
          <div className="row p-5">
            <div className="col-12 col-lg-6 ">
              <p className="text-center">
                Let us know the days of the week you are available and your
                schedule{" "}
              </p>{" "}
              <table width="100%" role="grid" style={{ tableLayout: "fixed" }}>
                <tbody>
                  <tr>
                    <td roll="gridcell"> Mon </td>{" "}
                    <td roll="gridcell"> Tue </td>{" "}
                    <td roll="gridcell"> Wed </td>{" "}
                    <td roll="gridcell"> Thur </td>{" "}
                    <td roll="gridcell"> Fri </td>{" "}
                    <td roll="gridcell"> Sat </td>{" "}
                    <td roll="gridcell"> Sun </td>{" "}
                  </tr>{" "}
                </tbody>
              </table>
              <div className="row w-75 py-3 ">
                <div className="col-4">
                  <p className="fw-bold"> Available: </p>{" "}
                </div>{" "}
                <div className="col-8">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="check1"
                    name="option1"
                    value="something"
                    checked
                  />
                </div>{" "}
              </div>
              <div className="row w-75 py-2 ">
                <div className="col-4">
                  <p className="fw-bold"> Available: </p>{" "}
                </div>{" "}
                <div className="col-8">
                  <div className="row pb-2">
                    <p className="col fw-bold"> From </p>{" "}
                    <select className="w-100 p-2 rounded outline-0 border border_gray   col">
                      <option> 06: 00 am </option> <option> Student </option>{" "}
                      <option> Student </option>{" "}
                    </select>{" "}
                  </div>
                  <div className="row pb-2">
                    <p className="col fw-bold"> To </p>{" "}
                    <select className="w-100 p-2 rounded outline-0 border border_gray  col">
                      <option> 06: 00 pm </option> <option> Student </option>{" "}
                      <option> Student </option>{" "}
                    </select>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 col-lg-6 ">
              <p className="text-center">
                Select days you don 't intend to tutor e.g. Thanksgaving, etc.{" "}
                <br />
                (Selected days will be blocked on your calandar){" "}
              </p>{" "}
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                calendarType="US"
                tileDisabled={tileDisabled}
              tileClassName={tileContent}
              />{" "}
              {/* <p>{selectedDate.toDateString()}</p> */}{" "}
            </div>{" "}
          </div>{" "}
          <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-2">
            <button
              className={`w-25 text-light p-2 rounded fw-bold  bg-gray-300 ${
                selectedDate ? "btn_primary" : "btn_disabled "
              }`}
              disabled={!selectedDate}
              onClick={() => getUnavailableDays()}
            >
              Save{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
      <Footer />
    </>
  );
}

export default withRole(EditCalandar, ["Instructor"]);
