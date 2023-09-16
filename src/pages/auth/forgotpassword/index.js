import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../../components";
import { RiArrowGoBackLine } from "react-icons/ri";
import axios from "axios";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const navigation = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSent, setIsSent] = useState(false);
  const [err, setErr] = useState('')

  let isValid =
  password == '' && confirmPassword == ''
    ? true
    : false

  const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://staging-api.geekkidscode.com/auth/code?email=${email}`
      );
      console.log(response);
      setIsSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async () => {
    if(password === confirmPassword) {
      try {
        const response = await axios.post(
          `https://staging-api.geekkidscode.com/user/forgot-password`,
          {
            email: email,
            password: password,
            code: code,
          }
        );
        console.log(response);
  
        navigation.push("/auth/signin");
      } catch (error) {
        console.error(error);
        if(error.response.status === 400){
          console.log('lil')
          setErr('Verification code is not correct.')
        }
      }
    } else{
      setErr('Password and New password mismatch.')
    }
  };

  return (
    <>
      <Head>
        <title>Auth | Forgot Password</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Link
          href="/"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back to home</p>
        </Link>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div style={{ maxWidth: "380px", width: "100%" }}>
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
                <div className="d-flex justify-content-center my-4">
                  <h4 className="text-secondary fw-bold">Forgot Password</h4>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setErr('')}}
                  />
                  {isSent && (
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Enter Confirmation Code"
                      name="code"
                      value={code}
                      onChange={(e) =>{setCode(e.target.value); setErr('')}}
                    />
                  )}
                  {isSent && (
                    <>
                      <input
                        type="password"
                        name="password"
                        className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                        placeholder="Enter New Password"
                        onChange={(e) => {setPassword(e.target.value); setErr('')}}
                      />
                      <input
                      type="password"
                      name="password"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Confirm New Password"
                      onChange={(e) => {setConfirmPassword(e.target.value); setErr('')}}
                      />
                  </>

                  )}
                  {isSent && (
                    <p className="text-secondary fw-bold py-2 text-center">
                      Check Email for Confirmation Code
                    </p>
                  )}
                  {
                    err && (
                      <p 
                      className="text-secondary fw-bold py-2 text-center"
                      style={{color:'red'}}
                      >
                        {err}
                      </p>
                    )
                  }
                  {isSent ? (
                    <button
                      className={`w-100 text-light p-2 rounded fw-bold mt-3 bg-gray-300 ${
                        isValid ? "btn_disabled" : "btn_primary"
                      }`}
                      onClick={() => changePassword()}
                      disabled={isValid}
                    >Update Password
                    </button>
                  ) : (
                    <button
                      className={`w-100 text-light p-2 rounded fw-bold mt-3 bg-gray-300 ${
                        !isEmailValid ? "btn_disabled" : "btn_primary"
                      }`}
                      disabled={!isEmailValid}
                      onClick={() => handleSubmit()}
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 position-relative d-none d-md-block"
            style={{
              backgroundImage: 'url("/assets/auth_2.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div style={{ position: "absolute", right: "0%", bottom: "7%" }}>
              <img
                src="/assets/auth_boy_1.png"
                alt="Vercel Logo"
                className=""
                width={600}
                height={600}
                priority
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
