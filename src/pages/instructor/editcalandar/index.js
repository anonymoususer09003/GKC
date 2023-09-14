import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { Navbar,  Footer } from "./../../../components";
import Calendar from "react-calendar";
import { withRole } from "../../../utils/withAuthorization";
import { apiClient } from "../../../api/client";
import { connect } from "react-redux";
import { fetchUser } from "../../../store/actions/userActions";
import "../../../styles/Calendar.module.css";
import * as ical from 'ical.js';
import { TutorNavbar } from "./../../../components";
import { useRouter } from "next/router";
import axios from "axios";
import { weekdays } from "moment";


function EditCalandar({ userInfo, loading, error, fetchUser }) {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const router = useRouter();
  const formRef = useRef(null)
  const [userId, setUserId] = useState(userInfo?.id ?? null)
  const [available, setAvailable] = useState(true)
  const [filledData, setFilledData] = useState(false);
  const [selectedDays, setSelectedDays] = useState('');
  const [startTime, setStartTime] = useState("2000-12-31 06:00");
  const [endTime, setEndTime] = useState("2000-12-31 08:00")
  const [err, setErr] = useState('')
  // const [dates, setDates] = useState([])
  const [weekDays, setWeekDays] = useState([])// {available, startTime, endTime, dayOfTheWeek}
  const [ifChoseAnotherWeek, setIfChoseAnotherWeek] = useState(false)
  const [ifChoseAnotherWeek1, setIfChoseAnotherWeek1] = useState(false)
  const [undo, setUndo] = useState(true)
  const weekDay = [];
  const disabledDates = []
  let times = ['00:00', '01:00',  '02:00',  '03:00',   
  '04:00',  '05:00',  '06:00',  '07:00',   '08:00',  '09:00',  '10:00',  '11:00',   '12:00',  '13:00',  
  '14:00',  '15:00',   '16:00',  '17:00',  '18:00',  '19:00',   '20:00',  '21:00',  '22:00',  '23:00']

  function findOccurrencesVevent(arr, target) {
    const occurrences = [];
  
    function search(arr) {
      for (const item of arr) {
        if (Array.isArray(item) && item.length >= 2 && item[0] === target) {
          occurrences.push(item[1]); // Add the [1] element of the matching array
        } else if (Array.isArray(item)) {
          search(item); // Recurse into subarray
        }
      }
    }
  
    search(arr);
  
    return occurrences;
  }

  function undoAll() {
    disabledDates.length = 0;
    setUndo(!undo)
  }
  function updateRepetitiveWeekDays(inputArray) {
    const weekDayCount = {}; // To keep track of encountered weekDay numbers
    const weekDayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    // Iterate through the array and update weekDay numbers
    for (let i = 0; i < inputArray.length; i++) {
      const item = inputArray[i];
      const weekDayName = item.dayOfTheWeek;
      
      // Find the index of the weekDayName in the array
      const weekDayIndex = weekDayNames.indexOf(weekDayName);
      
      // Check if we've encountered this weekDay before
      if (weekDayCount[weekDayIndex]) {
        // Increment and update the weekDayName
        item.dayOfTheWeek = weekDayNames[(weekDayIndex + 1) % 7]; // Wrap around to Monday if Sunday is encountered
      }
      
      // Update the count for this weekDay
      weekDayCount[weekDayIndex] = (weekDayCount[weekDayIndex] || 0) + 1;
    }
    
    return inputArray;
  }

  function findOccurrencesTimeslots(arr, target) {
    let latestDtEnd = null;
  
    function search(arr) {
      for (const item of arr) {
        if (Array.isArray(item) && item.length >= 2) {
          const [key, , type, value] = item;
          if (key === target && type === "date-time") {
            const dtEnd = new Date(value);
            if (!latestDtEnd || dtEnd > latestDtEnd) {
              latestDtEnd = dtEnd;
            }
          }
        }
        if (Array.isArray(item)) {
          search(item);
        }
      }
    }
  
    search(arr);
  
    return latestDtEnd ? latestDtEnd.toISOString() : null;
  }


  function getTimeSlotFromtDateStr(dateStr) {
    const utcDate = new Date(dateStr);

  // Replace 'en-US' and 'Europe/Kiev' with your desired locale and timezone
    const formattedTime = new Intl.DateTimeFormat('en-US', {
      timeZone:  "Asia/Tbilisi", 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(utcDate);

    return formattedTime
  }

  function getWeekdayFromDate(dateString) {
    // Create a Date object from the input string (parsed in local time)
    const date = new Date(dateString);
  
    // Define the time zone for "Asia/Tbilisi"
    const timeZone = 'Asia/Tbilisi';
  
    // Get the offset in minutes between the local time zone and "Asia/Tbilisi"
    const timeZoneOffset = date.getTimezoneOffset() / 60;
  
    // Calculate the UTC time by subtracting the time zone offset
    const utcTime = new Date(date.getTime() - timeZoneOffset * 60 * 60 * 1000);
  
    // Create a new Date object in the "Asia/Tbilisi" time zone
    const tbilisiDate = new Date(utcTime.toLocaleString('en-US', { timeZone }));
  
    // Define an array of weekday names
    const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    // Get the numeric day of the week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = tbilisiDate.getDay();
  
    // Use the day of the week to index into the weekdays array
    return weekdays[dayOfWeek];
  }
  
  function getObjectByWeekDay(inputArray, targetWeekDay) {
    // Find the object with the target weekDay
    const targetObject = inputArray.find(item => item?.dayOfTheWeek === targetWeekDay);
    return targetObject || null;// Return the object or null if not found
  }

  function getAverageDateAndWeekday(date1Str, date2Str) {
    // Parse the input date strings into Date objects
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
  
    // Calculate the average time in milliseconds
    const averageTime = (date1.getTime() + date2.getTime()) / 2;
  
    // Create a new Date object for the average time
    const averageDate = new Date(averageTime);
  
    // Get the name of the weekday
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weekdayName = weekdays[averageDate.getUTCDay()];
  
    return weekdayName.toLowerCase(); // Return the lowercase weekday name
  }
  //calendar
  const handleDateChange = (clickedDate) => {
    console.log(clickedDate)


      //  const year = clickedDate.toISOString().slice(0, 4);
      //  const month = clickedDate.toISOString().slice(5, 7);
      //  const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1)
      //  .toString()
      //  .padStart(2, "0");

      //  const modifiedClickedDate = `${year}-${month}-${day}`;
       disabledDates.push(new Date(clickedDate))
       console.log(disabledDates)

  };


  //days click

  const handleDayClick = (day) => {
    setSelectedDays(day)
 /*   setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });*/
  };

  //start time
  const handleStartTime = (timeslot, weekdayname) => {
    let weekDay = [];
    weekDays.forEach((el)=>{
      if(el.dayOfTheWeek === weekdayname){
        el.startTime = timeslot
      }
    })
    weekDay = weekDays;
    console.log(weekDay)
    setStartTime(timeslot);
    setWeekDays(weekDay)
    setAvailable(true)
    setIfChoseAnotherWeek(true)
  }
 
  //end time

  const handleEndTime = (timeslot, weekdayname) => {
    let weekDay = [];
    weekDays.forEach((el)=>{
      if(el.dayOfTheWeek === weekdayname){
        el.endTime = timeslot
      }
    })
    weekDay = weekDays;
    console.log(weekDay)
    setEndTime(timeslot);
    setWeekDays(weekDay)
    setAvailable(true)
    setIfChoseAnotherWeek1(true)
    setFilledData(true)
  }


  const handleCheckbox = (weekdayname, checkState) =>{
    console.log(weekdayname)
    let weekDay = [];
    weekDays.forEach((el)=>{
      if(el.dayOfTheWeek === weekdayname){
        el.available = checkState
        setAvailable(el.available)
      }
    })
    setIfChoseAnotherWeek(true)
    weekDay = weekDays;
    setWeekDays(weekDay)
    console.log(weekDay)
  }


 const setUnAvialablaDates = async (date) => {
  let dates = []
  disabledDates.forEach((el)=>{
      const year = el.toISOString().slice(0, 4);
      const month = el.toISOString().slice(5, 7);
      const day = (parseInt(el.toISOString().slice(8, 10)) + 1)
      .toString()
      .padStart(2, "0");

      const modifiedClickedDate = `${year}-${month}-${day}`;
      dates.push(modifiedClickedDate)
    })
  let requestDates = []
  dates.forEach((el)=>{
    requestDates.push(
      {
        date: el
      }
    )
  })
    console.log(requestDates)
    try {
      const response = await apiClient.post(
        "/instructor/unavailable-days" ,
        requestDates
      )
      // console.log(response)
    }catch(error) {
      console.log(error)
    }
  }


 const submitHandler = async () => {
  let weekDay = [];
  weekDays.forEach((el)=>{
    el.dayOfTheWeek = el.dayOfTheWeek.toUpperCase()
  })
  weekDay = weekDays;
  try {
    const res = await apiClient.post("/instructor/week-schedule", weekDay);
    console.log(res)
  }
  catch(error) {
    console.log(error);
    setErr('You must`ve missing weekdays, time slots or exact day tile.')
  }
 }
 const handleDisabledTile = (value, event) => {
    console.log(value)
 }

 const iCalendar = async () => {
 
    try{
      const responce = await apiClient.get(`/instructor/schedule-iCal?instructorId=${userId}`)
      console.log(responce.data)
      // console.log(res)
      const jcalData = ical.parse(responce.data);
      const comp = new ical.Component(jcalData);
      console.log(comp.jCal[2])


      const veventArray = findOccurrencesVevent(comp.jCal[2], "vevent")
      console.log(veventArray)
      if(veventArray.length > 1){
        veventArray.forEach((el)=>{
          const availability = el.length > 8 ? false : true
          const dateStr1 = findOccurrencesTimeslots(el, 'dtstart')
          const dateStr2 = findOccurrencesTimeslots(el, 'dtend')
          const dayOfWeek1 = getWeekdayFromDate(dateStr1)
          const dayOfWeek2 = getWeekdayFromDate(dateStr2)


            weekDay.push({
              available: availability,
              startTime: getTimeSlotFromtDateStr(dateStr1),
              endTime: getTimeSlotFromtDateStr(dateStr2),
              dayOfTheWeek: dayOfWeek1.toLowerCase()
            })

          
          // console.log(dayOfWeek1, dayOfWeek2)
          // console.log(availability + getTimeSlotFromtDateStr(dateStr1) + ` and ` + getTimeSlotFromtDateStr(dateStr2))
          // setWeekDays([...weekdays, {}])
        })
        // const goodweekdays = updateRepetitiveWeekDays(weekDay)
        
        console.log(weekDay)
        setWeekDays(weekDay)

      }else {
        const res = await axios.get('/timeavailability_placeholder.json')
        res.data.forEach((el)=>{
          el.dayOfTheWeek = el.dayOfTheWeek.toLowerCase()
        })
        res.data.forEach((el)=>{
          weekDay.push({
            available: el.available,
            startTime: el.startTime,
            endTime: el.endTime,
            dayOfTheWeek: el.dayOfTheWeek
          })
        })
        const goodweekdays = updateRepetitiveWeekDays(weekDay)

        console.log(goodweekdays)
        setWeekDays(goodweekdays)
        
      }
      // // Iterate through events and add to calendar
      // vevents.forEach(vevent => {
      //   const eventStart = vevent.getFirstPropertyValue('dtstart').toJSDate();
      //   const eventEnd = vevent.getFirstPropertyValue('dtend').toJSDate();
      //   console.log(eventStart, eventEnd)
      // });

    } catch (err) {
      console.log(err)
      if(err.message === 'Network Error'){
        setErr('You must have retry sign in.')
      }

    }
}


  useEffect(() => {
    fetchUser();
    iCalendar();
    console.log(fetchUser(), 'useeeer')
  }, [fetchUser]);


  return (
    <>
     <TutorNavbar isLogin={true} role="instructor" />
      <main className="container-fluid">
        <div style={{ height: "90vh" }}>
          <div className="row p-5">
            <div className="col-12 col-lg-6 ">
            <div>
                <p className="text-center">
                  Select days you don 't intend to tutor e.g. Vacation, Christmas, etc.{" "}
                  <br />
                  (Selected days will be blocked on your calandar){" "}
                </p>{" "}
                {
                  undo ?
                  <Calendar
                  // style={calendarStyles}
                    onChange={handleDateChange}
                    // onClickDay={}
                    value={selectedDate}
                    // selectRange={true}
                    onClickDay={handleDisabledTile}
                    tileDisabled={({date, view})=> view === 'month' && disabledDates.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                      )}
                  /> :
                  <Calendar
                  // style={calendarStyles}
                    onChange={handleDateChange}
                    // onClickDay={}
                    value={selectedDate}
                    // selectRange={true}
                    onClickDay={handleDisabledTile}
                    tileDisabled={({date, view})=> view === 'month' && disabledDates.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                      )}
                  />
                }
            </div>{" "}
            <div className="w-100"
            style={{display:'flex', justifyContent: 'space-between', marginTop:20}}
            >
            <button
              className={`w-20 text-light p-2 rounded fw-bold  bg-gray-300 btn_primary`}
              onClick={undoAll}
            >
              Undo
            </button>
            <button
              className={`w-50 text-light p-2 rounded fw-bold  bg-gray-300 btn_primary`}
              onClick={() => setUnAvialablaDates()}
            >
              Save Unavailable Dates
            </button>
            </div>
            </div>


            <div className="col-12 col-lg-6 ">

            <form
              ref={formRef}
            > 
                <p className="text-center">
                  Let us know the days of the week you are available and your
                  schedule
                </p>
                <ul className="w-100" style={{display: "flex", justifyContent: "space-between", listStyle: "none"}}>
                    <li onClick={() => {handleDayClick('MONDAY') ; setIfChoseAnotherWeek(false); setIfChoseAnotherWeek1(false); }} style={{ background: selectedDays.includes('MONDAY') ? 'gray' : 'none', color: selectedDays.includes('MONDAY') ? 'white' : 'black' }}>Mon</li>
                    <li onClick={() => {handleDayClick('TUESDAY') ; setIfChoseAnotherWeek(false); setIfChoseAnotherWeek1(false);}} style={{ background: selectedDays.includes('TUESDAY') ? 'gray' : 'none', color: selectedDays.includes('TUESDAY') ? 'white' : 'black' }}>Tue</li>
                    <li onClick={() => {handleDayClick('WEDNESDAY') ; setIfChoseAnotherWeek(false); setIfChoseAnotherWeek1(false);}} style={{ background: selectedDays.includes('WEDNESDAY') ? 'gray' : 'none', color: selectedDays.includes('WEDNESDAY') ? 'white' : 'black' }}>Wed</li>
                    <li onClick={() => {handleDayClick('THURSDAY') ; setIfChoseAnotherWeek(false); setIfChoseAnotherWeek1(false);} } style={{ background: selectedDays.includes('THURSDAY') ? 'gray' : 'none', color: selectedDays.includes('THURSDAY') ? 'white' : 'black' }}>Thur</li>
                    <li onClick={() => {handleDayClick('FRIDAY') ; setIfChoseAnotherWeek(false); setIfChoseAnotherWeek1(false);}} style={{ background: selectedDays.includes('FRIDAY') ? 'gray' : 'none', color: selectedDays.includes('FRIDAY') ? 'white' : 'black' }}>Fri</li>
                    <li onClick={() => {handleDayClick('SATURDAY') ; setIfChoseAnotherWeek(false); setIfChoseAnotherWeek1(false);}} style={{ background: selectedDays.includes('SATURDAY') ? 'gray' : 'none', color: selectedDays.includes('SATURDAY') ? 'white' : 'black' }}>Sat</li>
                    <li onClick={() => {handleDayClick('SUNDAY') ; setIfChoseAnotherWeek(false); setIfChoseAnotherWeek1(false);}} style={{ background: selectedDays.includes('SUNDAY') ? 'gray' : 'none', color: selectedDays.includes('SUNDAY') ? 'white' : 'black' }}>Sun</li>
                  </ul>
                {
                  !selectedDays && (
                    <p>Please select week day. This page has hardcoded http requests. If you see this text, remind Danil about that.</p>
                  )
                }
                {
                  selectedDays && (
                    <>
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
                            // value={true}
                            checked={ifChoseAnotherWeek ? available : ( getObjectByWeekDay(weekDays, selectedDays.toLowerCase())?.available ) ?? false}
                            onChange={() => {
                              handleCheckbox(selectedDays.toLowerCase(), !getObjectByWeekDay(weekDays, selectedDays.toLowerCase())?.available )
                            }}
    
                          />
                        </label>
                      </div>
                    </div>
                    <div className="row w-75 py-2 ">
                      <div className="col-4">
                      </div>
                      {
                        getObjectByWeekDay(weekDays, selectedDays.toLowerCase())?.available  && <>
                        <div className="col-8">
                           <div className="row pb-2">
                             <p className="col fw-bold"> From </p>{" "}
                             <select
                               className="w-100 p-2 rounded outline-0 border border_gray col"
                               onChange={(e)=>{handleStartTime(e.target.value, selectedDays.toLowerCase())}}
                               value={ifChoseAnotherWeek ? startTime : (getObjectByWeekDay(weekDays, selectedDays.toLowerCase())?.startTime ) ?? 'loading'}

                               >
                             {times.map((time) => {
                               return <option key={time} value={time}> {time} </option> 
                               }
                             )}
                            
                             </select>
                           </div>
                           <div className="row pb-2">
                            <p className="col fw-bold"> To </p>{" "}
                             <select 
                             className="w-100 p-2 rounded outline-0 border border_gray col"
                             onChange={(e)=>{handleEndTime(e.target.value, selectedDays.toLowerCase())}}
                             value={ifChoseAnotherWeek1 ? endTime : (getObjectByWeekDay(weekDays, selectedDays.toLowerCase())?.endTime ) ?? 'loading'}
                             
                             >
                            {times.map((time) => {
                               return <option key={time} value={time}> {time} </option> 
                               }
                             )}           
                         </select>
                        </div>
                      </div>
                        </>
                      }
                    </div>
                    </>
                  )
                }
            </form>
            {
              err && <p>
              {err}
            </p>
            }

              <div className="w-100"
            style={{display:'flex', justifyContent: 'flex-end', marginTop:20}}>
                <button
                  className={`w-50 text-light p-2 rounded fw-bold  bg-gray-300 btn_primary`}
                  onClick={submitHandler}
                >
                  Save Availability
                </button>
              </div>
            </div>

            </div>
          </div>
          <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-2">
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