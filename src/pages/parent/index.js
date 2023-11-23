import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { ParentNavbar, Footer, TutorCard } from '../../components';
const inter = Inter({ subsets: ['latin'] });
import { withRole } from '../.././utils/withAuthorization';
import { apiClient } from '../../api/client';
import Link from 'next/link';
import axios from 'axios';
import { base_url } from '../../api/client';
import { parseISO, format } from 'date-fns';
import { useRouter } from 'next/router';

const starArray = [
  {
    label: '1 Star',
    id: '1',
  },
  {
    label: '2 Stars',
    id: '2',
  },
  {
    label: '3 Stars',
    id: '3',
  },
  {
    label: '4 Stars',
    id: '4',
  },
  {
    label: '5 Stars',
    id: '5',
  },
];

function ParentLandingPage() {
  const nav = useRouter();
  const [showCards, setShowCards] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [insructorsFound, setInsructorsFound] = useState(true);
  const [selectedCourse, setSelectCourse] = useState('');
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [mode, setMode] = useState('');
  const [stars, setStars] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [selectedZip, setSelectedZip] = useState('');
  const [page, setPage] = useState(0);
  const [hourlyRate, setHourlyRate] = useState('');
  const [innerWidth, setInnerWidth] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lang, setLang] = useState([]);
  const [proficiency, setProficiency] = useState([]);
  const [insructors, setInsructors] = useState([]);
  const [goBackSchedule, setGoBackSchedule] = useState(false);
  const [goScheduleFromSignIn, setGoScheduleFromSignIn] = useState(false);
  const [pageState, setPageState] = useState(null);
  const [goInterviewFromSignIn, setGoInterviewFromSignIn] = useState(false);

  const search = async () => {
    console.log(JSON.stringify(page).length > 1 ? page : '0' + page);
    if (page === 0) {
      try {
        // var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        const res = await axios.get(
          `${base_url}/public/landing/filter?name=${name}${
            isNaN(hourlyRate) ? '' : '&hourlyRate=' + hourlyRate
          }${isNaN(skill) ? '' : '&proficiency=' + skill}${
            findNumbersUsingRegExp(selectedZip)
              ? '&zipCode=' + selectedZip
              : selectedZip.length > 0
              ? '&city=' + selectedZip
              : ''
          }${
            stars.length > 1 ? '' : '&rating=' + stars
          }&grades=${ageGroup}&courses=${selectedCourse}&spokenLanguage=${selectedLang}&deliveryModes=${mode}&page=0&size=10`,
          {
            /*  headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
          */
          }
        );
        console.log(res);
        if (res.data.content.length > 0) {
          setInsructorsFound(true);
          setInsructors(res.data.content);
          setPageState(res.data);
        } else {
          setInsructorsFound(false);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    if (page >= 1) {
      try {
        // var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        const res = await axios.get(
          `${base_url}/public/landing/filter?page=${
            JSON.stringify(page).length > 1 ? page : '0' + page
          }${
            findNumbersUsingRegExp(selectedZip)
              ? '&zipCode=' + selectedZip
              : selectedZip.length > 0
              ? '&city=' + selectedZip
              : ''
          }${isNaN(skill) ? '' : '&proficiency=' + skill}${
            stars.length > 1 ? '' : '&rating=' + stars
          }&name=${name}${
            isNaN(hourlyRate) ? '' : '&hourlyRate=' + hourlyRate
          }&grades=${ageGroup}&courses=${selectedCourse}&spokenLanguage=${selectedLang}&deliveryModes=${mode}&page=0&size=10`
        );
        setInsructors(insructors.concat(res.data.content));
        setPageState(res.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  };

  function findNumbersUsingRegExp(inputString) {
    // Define a regular expression to match numbers
    const regex = /\d+/g;

    // Use the `match()` method to find all matches in the input string
    const numbersArray = inputString.match(regex);

    return numbersArray ? true : false;
  }

  const getInstructors = async () => {
    try {
      const res = await apiClient.get('/public/landing/filter?page=0&size=10');
      setInsructors(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  if (typeof window !== 'undefined') {
    useEffect(() => {
      console.log(window.innerWidth);
      setInnerWidth(window.innerWidth);
    }, [window.innerWidth]);
  }
  const getCourses = async () => {
    try {
      const response = await apiClient.get(`/public/course/with-instructors`);
      var technologyList = [];

      response.data.forEach((v) => {
        technologyList.push({ value: v.id, label: v.name });
      });
      setCourses(technologyList);
    } catch (error) {
      console.error(error);
    }
  };

  const getProficiency = async () => {
    try {
      const response = await apiClient.get(
        `/public/course/get-all-proficiencies`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setProficiency(arr);
    } catch (error) {
      console.error(error);
    }
  };
  const getLang = async () => {
    try {
      const response = await apiClient.get(`/public/language/with-instructors`);
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setLang(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
    getProficiency();
    getLang();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('goScheduleFromSignIn') !== null) {
        setGoScheduleFromSignIn(true);
      }
      if (window.localStorage.getItem('goInterviewFromSignIn') !== null) {
        setGoInterviewFromSignIn(true);
      }

      if (window.localStorage.getItem('goBookingScheduleFromSignIn') !== null) {
        let path = JSON.parse(
          window.localStorage.getItem('goBookingScheduleFromSignIn')
        );

        setTimeout(
          () => window.localStorage.removeItem('goBookingScheduleFromSignIn'),
          9000
        );
        nav.push(path.path);
      }
    }
  }, []);
  return (
    <>
      <Head>
        <title>GeekKidsCode</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <ParentNavbar />

      {goScheduleFromSignIn ? (
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
              We noticed that you attempted to schedule a class. Would you like
              to continue?
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  nav.push(
                    `/${JSON.parse(
                      window.localStorage.getItem('gkcAuth')
                    ).role.toLowerCase()}/scheduleclass/${JSON.parse(
                      window.localStorage.getItem('goScheduleFromSignIn')
                    )}`
                  );
                  window.localStorage.removeItem('goScheduleFromSignIn');
                }}
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: 100 }}
              >
                Yes
              </button>
              <button
                className="p-2 rounded fw-bold mt-3"
                style={{ background: 'none', border: 'none' }}
                onClick={() => {
                  setGoScheduleFromSignIn(false);
                  window.localStorage.removeItem('goScheduleFromSignIn');
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {goInterviewFromSignIn ? (
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
              We noticed that you attempted request to interview. Would you like
              to continue?
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  nav.push(
                    `/${JSON.parse(
                      window.localStorage.getItem('gkcAuth')
                    ).role.toLowerCase()}/requestinterview/${JSON.parse(
                      window.localStorage.getItem('goInterviewFromSignIn')
                    )}`
                  );
                  window.localStorage.removeItem('goInterviewFromSignIn');
                }}
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: 100 }}
              >
                Yes
              </button>
              <button
                className="p-2 rounded fw-bold mt-3"
                style={{ background: 'none', border: 'none' }}
                onClick={() => {
                  setGoInterviewFromSignIn(false);
                  window.localStorage.removeItem('goInterviewFromSignIn');
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <main className="container-fluid">
        <div className="container py-4">
          <p className="text-center mb-0 tw-font-medium tw-text-[25px] tw-text-[#f48342]">
            Start here by searching
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap py-3">
            <input
              type="text"
              placeholder="Search for a tutor by Name"
              className={`p-2 rounded outline-0 border border_gray ${styles.landingInputs}`}
              onChange={(e) => {
                setPage(0);
                setName(e.target.value);
              }}
            />
          </div>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <select
              className="p-2 rounded outline-0 border border_grFay"
              onChange={(e) => {
                setPage(0);
                setSelectCourse(e.target.value);
              }}
            >
              <option value="">Course</option>
              {courses.map((course) => {
                return (
                  <option value={course.value} key={course.value}>
                    {course.label}
                  </option>
                );
              })}
            </select>
            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => {
                setPage(0);
                setSkill(e.target.value);
              }}
            >
              <option value="">Proficiency</option>
              {proficiency.map((prof) => {
                return (
                  <option value={prof.value} key={prof.value}>
                    {prof.label}
                  </option>
                );
              })}
            </select>

            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => {
                setPage(0);
                setAgeGroup(e.target.value);
              }}
            >
              <option value="">Grade</option>
              <option value="1">Elementary School &#40;&#60;=10yrs&#41;</option>
              <option value="2">Middle School &#40;11yrs - 13yrs&#41;</option>
              <option value="3">High School &#40;14yrs - 18yrs&#41;</option>
              <option value="4">College & Beyond &#40;&gt;18yrs&#41;</option>
            </select>
            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => {
                setPage(0);
                setMode(e.target.value);
              }}
            >
              <option value="">Delivery Mode</option>
              <option value="1">In-Person</option>
              <option value="2">Online</option>
            </select>
            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => {
                setPage(0);
                setSelectedLang(e.target.value);
              }}
            >
              <option value="">Spoken Language</option>
              {lang.map((lan) => {
                return (
                  <option value={lan.value} key={lan.value}>
                    {lan.label}
                  </option>
                );
              })}
            </select>
            <input
              type="number"
              placeholder="Max Hourly Rate"
              className={`p-2 rounded outline-0 border border_gray ${styles.landingInputs}`}
              onChange={(e) => {
                setPage(0);
                setHourlyRate(parseFloat(e.target.value));
              }}
            />
            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => {
                setPage(0);
                setStars(e.target.value);
              }}
            >
              <option>Min Stars</option>
              {starArray.map((el) => {
                return (
                  <option value={el.id} key={el.id}>
                    {el.label}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Enter City and state or Zip/Post Code"
              className={`p-2 rounded outline-0 border border_gray w-25 ${styles.landingInputs}`}
              onChange={(e) => {
                setPage(0);
                setSelectedZip(e.target.value);
              }}
            />
            <button
              className={`btn_primary py-2 px-5 fw-bold text-white rounded`}
              onClick={() => search()}
            >
              Search
            </button>
          </div>
        </div>
        <hr className="p-0 m-0" />
        {insructors && (
          <div className="container py-4">
            {insructors.map((instructor) => {
              return (
                <TutorCard
                  data={instructor}
                  key={instructor.id}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              );
            })}
          </div>
        )}

        {pageState?.last === false && (
          <>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <button
                className="btn_primary py-2 px-5 fw-bold text-white rounded"
                onMouseDown={() => setPage(page + 1)}
                onMouseUp={() => {
                  setTimeout(() => {
                    search();
                  }, 200);
                }}
              >
                Load more
              </button>
            </div>
            <Footer />
          </>
        )}
      </main>
      {insructors.length < 1 && (
        <>
          {insructorsFound === false ? (
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
              Oops! There are no instructors that match your search criteria.
            </div>
          ) : null}
          <div
            style={{
              margin: '0px auto',
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
            }}
          >
            <div
              className={`shadow ${innerWidth > 980 ? 'd-flex' : ''}`}
              style={{
                borderRadius: 30,
                width: `${innerWidth > 980 ? '700px' : '256px'}`,
              }}
            >
              <div
                style={{
                  width: `${innerWidth > 980 ? '500px' : '256px'}`,
                  height: 256,
                  fontSize: '2svh',
                  padding: '10px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 auto',
                }}
              >
                Why should my child learn to code? With Artificial Intelligence
                and Machine Learning set to feature prominently in our future
                lives, we need to get our kids ready
              </div>
              <div>
                <img
                  style={{ borderRadius: '0 30px 30px 0' }}
                  src={
                    'https://gkc-images.s3.amazonaws.com/childrenlearning.png'
                  }
                  height={256}
                  width={256}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              margin: '30px auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              width: '70%',
              alignItems: 'end',
            }}
          >
            <div
              className={`shadow ${
                innerWidth > 980 ? 'd-flex tw-flex-row-reverse' : ''
              }`}
              style={{
                borderRadius: 30,
                width: `${innerWidth > 980 ? '700px' : '256px'}`,
              }}
            >
              <div
                style={{
                  width: `${innerWidth > 980 ? '500px' : '256px'}`,
                  height: 256,
                  fontSize: '2svh',
                  padding: '10px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Prepare your child for the future by having them learn how to
                code from live tutors
              </div>
              <div>
                <img
                  style={{
                    borderRadius: `${
                      innerWidth > 980 ? '30px 0 0 30px' : '0 30px 30px 0'
                    }`,
                  }}
                  src={'https://gkc-images.s3.amazonaws.com/childfuture.png'}
                  height={256}
                  width={256}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              margin: '30px auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              width: '70%',
            }}
          >
            <div
              className={`shadow ${innerWidth > 980 ? 'd-flex' : ''}`}
              style={{
                borderRadius: 30,
                width: `${innerWidth > 980 ? '700px' : '256px'}`,
              }}
            >
              <div
                style={{
                  width: `${innerWidth > 980 ? '500px' : '256px'}`,
                  height: 256,
                  fontSize: '2svh',
                  padding: '10px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Looking for a tutor to teach your child coding? Look no further
                – Find great tutors from around the world
              </div>
              <div>
                <img
                  style={{ borderRadius: '0 30px 30px 0' }}
                  src={
                    'https://gkc-images.s3.amazonaws.com/lookingfortutor.png'
                  }
                  height={256}
                  width={256}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              margin: '30px auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              width: '70%',
              alignItems: 'end',
            }}
          >
            <div
              className={`shadow ${
                innerWidth > 980 ? 'd-flex tw-flex-row-reverse' : ''
              }`}
              style={{
                borderRadius: 30,
                width: `${innerWidth > 980 ? '700px' : '256px'}`,
              }}
            >
              <div
                style={{
                  width: `${innerWidth > 980 ? '500px' : '256px'}`,
                  height: 256,
                  fontSize: '2svh',
                  padding: '10px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                With parents’ busy schedule, eliminate the drive to brick and
                mortar coding classes. Have your child learn coding from a live
                tutor from the comfort of their homes
              </div>
              <div>
                <img
                  style={{ borderRadius: '30px 0 0 30px' }}
                  src={'https://gkc-images.s3.amazonaws.com/familyincar.png'}
                  height={256}
                  width={256}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              margin: '30px auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              width: '70%',
              marginBottom: 90,
            }}
          >
            <div
              className={`shadow ${innerWidth > 980 ? 'd-flex' : ''}`}
              style={{
                borderRadius: 30,
                width: `${innerWidth > 980 ? '700px' : '256px'}`,
              }}
            >
              <div
                style={{
                  width: `${innerWidth > 980 ? '500px' : '256px'}`,
                  height: 256,
                  fontSize: '2svh',
                  padding: '10px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Online safety concerns? Parents have full access to their
                child’s livestream tutoring and chats for improved safety
              </div>
              <div>
                <img
                  style={{ borderRadius: '0 30px 30px 0' }}
                  src={'https://gkc-images.s3.amazonaws.com/onlinesafety.png'}
                  height={256}
                  width={256}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'fixed',
              bottom: 0,
              width: '100vw',
              zIndex: 999,
            }}
          >
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default ParentLandingPage;
