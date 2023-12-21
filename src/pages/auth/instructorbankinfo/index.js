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
  const [showACHBank, setAchBank] = useState(false);
  const [data, setData] = useState([
    {
      label: 'Name on Account',
      placeholder: 'Enter first name and last name',
      value: '',
      error: '',
    },
    {
      label: 'Routing Number',
      placeholder: 'Enter routing#',
      value: '',
      error: '',
    },
    {
      label: 'Confirm Routing Number',
      placeholder: 'Confirm routing#',
      value: '',
      error: '',
    },
    {
      label: 'Account Number',
      placeholder: 'Enter account#',
      value: '',
      error: '',
    },
    {
      label: 'Confirm Account Number',
      placeholder: 'Confirm account#',
      value: '',
      error: '',
    },
    {
      label: 'Bank Name',
      placeholder: 'Enter Bank Name',
      value: '',
      error: '',
    },
  ]);
  useEffect(() => {
    setIsImageFileEmpty(Object.keys(imageFile).length === 0);
    setIsVideoFileEmpty(Object.keys(videoFile).length === 0);
  }, []);

  const [onChanging, setOnChanging] = useState(false);
  const handleRouteChange = () => {
    setOnChanging(false);
  };
  const router = useRouter();
  // safePush is used to avoid route pushing errors when users click multiple times or when the network is slow:  "Error: Abort fetching component for route"
  const safePush = (path) => {
    if (onChanging) {
      return;
    }
    setOnChanging(true);
    router.push(path);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, setOnChanging]);

  const onContinue = async () => {
    try {
      let token = JSON.parse(window.localStorage.getItem('gkcAuth'));
      const response = await apiClient.patch(
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

      await apiClient.post(
        '/instructor/week-schedule',
        userInfo?.weeklySchedule
      );

      setTimeout(() => {
        safePush('/instructor');
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
  const handleTextChange = (value, item) => {
    let temp = [...data];
    let index = data.findIndex((el) => el.label === item.label);
    let tempValue = { ...temp[index] };
    console.log('value', value);
    if (
      tempValue.label === 'Confirm Routing Number' &&
      temp[index - 1].value != value
    ) {
      tempValue.error = 'routing number didnot matched';
    } else if (
      tempValue.label === 'Confirm Routing Number' &&
      temp[index - 1].value == value
    ) {
      tempValue.error = '';
    }
    console.log('logs', temp[index - 1]);
    if (
      tempValue.label === 'Confirm Account Number' &&
      temp[index - 1].value != value
    ) {
      console.log('if');
      tempValue.error = 'account number didnot matched';
    } else if (
      tempValue.label === 'Confirm Account Number' &&
      temp[index - 1].value == value
    ) {
      console.log('else');
      tempValue.error = '';
    }
    tempValue.value = value;
    temp[index] = tempValue;
    setData(temp);
  };
  const hasNonEmptyError = data.some((obj) => obj.error !== '');

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
        <div style={{ height: '80vh', overflowY: 'scroll' }}>
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
              <p style={{ padding: '0px', margin: '0px' }} className="fw-bold">
                ACH Bank Transfer
              </p>
              <button
                onClick={() => setAchBank(!showACHBank)}
                style={{ backgroundColor: '#f48342' }}
                className="py-2 px-4 fw-bold text-white rounded"
              >
                Setup
              </button>
            </div>
            {showACHBank && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {data.map((item, index) => {
                  return (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <label style={{ width: '200px' }}>{item.label}</label>

                        <input
                          onChange={(e) => {
                            handleTextChange(e.target.value, item);
                          }}
                          style={{
                            marginLeft: '10px',
                            width: '80%',
                            border: `2px solid ${item.error ? 'red' : 'black'}`,
                          }}
                          value={item.value}
                          placeholder={item.placeholder}
                          className="fw-bold p-1"
                        />
                      </div>
                      {item.error && (
                        <p style={{ textAlign: 'end', color: 'red' }}>
                          {item.error}
                        </p>
                      )}
                    </>
                  );
                })}
              </div>
            )}

            <div className="mt-5 d-flex gap-5 align-items-center justify-content-center">
              <p style={{ width: '140px' }} className="fw-bold">
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
                  backgroundColor:
                    showACHBank && hasNonEmptyError ? 'grey' : '#f48342',
                }}
                disabled={showACHBank && hasNonEmptyError ? true : false}
                onClick={() => {
                  onContinue();
                }}
                className="text-light tw-mb-4 p-2 w-100 rounded fw-bold  bg-gray-300"
              >
                Continue
              </button>
              <button
                className="text-decoration-none tw-mt-4 tw-text-gray-500 tw-text-lg"
                onClick={onContinue}
                style={{ border: 'none', background: 'none' }}
              >
                I will do this later
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
