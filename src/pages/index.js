import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { Navbar, Footer, TutorCard } from './../components';

import axios from 'axios';
import styles from '@/styles/Home.module.css';
import { base_url } from '../api/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
export const GlobalInstructor = {
  instructors: [],
};

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

function StudentLandingPage() {
  //const authenticated = isAuthenticated();
  const [insructorsFound, setInsructorsFound] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [stars, setStars] = useState('');
  const [showCards, setShowCards] = useState(false);
  const [selectedCourse, setSelectCourse] = useState('');
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [mode, setMode] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [selectedZip, setSelectedZip] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const [courses, setCourses] = useState([]);
  const [lang, setLang] = useState([]);
  const [proficiency, setProficiency] = useState([]);
  const [insructors, setInsructors] = useState([]);
  const [page, setPage] = useState(0);
  const [innerWidth, setInnerWidth] = useState(null);
  const [goScheduleFromSignIn, setGoScheduleFromSignIn] = useState(false);
  const [pageState, setPageState] = useState(null);
  const nav = useRouter();
  const [goInterviewFromSignIn, setGoInterviewFromSignIn] = useState(false);
  const search = async () => {
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
    } else {
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
          }&grades=${ageGroup}&courses=${selectedCourse}&spokenLanguage=${selectedLang}&deliveryModes=${mode}&size=10`
        );
        setInsructors(insructors.concat(res.data.content));
        setPageState(res.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  };

  const handleButtonClick = () => {
    // Update the state immediately
    setPage(page + 1);
  };

  const getInstructors = async () => {
    try {
      var typ = JSON.parse(window.localStorage.getItem('gkcAuth'));
      const res = await axios.get(
        `${base_url}/public/landing/filter?page=0&size=10`,
        {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        }
      );
      setInsructors(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  function findNumbersUsingRegExp(inputString) {
    // Define a regular expression to match numbers
    const regex = /\d+/g;

    // Use the `match()` method to find all matches in the input string
    const numbersArray = inputString.match(regex);

    return numbersArray ? true : false;
  }

  const getCourses = async () => {
    try {
      const response = await axios.get(
        // `${base_url}/public/course/with-instructors`
        `${base_url}/public/course/get-all-courses`
      );
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
      const response = await axios.get(
        `${base_url}/public/course/get-all-proficiencies`
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
      const response = await axios.get(
        `${base_url}/public/language/with-instructors`
      );
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
  if (typeof window !== 'undefined') {
    useEffect(() => {
      console.log(window.innerWidth);
      setInnerWidth(window.innerWidth);
    }, [window.innerWidth]);
  }

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
        <meta name="keywords" content="geekkidscode, geek kids code, geek kids, geek, Online tutoring, Tutoring services, Virtual tutoring, Remote learning, Distance learning, E-learning, Academic support, Homework help, Online education, Private tutoring, Tutoring for 1st grade, Tutoring for 2nd grade, Tutoring for 3rd grade, Tutoring for 4th grade, Tutoring for 5th grade, Tutoring for 6th grade, Tutoring for 7th grade, Tutoring for 8th grade, Tutoring for 9th grade, Tutoring for 10th grade, Tutoring for 11th grade, Tutoring for 12th grade, Tutoring for first grade, Tutoring for second grade, Tutoring for third grade, Tutoring for fourth grade, Tutoring for fifth grade, Tutoring for sixth grade, Tutoring for seventh grade, Tutoring for eight grade, Tutoring for ninth grade, Tutoring for tenth grade, Tutoring for eleventh grade, Tutoring for twelfth grade, Online tutoring platform, Personalized tutoring, Professional tutoring, Experienced tutors, Certified tutors, Affordable tutoring, Interactive tutoring, tutoring, online codeing class, online coding tutoring, ASP.NET tutoring, C tutoring, C# tutoring, C++ tutoring, CSS tutoring, Dart tutoring, Flutter tutoring, Golang tutoring, HTML tutoring, Java tutoring, JavaScript tutoring, jQuery tutoring, Kotlin tutoring, MATLAB tutoring, MySQL tutoring, Next.JS tutoring, Node.JS tutoring, NoSQL tutoring, Objective-C tutoring, Perl tutoring, PHP tutoring, Python tutoring, R tutoring, React tutoring, React Native tutoring, Ruby tutoring, Rust tutoring, SAS tutoring, Scala tutoring, SQL tutoring, Swift tutoring, TypeScript tutoring, Visual Basic tutoring, Vue tutoring, Wordpress tutoring, Xamarin tutoring, XML tutoring, online coding class, online coding tutor, online ASP.NET tutoring for high school student, online C tutoring for high school student, online C# tutoring for high school student, online C++ tutoring for high school student, online CSS tutoring for high school student, online Dart tutoring for high school student, online flutter tutoring for high school student, online Golang tutoring for high school student, online HTML tutoring for high school student, online Java tutoring for high school student, online JavaScript tutoring for high school student, online jQuery tutoring for high school student, online Kotlin tutoring for high school student, online MATLAB tutoring for high school student, online MySQL tutoring for high school student, online Next.JS tutoring for high school student, online Node.JS tutoring for high school student, online NoSQL tutoring for high school student, online Objective-C tutoring for high school student, online Perl tutoring for high school student, online PHP tutoring for high school student, online Python tutoring for high school student, online R tutoring for high school student, online React tutoring for high school student, online React Native tutoring for high school student, online Ruby tutoring for high school student, online Rust tutoring for high school student, online SAS tutoring for high school student, online Scala tutoring for high school student, online SQL tutoring for high school student, online Swift tutoring for high school student, online TypeScript tutoring for high school student, online Visual Basic tutoring for high school student, online Vue tutoring for high school student, online Wordpress tutoring for high school student, online Xamarin tutoring for high school student, online XML tutoring for high school student, online computer coding class, online computer coding tutor, online ASP.NET tutoring for middle school student, online C tutoring for middle school student, online C# tutoring for middle school student, online C++ tutoring for middle school student, online CSS tutoring for middle school student, online Dart tutoring for middle school student, online flutter tutoring for middle school student, online Golang tutoring for middle school student, online HTML tutoring for middle school student, online Java tutoring for middle school student, online JavaScript tutoring for middle school student, online jQuery tutoring for middle school student, online Kotlin tutoring for middle school student, online MATLAB tutoring for middle school student, online MySQL tutoring for middle school student, online Next.JS tutoring for middle school student, online Node.JS tutoring for middle school student, online NoSQL tutoring for middle school student, online Objective-C tutoring for middle school student, online Perl tutoring for middle school student, online PHP tutoring for middle school student, online Python tutoring for middle school student, online R tutoring for middle school student, online React tutoring for middle school student, online React Native tutoring for middle school student, online Ruby tutoring for middle school student, online Rust tutoring for middle school student, online SAS tutoring for middle school student, online Scala tutoring for middle school student, online SQL tutoring for middle school student, online Swift tutoring for middle school student, online TypeScript tutoring for middle school student, online Visual Basic tutoring for middle school student, online Vue tutoring for middle school student, online Wordpress tutoring for middle school student, online Xamarin tutoring for middle school student, online XML tutoring for middle school student " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
                    )?.role?.toLowerCase()}/requestinterview/${JSON.parse(
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
      <Navbar />
      <main className="">
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Image
            style={{ cursor: 'pointer' }}
            onClick={() => window.open('https://ututorme.com/')}
            src={'/UTutorMe_Bannerr.png'}
            alt="Vercel Logo"
            className=""
            width={300}
            height={50}
            unoptimized
          />
        </div>

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
              className="p-2 rounded outline-0 border border_gray"
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
              <option value="1">Elementary &#40;&#60;=10yrs&#41;</option>
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
              placeholder="Enter City or Zip/Post code"
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
            {insructors.map((instructor, i) => {
              return (
                <TutorCard
                  key={i}
                  data={instructor}
                  //showModal={showModal}
                  //setShowModal={setShowModal}
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

export default StudentLandingPage;
