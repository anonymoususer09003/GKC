import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { useRouter } from 'next/router';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Link from 'next/link';
import axios from 'axios';
import { apiClient } from '@/api/client';
import moment from 'moment';
export default function RegistrationGrade() {
  const navigation = useRouter();
  const [grades, setGrades] = useState([]);
  const [grade1, setGrade1] = useState(null);
  const [grade2, setGrade2] = useState(null);
  const [grade3, setGrade3] = useState(null);
  const [grade4, setGrade4] = useState(null);
  const [err, setErr] = useState('');
  const formRef = useRef(null);
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

  const [weekSArr, setWeeksArr] = useState([
    {
      label: 'mon',
      value: 'MONDAY',
      isChecked: false,
    },

    {
      label: 'tue',
      value: 'TUESDAY',
      isChecked: false,
    },
    {
      label: 'wed',
      value: 'WEDNESDAY',
      isChecked: false,
    },
    {
      label: 'thurs',
      value: 'THURSDAY',
      isChecked: false,
    },
    {
      label: 'fri',
      value: 'FRIDAY',
      isChecked: false,
    },
    {
      label: 'sat',
      value: 'SATURDAY',
      isChecked: false,
    },
    {
      label: 'sun',
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

  const onContinue = () => {
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));

    stored.weeklySchedule = weekdaysArr;
    window.localStorage.setItem('registrationForm', JSON.stringify(stored));
    navigation.push('/auth/instructorbankinfo');
  };

  const getGrades = async () => {
    try {
      const response = await apiClient.get(`/public/register/get-all-grades`);
      setGrades(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGrades();
  }, []);
  return (
    <>
      <Head>
        <title>Auth | Grades to Teach</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid">
        <div
          onClick={() => navigation.back()}
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          style={{ cursor: 'pointer' }}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </div>
        <div>
          <div className="col-12 col-lg-6 py-6" style={{ width: '100%' }}>
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
                  alignItems: 'center',
                }}
              >
                {weekSArr.map((item, index) => (
                  <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <div style={{ marginRight: '90px' }}>
                      <div></div>
                      <li
                        style={{
                          marginTop: '65px',

                          color: 'black',
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
                          marginRight: '90px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <p className="fw-bold"> Available: </p>{' '}
                        </div>{' '}
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
                              <p className="col fw-bold"> From </p>{' '}
                              <select
                                disabled={!item.isChecked}
                                value={weekdaysArr[index].startTime}
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
                              <p className="col fw-bold"> To </p>{' '}
                              <select
                                disabled={!item.isChecked}
                                value={weekdaysArr[index].endTime}
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
                ))}
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
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                //   className="w-100"
                style={{
                  display: 'flex',

                  marginTop: 20,
                }}
              >
                <button
                  style={{ width: '300px' }}
                  className={` text-light p-2 rounded fw-bold  bg-gray-300 btn_primary`}
                  onClick={onContinue}
                >
                  continue
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
