import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Footer } from '../../../components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { base_url } from '../../../api/client';

export default function SignIn() {
  const navigation = useRouter();
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isWrongEmail, setIsWrongEmail] = useState(false);

  // useEffect(() => {
  //   const onLogin = async () => {
  //     try {
  //       const response = await axios.post("https://staging-api.geekkidscode.com/auth/login", {
  //         email: "nitsapath@gmail.com",
  //         password: test123,
  //       });
  //       const accessToken = response.data.accessToken;
  //       console.log(accessToken);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   onLogin();
  // });

  const onLogin = async () => {
    try {
      const response = await axios.post(`${base_url}/auth/login`, {
        email: email,
        password: password,
      });
      const accessToken = response.data.accessToken;
      const res = await axios.get(`${base_url}/user/logged-user-role`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      window.localStorage.setItem(
        'gkcAuth',
        JSON.stringify({ accessToken, role: res.data })
      );

      window.localStorage.setItem('email', email);

      if (res.data === 'Student') {
        navigation.push('/');
      }

      if (res.data === 'Instructor') {
        navigation.push('/instructor');
      }

      if (res.data === 'Parent') {
        navigation.push('/parent');
      }
      if (res.data === 'Admin') {
        navigation.push('/internal');
      }
    } catch (error) {
      if (
        error.response.data.message ===
        'This user does not exist. Create an account to get started'
      ) {
        setIsWrongEmail(true);
        setIsWrongPassword(false);
      }
      if (error.response.data.message === 'The password is incorrect.') {
        setIsWrongPassword(true);
        setIsWrongEmail(false);
      }
    }
  };

  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      // 13 is the keycode for the Enter key
      onLogin();
    }
  }

  return (
    <>
      <Head>
        <title>Auth | Sign In</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Link
          href="/"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          style={{cursor:'pointer'}}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back to home</p>
        </Link>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-4 ">
            <div>
              {/* <h1 className="text-center mb-5">GSK</h1> */}
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
              <div className="w-100">
                <div className="d-flex justify-content-between mb-3">
                  <h4 className="text-secondary fw-bold">Sign In</h4>
                  <Link
                    href="/auth/forgotpassword"
                    className="text-decoration-none d-flex gap-2"
                  >
                    <p className="fw-bold text_secondary">Forgot Password?</p>
                  </Link>
                </div>
                <div className="w-100">
                  {/* <select onChange={(e)=> setUserType(e.target.value) } className="w-100 p-2 rounded outline-0 border border_gray text_gray mb-3 ">
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="instructor">Instructor</option>
                  </select> */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />

                    {isWrongEmail && (
                      <p className="text-center fw-bold tw-text-red-500">
                        Incorrect email Address
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      className="w-100 p-2 rounded outline-0 border border_gray mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />

                    {isWrongPassword && (
                      <p className="text-center w-100 fw-bold tw-text-red-500">
                        Incorrect password
                      </p>
                    )}
                  </div>
                  <button
                    className="w-100 btn_primary text-light p-2 rounded fw-bold mt-3"
                    onClick={onLogin}
                  >
                    Sign In
                  </button>
                </div>
                <Link
                  href="/auth/selection"
                  className="text-decoration-none d-flex gap-2 justify-content-center py-3"
                >
                  <p className="text-secondary fw-bold">Not yet Register?</p>
                  <p className="fw-bold text_secondary">Create account</p>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 position-relative d-none d-md-block"
            style={{
              backgroundImage: 'url("/assets/auth_2.png")',
              height: '90vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          >
            <div style={{ position: 'absolute', right: '0%', bottom: '7%' }}>
              <Image
                src="https://gkc-images.s3.amazonaws.com/auth_girl_1.png"
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
