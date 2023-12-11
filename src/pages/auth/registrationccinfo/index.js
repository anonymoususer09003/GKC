import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { useRouter } from 'next/router';
import axios from 'axios';
import PaymentForm from '@/components/stripe/PaymentForm';
import { apiClient, base_url } from '../../../api/client';
import Link from 'next/link';
export default function StudentRegistrationCCInfo() {
  const navigation = useRouter();
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState('');
  const [nameCard, setNameCard] = useState('');
  const [cardFormValid, setCardFormValid] = useState(false);
  const [emailParents, setEmailParents] = useState([]);
  const [showNewDependentPopup, setShowNewDependentPopup] = useState(false);
  const [savePaymentFutureUse, setSavePaymentFutureUse] = useState(false);
  console.log('userinfo', userInfo);
  const onRegister = async ({ getPayment }) => {
    var storreed = JSON.parse(window.localStorage.getItem('registrationForm'));
    // setSavePaymentFutureUse(!savePaymentFutureUse)
    try {
      const response = await apiClient.patch(
        `/auth/complete-student-registration`,
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          studentEmail: userInfo.email || storreed.email,
          password: userInfo.password,
          address1: userInfo.address1,
          address2: userInfo.address2,
          country: userInfo.country,
          state: userInfo.state,
          city: userInfo.city,
          zipCode: userInfo.zipCode,
          savePaymentFutureUse: false,
          emailParent1: userInfo.emailParent1,
          emailParent2: userInfo.emailParent2,
          whoPaysEmail:
            emailParents[parents.indexOf(selectedParent)] ||
            userInfo.emailParent ||
            userInfo.email,
          gradeId: userInfo.gradeId,
          courseOfInterestAndProficiency:
            userInfo.courseOfInterestAndProficiency,
          languagePreferencesId: userInfo.languagePreferencesId,
          phoneNumber: userInfo?.phoneNumber,
          // timeZoneId: userInfo.timeZoneId,
        }
      );
      console.log(response);
      if (
        window.localStorage.getItem('DoesParentCreateNewStudent') !== 'true'
      ) {
        const res = await axios.get(`${base_url}/user/logged-user-role`, {
          headers: {
            Authorization: `Bearer ${
              response.data.accessToken ??
              JSON.parse(window.localStorage.getItem('gkcAuth')).accessToken
            }`,
          },
        });
        if (res && response) {
          window.localStorage.setItem(
            'gkcAuth',
            JSON.stringify({
              accessToken: JSON.parse(window.localStorage.getItem('gkcAuth'))
                .accessToken,
              role: res.data,
            })
          );
        }
        navigation.push('/');
        if ((getPayment && selectedParent == '') || cardFormValid) {
          setConfirmPayment(true);
          // navigation.push('/');
        } else {
          // navigation.push('/');
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (
        window.localStorage.getItem('DoesParentCreateNewStudent') === 'true'
      ) {
        setShowNewDependentPopup(true); //popup for creating new student after parent completely registered
      }
    }
  };
  const handleValueReceived = (value) => {
    setNameCard(value.name);
    // Do something with the value in the parent component
  };
  useEffect(() => {
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
    console.log('storeed', stored);
    var typ = window.localStorage.getItem('userType');
    setUserInfo(stored);
    setUserType(typ);

    const arr = [];
    [stored?.emailParent1, stored?.emailParent2].map((v) => {
      if (v) {
        arr.push(v);
      }
    });

    const uniqueSet = new Set(arr);
    const uniqueArray = Array.from(uniqueSet);
    setEmailParents(uniqueArray);

    // uniqueArray.map((i)=>{
    //   setParents([...parents, userDetailByEmail(i)])
    // })
    userDetailByEmail(uniqueArray);
    // console.log(uniqueArray)
    // let parentName1, parentName2;
    // if(uniqueArray[0] !== undefined){
    //   parentName1 = userDetailByEmail(uniqueArray[0])
    // }
    // if(uniqueArray[1] !== undefined){
    //   parentName2 = userDetailByEmail(uniqueArray[1])
    // }
    // const parentNames = [parentName1, parentName2]
    // console.log(parentNames)
    // setParents(parentNames)
    // console.log(parents)
    // console.log(parentNames)
    // userDetailByEmail(uniqueArray)
    // if(uniqueArray.length = 1){
    //   userDetailByEmail(uniqueArray[0]).then((value) =>{
    //     parentNamnes[0] = value.data.fullName
    //   })
    // } else {
    //   userDetailByEmail(uniqueArray[0]).then((value) =>{
    //     parentNamnes[0] = value.data.fullName
    //   })
    //   userDetailByEmail(uniqueArray[1]).then((value) =>{
    //     parentNamnes[1] = value.data.fullName
    //   })
    // }
  }, []);

  const userDetailByEmail = (element) => {
    console.log(element);

    element.map(async (i) => {
      const responce = await axios.get(
        `${base_url}/user/details/?userEmail=${i}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${
              JSON.parse(window.localStorage.getItem('gkcAuth')).accessToken
            }`,
            'Content-Type': 'Access-Control-Allow-Origin',
          },
        }
      );
      console.log(responce.data);
      setParents([...parents, responce.data.fullName]);
    });

    console.log(parents);
  };
  const handlePaymentRequest = (status) => {
    window.localStorage.removeItem('registrationForm');
    window.localStorage.removeItem('userType');
    navigation.push('/');
  };
  return (
    <>
      <Head>
        <title> Auth | CC Info </title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        {showNewDependentPopup ? (
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
                width: '500px',
              }}
            >
              <p style={{ width: 335, margin: 'auto' }}>
                Great! Do you want to add a dependent?
              </p>
              <div
                style={{ display: 'flex', justifyContent: 'center', gap: 40 }}
              >
                <Link
                  href="/auth/registeremail"
                  onClick={() => {
                    window.localStorage.setItem('userType', 'student');
                    window.localStorage.setItem(
                      'DoesParentCreateNewStudent',
                      'true'
                    );
                  }}
                >
                  <button
                    className="btn_primary text-light p-2 rounded fw-bold mt-3"
                    style={{ width: 50, position: 'relative', margin: '0 42%' }}
                  >
                    Yes
                  </button>
                </Link>

                <Link
                  href="/"
                  onClick={() => {
                    window.localStorage.removeItem(
                      'DoesParentCreateNewStudent'
                    );
                    window.localStorage.setItem('userType', 'parent');
                  }}
                >
                  <button
                    className=" p-2 rounded fw-bold mt-3"
                    style={{
                      width: 50,
                      position: 'relative',
                      margin: '0 42%',
                      border: 'none',
                      background: 'white',
                    }}
                  >
                    No
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
        <Navbar isLogin={true} />
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative  d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-100 w-md-75 p-5">
              <div>
                <h4 className="text-dark fw-bold"> Who pays for tutoring ? </h4>

                <div className="py-4">
                  <select
                    className="w-25 p-2 rounded outline-0 border border_gray  mb-3 "
                    onChange={(e) =>
                      setSelectedParent(
                        e.target.value == 'Select' ? '' : e.target.value
                      )
                    }
                    value={selectedParent}
                  >
                    <option> Select </option>
                    {parents &&
                      parents?.map((v) => {
                        return <option> {v}</option>;
                      })}
                  </select>
                  <h4 className="text-dark fw-bold p-0 m-0 text-center">
                    {' '}
                    OR{' '}
                  </h4>
                </div>
                <PaymentForm
                  onValueReceived={handleValueReceived}
                  title={'Add credit card information'}
                  onPay={confirmPayment}
                  userInfo={userInfo}
                  onPaymentRequest={handlePaymentRequest}
                  setCardFormValid={setCardFormValid}
                  savePaymentFutureUse={savePaymentFutureUse}
                  oneTimePayment={false}
                  disabled={selectedParent != '' ? true : false}
                />
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    className={`${
                      selectedParent || (cardFormValid && nameCard.length > 0)
                        ? 'btn_primary text-light'
                        : 'bg-gray-600'
                    } w-50 p-2 rounded fw-bold`}
                    onClick={() => onRegister({ getPayment: true })}
                    disabled={
                      selectedParent || (cardFormValid && nameCard.length > 0)
                        ? false
                        : true
                    }
                  >
                    Continue
                  </button>
                </div>
                <div className="d-flex gap-2 justify-content-center  mt-3">
                  <button
                    className="w-50 btn_secondary text-light p-2 rounded fw-bold"
                    onClick={onRegister}
                  >
                    I will do this later
                  </button>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
