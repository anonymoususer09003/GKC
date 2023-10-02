import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Footer } from './../../../components';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import { apiClient } from '@/api/client';
export default function ActivateCode() {
  const navigation = useRouter();
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isResent, setIsResent] = useState(false);
  const [userType, setUserType] = useState('');

  const isValid = otp.length == 6;

  const onContinue = async () => {
    try {
      const code = otp;
      var stored = JSON.parse(window.localStorage.getItem('registrationForm'));

      const response = await apiClient.post(`/auth/code`, {
        email: stored.email,
        code: code,
      });

      setIsVerified(true);

      if (userType === 'parent') {
        navigation.push('/auth/registerparent');
      }
      if (userType === 'instructor') {
        navigation.push('/auth/registerinstructor');
      }
      if (userType === 'student') {
        navigation.push('/auth/registerstudent');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onResendCode = async () => {
    try {
      const response = await apiClient.get(`/auth/code?email=${stored.email}`);
      console.log(response);
      setIsResent(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const value = window.localStorage.getItem('userType').includes(`"`)
      ? JSON.parse(window.localStorage.getItem('userType'))
      : window.localStorage.getItem('userType');
    setUserType(value);
  }, []);

  return (
    <>
      <Head>
        <title>Auth | Activate Code</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid  d-flex flex-column justify-content-between  min-vh-100">
        <Link
          href="/auth/registeremail"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          style={{ cursor: 'pointer' }}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </Link>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div style={{ maxWidth: '400px', width: '100%' }}>
              <div className="d-flex justify-content-center mb-5">
                <Image
                  src="https://gkc-images.s3.amazonaws.com/logo.png"
                  alt="Vercel Logo"
                  className=""
                  width={240}
                  height={50}
                  unoptimized
                />
              </div>
              <div>
                <div className="d-flex justify-content-center mb-3">
                  <h5 className="text-secondary fw-bold text-center">
                    Check your email for activation code and enter it below
                  </h5>
                </div>

                <div className="d-flex gap-2">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className="p-1"> </span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="w-full p-2 h3 rounded outline-0 border border_gray  mb-3 text-center"
                        style={{ width: '60px' }}
                      />
                    )}
                  />
                </div>
                <button
                  className={`w-100 text-light p-2 rounded fw-bold mt-3 bg-gray-300 ${
                    !isValid ? 'btn_disabled' : 'btn_primary'
                  }`}
                  disabled={!isValid}
                  onClick={onContinue}
                >
                  Continue
                </button>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <hr className="w-25" />

                  <button
                    className="text-secondary fw-bold m-0 p-0 pb-2 border-0 bg-transparent"
                    onClick={() => onResendCode()}
                  >
                    Resend Activation Code
                  </button>
                  {isResent && (
                    <p className="fw-bold text_secondary m-0 pb-3">
                      Activation code has been resent
                    </p>
                  )}

                  <button
                    className="w-50 btn_secondary text-light p-2 rounded fw-bold "
                    onClick={() => navigation.push('/auth/signin')}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 position-relative d-none d-md-block"
            style={{
              backgroundImage: 'url("/assets/auth_2.png")',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          >
            <div style={{ position: 'absolute', right: '0%', bottom: '7%' }}>
              <Image
                src="/assets/auth_girl_1.png"
                alt="Vercel Logo"
                className=""
                width={400}
                height={600}
                unoptimized
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
