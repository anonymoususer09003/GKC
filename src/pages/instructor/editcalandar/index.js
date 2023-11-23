import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { Navbar, Footer } from './../../../components';
import Calendar from 'react-calendar';
import { BASE_URL, withRole } from '../../../utils/withAuthorization';
import { apiClient } from '../../../api/client';
import { connect } from 'react-redux';
import { fetchUser } from '../../../store/actions/userActions';
import '../../../styles/Calendar.module.css';
import * as ical from 'ical.js';
import { TutorNavbar } from './../../../components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { RiArrowGoBackLine } from 'react-icons/ri';
import moment, { weekdays } from 'moment';

function EditCalandar({ loading, error, fetchUser }) {
  const [value, onChange] = useState(new Date());
  const [userInfo, setUserInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const router = useRouter();
  const formRef = useRef(null);
  const [userId, setUserId] = useState(userInfo?.id ?? null);
  const [available, setAvailable] = useState(false);
  const [filledData, setFilledData] = useState(false);
  const [selectedDays, setSelectedDays] = useState('');
  const [startTime, setStartTime] = useState('2000-12-31 06:00');
  const [endTime, setEndTime] = useState('2000-12-31 08:00');
  const [err, setErr] = useState('');
  // const [dates, setDates] = useState([])
  const [weekDays, setWeekDays] = useState([]); // {available, startTime, endTime, dayOfTheWeek}

  const [undo, setUndo] = useState(true);
  const weekDay = [];
  const disabledDates = [];
  const [dd, setDD] = useState([]);
  const [unavailableSuccess, setUnavailableSuccess] = useState(false);
  const [availableSuccess, setAvailableSuccess] = useState(null);
  const [timezone, setTimezone] = useState('');

  const [weekdaysArr, setWeekDaysArr] = useState([
    {
      available: false,
      dayOfTheWeek: 'MONDAY',
      endTime: '00:00',
      startTime: '00:00',
    },

    {
      available: false,
      dayOfTheWeek: 'TUESDAY',
      endTime: '00:00',
      startTime: '00:00',
    },
    {
      available: false,
      dayOfTheWeek: 'WEDNESDAY',
      endTime: '00:00',
      startTime: '00:00',
    },
    {
      available: false,
      dayOfTheWeek: 'THURSDAY',
      endTime: '00:00',
      startTime: '00:00',
    },
    {
      available: false,
      dayOfTheWeek: 'FRIDAY',
      endTime: '00:00',
      startTime: '00:00',
    },
    {
      available: false,
      dayOfTheWeek: 'SATURDAY',
      endTime: '00:00',
      startTime: '00:00',
    },
    {
      available: false,
      dayOfTheWeek: 'SUNDAY',
      endTime: '00:00',
      startTime: '00:00',
    },
  ]);

  const daysOrder = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];
  const [weekSArr, setWeeksArr] = useState([
    {
      label: 'Mon',
      value: 'MONDAY',
      isChecked: false,
    },

    {
      label: 'Tue',
      value: 'TUESDAY',
      isChecked: false,
    },
    {
      label: 'Wed',
      value: 'WEDNESDAY',
      isChecked: false,
    },
    {
      label: 'Thur',
      value: 'THURSDAY',
      isChecked: false,
    },
    {
      label: 'Fri',
      value: 'FRIDAY',
      isChecked: false,
    },
    {
      label: 'Sat',
      value: 'SATURDAY',
      isChecked: false,
    },
    {
      label: 'Sun',
      value: 'SUNDAY',
      isChecked: false,
    },
  ]);

  const handleCheckedAvailable = (index) => {
    let temp = [...weekSArr];
    let tempValue = { ...temp[index] };
    tempValue.isChecked = tempValue.isChecked ? false : true;
    temp[index] = tempValue;

    let temp1 = [...weekdaysArr];
    let temp1Value = { ...temp1[index] };

    if (temp[index].isChecked) {
      temp1Value.startTime = moment().format('HH:00');
      temp1Value.endTime = '23:00';
      temp1Value.available = true;
    } else {
      temp1Value.startTime = '00:00';
      temp1Value.endTime = '00:00';
      temp1Value.available = false;
    }

    console.log('temp1value', temp1Value);
    temp1[index] = temp1Value;
    console.log('temp1', temp1);
    setWeekDaysArr(temp1);
    setWeeksArr(temp);
  };

  let tz;
  let times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  function guessContinent(timeZone) {
    const americaIdentifiers = [
      'America/',
      'US/',
      'Canada/',
      'Mexico/',
      'Argentina/',
      'Brazil/',
      'Chile/',
      'Colombia/',
    ];

    const europeIdentifiers = [
      'Asia/',
      'Europe/',
      'London/',
      'Paris/',
      'Berlin/',
      'Madrid/',
      'Rome/',
      'Athens/',
    ];

    for (const identifier of americaIdentifiers) {
      if (timeZone.startsWith(identifier)) {
        return 'America';
      }
    }

    for (const identifier of europeIdentifiers) {
      if (timeZone.startsWith(identifier)) {
        return 'Europe';
      }
    }

    // If neither America nor Europe is found, return "Unknown"
    return 'Unknown';
  }

  // function findOccurrencesVevent(arr, target) {
  //   const occurrences = [];

  //   function search(arr) {
  //     for (const item of arr) {
  //       if (Array.isArray(item) && item.length >= 2 && item[0] === target) {
  //         occurrences.push(item[1]); // Add the [1] element of the matching array
  //       } else if (Array.isArray(item)) {
  //         search(item); // Recurse into subarray
  //       }
  //     }
  //   }

  //   search(arr);

  //   return occurrences;
  // }

  function undoAll() {
    disabledDates.length = 0;
    setUndo(!undo);
  }
  // function updateRepetitiveWeekDays(inputArray) {
  //   const weekDayCount = {}; // To keep track of encountered weekDay numbers
  //   const weekDayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  //   // Iterate through the array and update weekDay numbers
  //   for (let i = 0; i < inputArray.length; i++) {
  //     const item = inputArray[i];
  //     const weekDayName = item.dayOfTheWeek;

  //     // Find the index of the weekDayName in the array
  //     const weekDayIndex = weekDayNames.indexOf(weekDayName);

  //     // Check if we've encountered this weekDay before
  //     if (weekDayCount[weekDayIndex]) {
  //       // Increment and update the weekDayName
  //       item.dayOfTheWeek = weekDayNames[(weekDayIndex + 1) % 7]; // Wrap around to Monday if Sunday is encountered
  //     }

  //     // Update the count for this weekDay
  //     weekDayCount[weekDayIndex] = (weekDayCount[weekDayIndex] || 0) + 1;
  //   }

  //   return inputArray;
  // }

  // function findOccurrencesTimeslots(arr, target) {
  //   let latestDtEnd = null;

  //   function search(arr) {
  //     for (const item of arr) {
  //       if (Array.isArray(item) && item.length >= 2) {
  //         const [key, , type, value] = item;
  //         if (key === target && type === "date-time") {
  //           const dtEnd = new Date(value);
  //           if (!latestDtEnd || dtEnd > latestDtEnd) {
  //             latestDtEnd = dtEnd;
  //           }
  //         }
  //       }
  //       if (Array.isArray(item)) {
  //         search(item);
  //       }
  //     }
  //   }

  //   search(arr);

  //   return latestDtEnd ? latestDtEnd.toISOString() : null;
  // }

  // function getTimeSlotFromtDateStr(dateStr) {
  //   const utcDate = new Date(dateStr);

  // // Replace 'en-US' and 'Europe/Kiev' with your desired locale and timezone
  //   const formattedTime = new Intl.DateTimeFormat('en-US', {
  //     timeZone:  tz,
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: false,
  //   }).format(utcDate);

  //   return formattedTime
  // }

  // function getWeekdayFromDate(dateString) {
  //   // Create a Date object from the input string (parsed in local time)
  //   const date = new Date(dateString);

  //   // Define the time zone for "Asia/Tbilisi"
  //   const timeZone = tz;

  //   // Get the offset in minutes between the local time zone and "Asia/Tbilisi"
  //   const timeZoneOffset = date.getTimezoneOffset() / 60;

  //   // Calculate the UTC time by subtracting the time zone offset
  //   const utcTime = new Date(date.getTime() - timeZoneOffset * 60 * 60 * 1000);

  //   // Create a new Date object in the "Asia/Tbilisi" time zone
  //   const tbilisiDate = new Date(utcTime.toLocaleString('en-US', { timeZone }));

  //   // Define an array of weekday names
  //   const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  //   // Get the numeric day of the week (0 = Sunday, 1 = Monday, etc.)
  //   const dayOfWeek = tbilisiDate.getDay();

  //   // Use the day of the week to index into the weekdays array
  //   return weekdays[dayOfWeek];
  // }

  function getObjectByWeekDay(inputArray, targetWeekDay) {
    // Find the object with the target weekDay
    const targetObject = inputArray?.find(
      (item) => item?.dayOfTheWeek === targetWeekDay
    );
    return targetObject || null; // Return the object or null if not found
  }

  // function getAverageDateAndWeekday(date1Str, date2Str) {
  //   // Parse the input date strings into Date objects
  //   const date1 = new Date(date1Str);
  //   const date2 = new Date(date2Str);

  //   // Calculate the average time in milliseconds
  //   const averageTime = (date1.getTime() + date2.getTime()) / 2;

  //   // Create a new Date object for the average time
  //   const averageDate = new Date(averageTime);

  //   // Get the name of the weekday
  //   const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  //   const weekdayName = weekdays[averageDate.getUTCDay()];

  //   return weekdayName.toLowerCase(); // Return the lowercase weekday name
  // }
  //calendar
  const handleDateChange = (clickedDate) => {
    const year = clickedDate.getFullYear();
    const month = parseInt(clickedDate.getMonth() + 1) // we use +1 because array starts from 0. Which is why january starts from 0.
      .toString()
      .padStart(2, '0');
    const day = parseInt(clickedDate.getDate()).toString().padStart(2, '0');
    //  console.log(`${year}-${month}-${day}T00:00:00`)
    disabledDates.push(`${year}-${month}-${day}T00:00:00`);
    console.log(disabledDates);

    // let date = clickedDate.toJSON().slice(0,16)
    // console.log('clidcked date',date)
    // // console.log(disabledDates)

    //   //  const year = clickedDate.toISOString().slice(0, 4);
    //   //  const month = clickedDate.toISOString().slice(5, 7);
    //   //  const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1)
    //   //  .toString()
    //   //  .padStart(2, "0");

    //   //  const modifiedClickedDate = `${year}-${month}-${day}`;
    //   let actualDay = new Date(date).toJSON()
    //   console.log('ad', actualDay)
    //   disabledDates.push(actualDay.slice(0, 19))

    //   console.log(disabledDates)
  };

  //days click

  const handleDayClick = (day) => {
    setSelectedDays(day);
    setAvailable(getObjectByWeekDay(weekDays, day)?.available);
  };

  //start time
  const handleStartTime = (timeslot, weekdayname) => {
    let weekDay = [];
    weekDays.forEach((el) => {
      if (el.dayOfTheWeek === weekdayname) {
        el.startTime = timeslot;
      }
    });
    weekDay = weekDays;
    console.log(weekDay);
    setStartTime(timeslot);
    setWeekDays(weekDay);
    setAvailable(true);
    setIfChoseAnotherWeek(true);
  };

  //end time

  const handleEndTime = (timeslot, weekdayname) => {
    let weekDay = [];
    weekDays.forEach((el) => {
      if (el.dayOfTheWeek === weekdayname) {
        el.endTime = timeslot;
      }
    });
    weekDay = weekDays;
    console.log(weekDay);
    setEndTime(timeslot);
    setWeekDays(weekDay);
    setAvailable(true);
    setIfChoseAnotherWeek1(true);
    setFilledData(true);
  };

  const handleCheckbox = (weekdayname, checkState) => {
    console.log(weekdayname);
    let weekDay = [];
    weekDays.forEach((el) => {
      if (el.dayOfTheWeek === weekdayname) {
        el.available = checkState;
        setAvailable(!available);
      }
    });
    weekDay = weekDays;
    setWeekDays(weekDay);
    console.log(weekDay);
  };

  const setUnAvialablaDates = async () => {
    setUnavailableSuccess(true);
    let dates = [];
    disabledDates.forEach((el) => {
      const modifiedClickedDate = el.slice(0, 10);
      dates.push(modifiedClickedDate);
    });
    console.log(dates);
    setDD(dd.concat(dates));
    let requestDates = [];
    dates.forEach((el) => {
      requestDates.push({
        date: el,
      });
    });

    try {
      const response = await apiClient.post(
        '/instructor/unavailable-days',
        requestDates
      );
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    setAvailableSuccess(true);
    let weekDay = [];
    weekDays.forEach((el) => {
      el.dayOfTheWeek = el.dayOfTheWeek.toUpperCase();
    });
    weekDay = weekDays;
    try {
      const res = await apiClient.post(
        '/instructor/week-schedule',
        weekdaysArr
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      setErr('You must`ve missing weekdays, time slots or exact day tile.');
    }
  };

  const iCalendar = async () => {
    try {
      const responce = await apiClient.get(
        `/instructor/week-schedule/from-logged-instructor`
      );
      console.log('weeks arr 1', responce.data);

      setWeekDays(responce.data);

      let tem = [];
      weekSArr.map((item) => {
        let findItem = responce.data.find(
          (ele) => ele.dayOfTheWeek == item.value
        );
        let obj = {
          ...item,
          isChecked: findItem?.available ? true : false,
        };
        tem.push(obj);
      });

      const sortedData = responce.data.sort(
        (a, b) =>
          daysOrder.indexOf(a.dayOfTheWeek) - daysOrder.indexOf(b.dayOfTheWeek)
      );
      setWeekDaysArr(sortedData);
      setWeeksArr(tem);
      if (responce.data.length === 0) {
        const res = await axios.get('/timeavailability_placeholder.json');

        setWeekDays(res.data);
      }
    } catch (err) {
      console.log(err);
      if (err.message === 'Network Error') {
        setErr('You must have retry sign in.');
      }
    }
  };

  useEffect(() => {
    const run = async () => {
      try {
        const res = await apiClient.get('/user/logged-user-details');
        console.log(res);
        setTimezone(res.data.timeZoneId);
        setUserInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    run();
    fetchUser();
    iCalendar();

    const fetchUnavailableDates = async () => {
      try {
        const responce = await apiClient.get(
          `/instructor/unavailable-days-in-logged-instructor-TimeZone`
        );
        console.log(responce.data);
        responce.data.forEach((el) => {
          let time = el.start;
          disabledDates.push(time);
        });
        setDD(disabledDates);
        console.log(disabledDates);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUnavailableDates();
  }, []);

  return (
    <>
      {unavailableSuccess ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              background: 'white',
              margin: '500px auto',
              padding: 20,
              width: '380px',
            }}
          >
            <p
              style={{
                width: 350,
                margin: 'auto',
                textAlign: 'center',
                fontSize: 18,
              }}
            >
              Unavailable dates saved successfully.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setUnavailableSuccess(false);
                }}
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: 100 }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {availableSuccess ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              background: 'white',
              margin: '500px auto',
              padding: 20,
              width: '380px',
            }}
          >
            <p
              style={{
                width: 350,
                margin: 'auto',
                textAlign: 'center',
                fontSize: 18,
              }}
            >
              Weekly availability saved successfully.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setAvailableSuccess(false);
                }}
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: 100 }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <TutorNavbar isLogin={true} role="instructor" />
      <div
        className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
        onClick={() => {
          window.location.assign(`${BASE_URL}instructor`);
        }}
        style={{ cursor: 'pointer' }}
      >
        <RiArrowGoBackLine />
        <p className="fw-bold m-0 p-0 ">Exit</p>
      </div>
      <main className="container-fluid">
        <div
          style={{ maxHeight: '90vh', minHeight: '90vh', overflow: 'scroll' }}
        >
          <div className="row pb-5 pr-5 pl-5">
            <div className="col-12 col-lg-6 ">
              <div>
                <p className="text-center">
                  Select days you don 't intend to tutor e.g. Vacation,
                  Christmas, etc. <br />
                  (Selected days will be blocked on your calandar){' '}
                </p>{' '}
                {undo ? (
                  <Calendar
                    onChange={handleDateChange}
                    tileDisabled={
                      dd.length !== 0
                        ? ({ date, view }) =>
                            view === 'month' &&
                            dd.concat(disabledDates).some((disabledDate) => {
                              return (
                                new Date(date).getFullYear() ===
                                  new Date(disabledDate).getFullYear() &&
                                new Date(date).getMonth() ===
                                  new Date(disabledDate).getMonth() &&
                                new Date(date).getDate() ===
                                  new Date(disabledDate).getDate()
                              );
                            })
                        : () => false
                    }
                  />
                ) : (
                  <Calendar
                    onChange={handleDateChange}
                    tileDisabled={
                      dd.length !== 0
                        ? ({ date, view }) =>
                            view === 'month' &&
                            dd.concat(disabledDates).some((disabledDate) => {
                              return (
                                new Date(date).getFullYear() ===
                                  new Date(disabledDate).getFullYear() &&
                                new Date(date).getMonth() ===
                                  new Date(disabledDate).getMonth() &&
                                new Date(date).getDate() ===
                                  new Date(disabledDate).getDate()
                              );
                            })
                        : () => false
                    }
                  />
                )}
              </div>{' '}
              <div
                className="w-100"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
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
              <form ref={formRef}>
                <p className="text-center">
                  Let us know the days of the week you are available and your
                  schedule
                </p>
                <ul
                  className="w-100"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    listStyle: 'none',
                    overflow: 'scroll',
                    maxHeight: '600px',
                  }}
                >
                  {weekSArr.map((item, index) => {
                    let findItem = weekdaysArr.find(
                      (ele) => ele.dayOfTheWeek === item.value
                    );

                    return (
                      //
                      // let findItem=weekdaysArr.find()

                      <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <div style={{ width: '140px' }}>
                          <div></div>
                          <li
                            style={{
                              marginTop: index == 0 ? '65px' : '45px',
                              background: selectedDays.includes('MONDAY')
                                ? 'gray'
                                : 'none',
                              color: selectedDays.includes('MONDAY')
                                ? 'white'
                                : 'black',
                            }}
                          >
                            {item.label}
                          </li>
                        </div>

                        <div
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                            width: '100%',
                            justifyItems: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '100px',
                              marginRight: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            {index === 0 ? (
                              <div>
                                <p className="fw-bold"> Available </p>
                              </div>
                            ) : (
                              <div>
                                <p className="fw-bold"> </p>
                              </div>
                            )}
                            <div>
                              <label>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={item.isChecked}
                                  onChange={() => {
                                    handleCheckedAvailable(index);
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: '20px' }}>
                            {/* <div className="col-4"></div> */}

                            <>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <div
                                  style={{ marginRight: '20px' }}
                                  className="pb-2"
                                >
                                  {index === 0 ? (
                                    <p className="col fw-bold"> From </p>
                                  ) : (
                                    <p className="col fw-bold"></p>
                                  )}

                                  {console.log(
                                    'weekdays array',
                                    JSON.stringify(weekdaysArr)
                                  )}
                                  <select
                                    disabled={!item.isChecked}
                                    value={findItem?.startTime}
                                    className="w-100 p-2 rounded outline-0 border border_gray col"
                                    onChange={(e) => {
                                      let temp = [...weekdaysArr];
                                      let tempValue = { ...temp[index] };
                                      tempValue.startTime = e.target.value;
                                      temp[index] = tempValue;
                                      setWeekDaysArr(temp);
                                    }}
                                  >
                                    {times.map((time) => {
                                      return (
                                        <option key={time} value={time}>
                                          {' '}
                                          {time}{' '}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="pb-2">
                                  {index === 0 ? (
                                    <p className="col fw-bold"> To </p>
                                  ) : (
                                    <p className="col fw-bold"> </p>
                                  )}
                                  <select
                                    disabled={!item.isChecked}
                                    value={findItem?.endTime}
                                    className="w-100 p-2 rounded outline-0 border border_gray col"
                                    onChange={(e) => {
                                      let temp = [...weekdaysArr];
                                      let tempValue = { ...temp[index] };
                                      tempValue.endTime = e.target.value;
                                      temp[index] = tempValue;
                                      setWeekDaysArr(temp);
                                    }}
                                  >
                                    {times.map((time) => {
                                      return (
                                        <option key={time} value={time}>
                                          {' '}
                                          {time}{' '}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
                {/* {!selectedDays && <p>Please select week day.</p>}
                {selectedDays && (
                  <>
                    <div className="row w-75 py-3 ">
                      <div className="col-4">
                        <p className="fw-bold"> Available: </p>{' '}
                      </div>{' '}
                      <div className="col-8">
                        <label name="available">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={available}
                            onChange={() => {
                              handleCheckbox(
                                selectedDays,
                                !getObjectByWeekDay(weekDays, selectedDays)
                                  ?.available
                              );
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="row w-75 py-2 ">
                      <div className="col-4"></div>
                      {available && (
                        <>
                          <div className="col-8">
                            <div className="row pb-2">
                              <p className="col fw-bold"> From </p>{' '}
                              <select
                                className="w-100 p-2 rounded outline-0 border border_gray col"
                                onChange={(e) => {
                                  handleStartTime(e.target.value, selectedDays);
                                }}
                                value={
                                  getObjectByWeekDay(weekDays, selectedDays)
                                    ?.startTime
                                }
                              >
                                {times.map((time) => {
                                  return (
                                    <option key={time} value={time}>
                                      {' '}
                                      {time}{' '}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="row pb-2">
                              <p className="col fw-bold"> To </p>{' '}
                              <select
                                className="w-100 p-2 rounded outline-0 border border_gray col"
                                onChange={(e) => {
                                  handleEndTime(e.target.value, selectedDays);
                                }}
                                value={
                                  getObjectByWeekDay(weekDays, selectedDays)
                                    ?.endTime
                                }
                              >
                                {times.map((time) => {
                                  return (
                                    <option key={time} value={time}>
                                      {' '}
                                      {time}{' '}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )} */}
              </form>
              {err && <p>{err}</p>}

              <div
                className="w-100"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}
              >
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
        <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-2"></div>
      </main>
      <div style={{ position: 'relative', bottom: 0, width: '100vw' }}>
        <Footer />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
});

export default withRole(connect(mapStateToProps, { fetchUser })(EditCalandar), [
  'Instructor',
]);
