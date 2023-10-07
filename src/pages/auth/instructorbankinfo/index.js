import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { TutorNavbar, Footer } from '../../../components';
import { useRouter } from 'next/router';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Link from 'next/link';
import axios from 'axios';
import { apiClient, base_url } from '../../../api/client';
import { useSelector } from 'react-redux';
export default function ParentRegistrationCCInfo() {
  const navigation = useRouter();
  const [showPayoneerInput, setShowPayoneerInput] = useState(false);
  const [showPayPalInput, setShowPayPalInput] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isImageFileEmpty, setIsImageFileEmpty] = useState(true);
  const [isVideoFileEmpty, setIsVideoFileEmpty] = useState(true);
  const [payPalEmail, setPayPalEmail] = useState('');
  const files = useSelector((state) => state.files);
  const imageFile = files.image;
  const videoFile = files.video;

  useEffect(() => {
    setIsImageFileEmpty(Object.keys(imageFile).length === 0);
    setIsVideoFileEmpty(Object.keys(videoFile).length === 0);
  }, []);

  const onContinue = async () => {
    try {
      const response = await apiClient.post(
        `/auth/complete-instructor-registration`,
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          instructorEmail: userInfo.email,
          phoneNumber: userInfo?.phoneNumber || '',
          address1: userInfo.address1,
          address2: userInfo.address2,
          country: userInfo.country,
          state: userInfo.state,
          city: userInfo.city,
          zipCode: userInfo.zipCode,

          instructorBio: userInfo.instructorBio,
          hourlyRate: userInfo.hourlyRate,
          deliveryModes: userInfo.deliveryModes,
          acceptInterviewRequest: userInfo.acceptInterviewRequest,
          gradesIdToTutor: userInfo.gradesIdToTutor,
          languagesIdPreference: userInfo.languagesIdPreference,
          courseToTeachAndProficiency: userInfo.courseToTeachAndProficiency,
        }
      );

      const res = await apiClient(`/user/logged-user-role`);

      if (payPalEmail !== '') {
        try {
          const addPayPalEmail = await apiClient.post(
            `/instructor/set-payPal-email-logged-instructor?payPalEmail=${payPalEmail}`
          );
          console.log(addPayPalEmail);
        } catch (error) {}
      }
      console.log(res.data);
      var stor = window.localStorage.getItem('gkcAuth');

      window.localStorage.setItem(
        'gkcAuth',
        JSON.stringify({
          accessToken: JSON.parse(stor).accessToken,
          role: res.data,
        })
      );
      setTimeout(() => {
        navigation.push('/instructor');
      }, 1400);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function run() {
      let stored = await JSON.parse(
        window.localStorage.getItem('registrationForm')
      );
      let typ = JSON.parse(window.localStorage.getItem('userType'));
      setUserInfo(stored);
      setUserType(typ);
    }
    run();
  }, []);

  return (
    <>
      <Head>
        <title>Auth | Instructor CC Info</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid">
        <Link
          href="/auth/proficiencytoteach"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          style={{ cursor: 'pointer' }}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </Link>
        <div style={{ height: '80vh' }}>
          <h4
            style={{ marginTop: '120px' }}
            className="text-dark fw-bold pb-2 text-center"
          >
            Tell us where to deposit your payments
          </h4>
          <div className="d-flex mt-5 justify-content-center align-items-center flex-column">
            {/* <div className="d-flex align-items-center gap-5 justify-content-center">
              <p style={{ width: '100px' }} className="fw-bold">
                Payoneer
              </p>
              <button
                onClick={() => setShowPayoneerInput(!showPayoneerInput)}
                style={{ backgroundColor: '#f48342' }}
                className="py-2 px-4 fw-bold text-white rounded"
              >
                Setup
              </button>
            </div> */}
            {showPayoneerInput && (
              <input
                placeholder="Enter Payoneer info"
                className="mt-3 fw-bold border-2 border-dark p-1"
              ></input>
            )}
            <div className="mt-5 d-flex gap-5 align-items-center justify-content-center">
              <p style={{ width: '100px' }} className="fw-bold">
                PayPal
              </p>
              <button
                onClick={() => setShowPayPalInput(!showPayPalInput)}
                style={{ backgroundColor: '#f48342' }}
                className="py-2 px-4 fw-bold text-white rounded"
              >
                Setup
              </button>
            </div>
            {showPayPalInput && (
              <input
                type="text"
                onChange={(e) => setPayPalEmail(e.target.value)}
                placeholder="Enter PayPal info"
                className="mt-3 fw-bold border-2 border-dark p-1"
              ></input>
            )}
            <div className="text-center">
              <button
                style={{
                  marginTop: '80px',
                  width: '500px',
                  backgroundColor: '#f48342',
                }}
                onClick={() => {
                  onContinue();
                }}
                className="text-light tw-mb-4 p-2 w-100 rounded fw-bold  bg-gray-300"
              >
                Continue
              </button>
              <Link
                className="text-decoration-none tw-mt-4 tw-text-gray-500 tw-text-lg"
                href="/instructor"
                onClick={onContinue}
              >
                I will do this later
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
