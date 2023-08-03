import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { Navbar,  Footer } from "./../../../components";
import Calendar from "react-calendar";
import { withRole } from "../../../utils/withAuthorization";
import { apiClient } from "../../../api/client";
import { connect } from "react-redux";
import { fetchUser } from "../../../store/actions/userActions";
import calendarStyles from "../../../styles/Calendar.module.css";
import { TutorNavbar } from "./../../../components";
import { useRouter } from "next/router";


function EditCalandar({ userInfo, loading, error, fetchUser }) {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const router = useRouter();
  const formRef = useRef(null)
  const [available, setAvailable] = useState(true)
  const [filledData, setFilledData] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("2000-12-31 06:00");
  const [endTime, setEndTime] = useState("2000-12-31 08:00")


  //calendar
  const handleDateChange = (clickedDate) => {
    const year = clickedDate.toISOString().slice(0, 4);
    const month = clickedDate.toISOString().slice(5, 7);
    const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1)
      .toString()
      .padStart(2, "0");
    const modifiedClickedDate = `${year}-${month}-${day}`;
    setSelectedDate(modifiedClickedDate);
    console.log(modifiedClickedDate);
  };


  //days click
  const handleDayClick = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };
  //start time
  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  }
 
  //end time

  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  } 


 const setUnAvialablaDates = async () => {
  try {
    const response = await apiClient.post(
      "/instructor/unavailable-day" ,
      {date: selectedDate}
    )

  }catch(error) {
    console.log(error)
  }
  router.push("/instructor")
 }


 const submitHandler = async () => {
  const dayOfTheWeek =  selectedDays.join(', ');
  console.log(dayOfTheWeek); 
  setFilledData(true);
  try {
    let res = await apiClient.post("/instructor/week-schedule", {
      startTime: startTime,
      endTime: endTime,
      available: available,
      dayOfTheWeek: dayOfTheWeek,
      instructorId: userInfo.id
    })
    setFilledData(true);

  }
  catch(error) {
    console.log(error);
  }
 }

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);


  return (
    <>
     <TutorNavbar isLogin={true} role="instructor" />
      <main className="container-fluid">
        <div style={{ height: "90vh" }}>
          <div className="row p-5">
            <div className="col-12 col-lg-6 ">
                <p className="text-center">
                  Select days you don 't intend to tutor e.g. Thanksgaving, etc.{" "}
                  <br />
                  (Selected days will be blocked on your calandar){" "}
                </p>{" "}
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  //selectRange={true}
                />
            </div>{" "}
            <div className="col-12 col-lg-6 ">

            <form
              ref={formRef}
            > 
                <p className="text-center">
                  Let us know the days of the week you are available and your
                  schedule
                </p>
                <ul className="w-100" style={{display: "flex", justifyContent: "space-between", listStyle: "none"}}>
                    <li onClick={() => handleDayClick('MONDAY')} style={{ background: selectedDays.includes('MONDAY') ? 'gray' : 'none', color: selectedDays.includes('MONDAY') ? 'white' : 'black' }}>Mon</li>
                    <li onClick={() => handleDayClick('TUESDAY')} style={{ background: selectedDays.includes('TUESDAY') ? 'gray' : 'none', color: selectedDays.includes('TUESDAY') ? 'white' : 'black' }}>Tue</li>
                    <li onClick={() => handleDayClick('WEDNESDAY')} style={{ background: selectedDays.includes('WEDNESDAY') ? 'gray' : 'none', color: selectedDays.includes('WEDNESDAY') ? 'white' : 'black' }}>Wed</li>
                    <li onClick={() => handleDayClick('THURSDAY')} style={{ background: selectedDays.includes('THURSDAY') ? 'gray' : 'none', color: selectedDays.includes('THURSDAY') ? 'white' : 'black' }}>Thur</li>
                    <li onClick={() => handleDayClick('FRIDAY')} style={{ background: selectedDays.includes('FRIDAY') ? 'gray' : 'none', color: selectedDays.includes('FRIDAY') ? 'white' : 'black' }}>Fri</li>
                    <li onClick={() => handleDayClick('SATURDAY')} style={{ background: selectedDays.includes('SATURDAY') ? 'gray' : 'none', color: selectedDays.includes('SATURDAY') ? 'white' : 'black' }}>Sat</li>
                    <li onClick={() => handleDayClick('SUNDAY')} style={{ background: selectedDays.includes('SUNDAY') ? 'gray' : 'none', color: selectedDays.includes('SUNDAY') ? 'white' : 'black' }}>Sun</li>
                  </ul>
                <div className="row w-75 py-3 ">
                  <div className="col-4">
                    <p className="fw-bold"> Available: </p>{" "}
                  </div>{" "}
                  <div className="col-8">
                    <label name="available"
                     >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={true}
                        checked
                        onChange={() => setAvailable(true)}
                      />
                    </label>
                  </div>
                </div>
                <div className="row w-75 py-2 ">
                  <div className="col-4">
                    <p className="fw-bold"> Available: </p>
                  </div>
                    <div className="col-8">
                       <div className="row pb-2">
                         <p className="col fw-bold"> From </p>{" "}
                         <select
                           className="w-100 p-2 rounded outline-0 border border_gray col"
                           onChange={handleStartTime}
                           >
                           <option value="06:00"> 06: 00 am </option> 
                         </select>
                       </div>
                       <div className="row pb-2">
                        <p className="col fw-bold"> To </p>{" "}
                         <select 
                         className="w-100 p-2 rounded outline-0 border border_gray col"
                         onChange={handleEndTime}

                         >
                         <option value="08:00"> 08: 00 pm </option> 
                      </select>
                    </div>
                  </div>
                </div>
            </form>
            </div>

            </div>
          </div>
          <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-2">
          <button
              className={`w-25 text-light p-2 rounded fw-bold  bg-gray-300 ${
                selectedDate ? "btn_primary" : "btn_disabled "
              }`}
              disabled={!selectedDate}
              onClick={() => setUnAvialablaDates()}
            >
              Save Unavailable Dates
            </button>
            <button
              className={`w-25 text-light p-2 rounded fw-bold  bg-gray-300 ${
                filledData ? "btn_primary" : "btn_disabled "
              }`}
              onClick={submitHandler}
            >
              Save Availability
            </button>
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

export default withRole(connect(mapStateToProps, { fetchUser })(EditCalandar), [
  "Instructor",
]);
