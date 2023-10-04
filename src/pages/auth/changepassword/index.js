import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Footer, Navbar } from '../../../components';
import { ParentNavbar } from '../../../components/';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import onSignOut from '@/utils/signOut';
import GetUserDetail from '../../../services/user/GetUserDetail';
import GetAuthCode from '@/services/Auth/GetAuthCode';
import VerifyAuthCode from '@/services/Auth/VerifyAuthCode';
import ChangePassword from '@/services/user/ChangePassword';
import TutorNavbar from '@/components/admin/tutornavbar';

import axios from 'axios';
import { base_url } from '@/api/client';
export default function ForgotPassword() {
  const [data, setData] = useState({
    email: '',
    verifyCode: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  // const [userDetail, setUserDetail] = useState({});
  var user, userDetail;
  const [showSuccess, setSuccess] = useState(false);
  const [showActivation, setShowActivation] = useState(false);
  const [err, setErr] = useState('');
  const [userType, setUserType] = useState(false);
  const navigation = useRouter();
  const [userTyp, setUserTyp] = useState('');

  const fetchUser = async () => {
    try {
      user = await GetUserDetail();
      userDetail = user.data;
      // setUserDetail(user?.data?.userDetails);
    } catch (err) {
      console.log('err', err);
    }
  };

  const onContinue = async () => {
    if (data.newPassword === data.confirmPassword) {
      onSubmit();
    } else {
      setErr('New password and confirm new password mismatch');
      console.log('err', err);
    }
  };

  const onSubmit = async () => {
    try {
      const userDetail1 = await GetUserDetail();
      const response = await axios.post(`${base_url}/auth/login`, {
        email: userDetail1.data.email,
        password: data.oldPassword,
      });
      if (response.status === 200) {
        setShowActivation(true);
        GetAuthCode(userDetail1?.data.email);
      }
    } catch (err) {
      setErr('Incorrect old password');
      console.log('err', err);
    }
  };

  const changePassword = async () => {
    try {
      const userDetail1 = await GetUserDetail();
      let { verifyCode, confirmPassword, ...otherProps } = data;
      let responseChangePassword = await ChangePassword({
        ...otherProps,
        email: userDetail1.data.email,
      });

      setSuccess(true);
    } catch (err) {
      setErr('Incorrect Old Password');
      console.log('err', err);
    }
  };

  const verifyCode = async () => {
    console.log(data);
    try {
      const userDetail1 = await GetUserDetail();
      console.log(data);
      let code = data.verifyCode;
      setErr('');
      let res = await VerifyAuthCode({
        email: userDetail1.data.email,
        code: code,
      });
      if (res.status == 202) {
        changePassword();
      }
      console.log('res', res);
    } catch (err) {
      setErr('Incorrect verification code');
      console.log('err', err);
    }
  };
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErr('');
  };
  let isValid =
    data.newPassword != '' &&
    data.oldPassword != '' &&
    data.confirmPassword != ''
      ? true
      : false;

  useEffect(() => {
    fetchUser();
    setUserTyp(
      JSON.parse(window.localStorage.getItem('userType'))?.toLowerCase() ??
        JSON.parse(window.localStorage.getItem('gkcAuth'))?.role?.toLowerCase()
    );
  }, [user]);
  return (
    <>
      <Head>
        <title>Auth | Change Password</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userTyp == 'student' && <Navbar />}
      {userTyp == 'parent' && <ParentNavbar />}
      {userTyp == 'instructor' && <TutorNavbar isLogin={true} />}
      <TutorNavbar />
      <main className="container-fluid d-flex flex-column  min-vh-100">
        {/*             background-color: white;
            margin: 10% auto;
            padding: 20px;
            border: 1px solid #888888;
            width: 30%;
            font-weight: bolder; */}
        {showSuccess ? (
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
                width: '20%',
              }}
            >
              <p style={{ width: 300, margin: 'auto' }}>
                Great! Password updated successfully ✔️
              </p>
              <Link href="/auth/signin" onClick={onSignOut}>
                <button
                  className="btn_primary text-light p-2 rounded fw-bold mt-3"
                  style={{ width: 50, position: 'relative', margin: '0 42%' }}
                >
                  Ok
                </button>
              </Link>
            </div>
          </div>
        ) : null}
        <div>
          <div className="d-flex justify-content-center">
            <h1>Change Password</h1>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
              <div style={{ maxWidth: '380px', width: '100%' }}>
                <div
                  className={`d-flex flex-column justify-content-center pt-5`}
                >
                  <div className="">
                    <input
                      name="oldPassword"
                      value={data.oldPassword}
                      className="form-control my-3 1-100"
                      type="password"
                      placeholder="Old password"
                      onChange={onChange}
                    />
                    <input
                      name="newPassword"
                      value={data.newPassword}
                      className="form-control my-3 w-100"
                      type="password"
                      placeholder="New password"
                      onChange={onChange}
                    />
                    <input
                      name="confirmPassword"
                      value={data.confirmPassword}
                      className="form-control my-3 w-100"
                      type="password"
                      placeholder="Confirm new password"
                      onChange={onChange}
                    />
                    {showActivation ? (
                      <input
                        name="verifyCode"
                        onChange={onChange}
                        className="form-control my-3 w-100"
                        type="text"
                        placeholder="Verification code"
                      />
                    ) : null}

                    {err ? <p style={{ color: 'red' }}>{err}</p> : null}

                    <button
                      disabled={isValid ? false : true}
                      onClick={() =>
                        showActivation ? verifyCode() : onContinue()
                      }
                      className="w-100 btn_primary text-light p-2 rounded fw-bold mt-3"
                    >
                      Continue
                    </button>
                    <div>
                      {showSuccess ? (
                        <p className="mt-3 d-flex justify-content-center text-secondary">
                          Great! Password updated successfully ✔️
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100vw' }}>
          <Footer />
        </div>
      </main>
    </>
  );
}
