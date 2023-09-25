import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { useRouter } from 'next/router';
import axios from 'axios';
import PaymentForm from '@/components/stripe/PaymentForm';
import GetUserDetail from '@/services/user/GetUserDetail';
import { base_url } from '../../../api/client';
import Link from 'next/link';
export default function StudentRegistrationCCInfo() {
  const navigation = useRouter();
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userInfo1, setUserInfo1] = useState(null)
  const [nameCard, setNameCard] = useState('');
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [cardFormValid, setCardFormValid] = useState(false);
  const [savePaymentFutureUse, setSavePaymentFutureUse] = useState(false)
  const [showNewDependentPopup, setShowNewDependentPopup] = useState(false)

  const onContinue = () => {
    console.log(userInfo);
  };

  const onRegister = async ({ getPayment }) => {
    console.log(userInfo);
    try {
      const response = await axios.post(`${base_url}/auth/register-parent`, {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        address1: userInfo.address1,
        address2: userInfo.address2,
        country: userInfo.country,
        state: userInfo.state,
        city: userInfo.city,
        zipCode: userInfo.zipCode,
        timeZoneId: userInfo.timeZoneId,
        savePaymentFutureUse: true,
      });

      const res = await axios.get(`${base_url}/user/logged-user-role`, {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
        },
      });

      window.localStorage.setItem(
        'gkcAuth',
        JSON.stringify({
          accessToken: response.data.accessToken,
          role: res.data,
        })
      );
      if (getPayment) {
        setConfirmPayment(!confirmPayment);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowNewDependentPopup(true) //popup for creating new student after parent completely registered
    }
  };

  useEffect(() => {
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
    var typ = JSON.parse(window.localStorage.getItem('userType'));
    setUserInfo(stored);
    setUserType(typ);

    (async () =>{
      const responce = await GetUserDetail();
      setUserInfo1(responce.data)
    })
  }, []);

  const handleValueReceived = (value) => {
    setNameCard(value.name);
    // Do something with the value in the parent component
  };
  const handlePaymentRequest = (status) => {
    // navigation.push('/parent');
  };
  return (
    <>
      <Head>
        <title> Auth | Parent Bank Info </title>{' '}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>{' '}
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
      {showNewDependentPopup ? (
        <div style={{position:'fixed', zIndex: 1, left:0,top:0, width:'100%', height:'100%',overflow:'auto', background: 'rgba(0, 0, 0, 0.4)'}}>
          <div style={{background: 'white', margin: '500px auto', padding:20, width:'500px'}}>
            <p style={{width: 335, margin: 'auto'}}>Great! Do you want to add a dependent?</p>
            <div
            style={{display: 'flex', justifyContent:'center', gap:40}}
            >
            <Link
              href="/auth/registeremail"
              onClick={()=>{window.localStorage.setItem("userType", 'student'); window.localStorage.setItem("DoesParentCreateNewStudent", 'true')}}
            >
            <button className="btn_primary text-light p-2 rounded fw-bold mt-3"
            onClick={()=>{typeof window !== 'undefined' ? window.localStorage.setItem('parentData', window.localStorage.getItem('registrationForm')) : null}} 
            style={{width: 50, position: 'relative', margin: '0 42%'}}
            >Yes</button>
            </Link>

            <Link
              href="/"
              onClick={()=>{
                window.localStorage.removeItem("DoesParentCreateNewStudent")
              }}
            >
            <button className=" p-2 rounded fw-bold mt-3" 
            style={{width: 50, position: 'relative', margin: '0 42%', border: 'none', background: 'white'}}
            >No</button>
            </Link>
            </div>
          </div>
        </div>
        ) : null}
        <Navbar isLogin={true} />{' '}
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative  d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          ></div>{' '}
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-100 w-md-75 p-5">
              <div>
                <PaymentForm
                  title={' Add credit card information'}
                  onValueReceived={handleValueReceived}
                  onPay={confirmPayment}
                  userInfo={userInfo1}
                  savePaymentFutureUse={savePaymentFutureUse}
                  oneTimePayment={false}
                  onPaymentRequest={handlePaymentRequest}
                  setCardFormValid={setCardFormValid}
                />{' '}
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    onClick={() => {setSavePaymentFutureUse(!savePaymentFutureUse); window.localStorage.setItem("stripeForm", 'true'); onRegister({ getPayment: true }); } }
                    className={`w-50 p-2 px-5 rounded fw-bold ${cardFormValid && nameCard.length > 0 ? ' text-light bg-gray-300 btn_primary' : 'tw-text-black'}`}
                    disabled={
                      cardFormValid && nameCard.length > 0 ? false : true
                    }
                  >
                    Continue{' '}
                  </button>{' '}
                </div>{' '}
                <div className="d-flex gap-2 justify-content-center  mt-3">
                  <button
                    className="w-50 btn_secondary text-light p-2 rounded fw-bold "
                    onClick={onRegister}
                  >I wil do this later{' '}
                  </button>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <Footer />
      </main>{' '}
    </>
  );
}
