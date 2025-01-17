import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { useRouter } from 'next/router';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Link from 'next/link';
import axios from 'axios';
import { apiClient } from '@/api/client';
export default function RegistrationGrade() {
  const navigation = useRouter();
  const [grades, setGrades] = useState([]);
  const [grade1, setGrade1] = useState(null);
  const [grade2, setGrade2] = useState(null);
  const [grade3, setGrade3] = useState(null);
  const [grade4, setGrade4] = useState(null);

  const onContinue = () => {
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
    var userType = JSON.parse(window.localStorage.getItem("userType"));
    let gradess = [];
    // console.log([grade1, grade2, grade3, grade4]);
    [grade1, grade2, grade3, grade4].forEach((v) => {
      if (v !== null) {
        gradess.push(Number(v));
      }
    });
    let token = JSON.parse(window.localStorage.getItem("gkcAuth"));
    let url =
      userType == "instructor"
        ? "/auth/complete-instructor-registration"
        : "/auth/complete-student-registration";
    apiClient.patch(
      url,
      {
        [`${userType + "Email"}`]: stored.email,
        gradesIdToTutor: gradess,
      }
    );
    stored.gradesIdToTutor = gradess;
    window.localStorage.setItem('registrationForm', JSON.stringify(stored));
    navigation.push('/auth/proficiencytoteach');
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
        <div className="py-5 ">
          <h5 className="text-secondary fw-bold text-center py-4">
            Which grade/s do you wish to tutor?
          </h5>

          <div
            className=" d-flex flex-wrap justify-content-center m-auto gap-4 py-5"
            style={{ maxWidth: '700px' }}
          >
            <div
              style={{
                backgroundImage: 'url("/assets/5_plus.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '240px',
                height: '240px',
                position: 'relative',
                borderRadius: '10px',
              }}
              id="box1"
            >
              <input
                value="1"
                className="form-check-input position-absolute"
                style={{ top: '5px', right: '5px' }}
                type="checkbox"
                onChange={(e) => setGrade1(grade1 == 1 ? null : 1)}
              />
              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-75 fw-bold">
                <small className="text-dark">
                  Elementary &#40;&#60;=10yrs&#41;
                </small>
              </div>
            </div>
            <div
              style={{
                backgroundImage: 'url("/assets/10_plus.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '240px',
                height: '240px',
                position: 'relative',
                borderRadius: '10px',
              }}
            >
              <input
                value={2}
                className="form-check-input position-absolute"
                style={{ top: '5px', right: '5px' }}
                type="checkbox"
                // name="flexRadioDefault"
                // id="flexRadioDefault1"
                // checked={grade == 2}
                onChange={(e) => setGrade2(grade2 == 2 ? null : 2)}
              />

              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-75 fw-bold">
                <small className="text-dark">
                  Middle School &#40;11yrs - 13yrs&#41;
                </small>
              </div>
            </div>

            <div
              style={{
                backgroundImage: 'url("/assets/14_plus.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '240px',
                height: '240px',
                position: 'relative',
                borderRadius: '10px',
              }}
            >
              <input
                value="3"
                className="form-check-input position-absolute"
                style={{ top: '5px', right: '5px' }}
                type="checkbox"
                // name="flexRadioDefault"
                // id="flexRadioDefault1"
                // checked={grade == 3}
                onChange={(e) => setGrade3(grade3 == 3 ? null : 3)}
              />

              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-75 fw-bold">
                <small className="text-dark">
                  High School &#40;14yrs - 18yrs&#41;
                </small>
              </div>
            </div>

            <div
              style={{
                backgroundImage: 'url("/assets/18_plus.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '240px',
                height: '240px',
                position: 'relative',
                borderRadius: '10px',
              }}
            >
              <input
                value="4"
                className="form-check-input position-absolute"
                style={{ top: '5px', right: '5px' }}
                type="checkbox"
                // name="flexRadioDefault"
                // id="flexRadioDefault1"
                // checked={grade == 4}
                onChange={(e) => setGrade4(grade4 == 4 ? null : 4)}
              />

              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-75 fw-bold">
                <small className="text-dark">
                  College & Beyond &#40;&gt;18yrs&#41;
                </small>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-3">
            <button
              className={`text-light p-2 px-5 rounded fw-bold  bg-gray-300 ${
                !grade1 && !grade2 && !grade3 && !grade4
                  ? 'btn_disabled'
                  : 'btn_primary'
              }`}
              disabled={!grade1 && !grade2 && !grade3 && !grade4 ? true : false}
              onClick={onContinue}
            >
              Continue
            </button>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
