import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "../../../components";
import { FiRefreshCw } from "react-icons/fi";
import { TbSpeakerphone } from "react-icons/tb";
import {useRouter} from "next/router"
import { withRole } from '../../../utils/withAuthorization';

function StudentRequestRefund() {
  //protection starts
  const nav = useRouter()
  // checking if user logged in starts
  if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
    console.log('lol')
    useEffect(()=>{

      if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
        nav.push('/') 
      } else{
        if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Student') { //here we check if user has role Student
          nav.push('/')
        }
      }

    },[])
  }
  // checking if user logged in ends

  //protection ends
  const navigation = useRouter();
  const onRequestRefund = () => {
      navigation.push("/student/requestrefundsubmitted")
  };
  return (
    <>
      <Head>
        <title>Financial Report</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div className="container">
          <div className="pt-5" style={{ minHeight: "100vh" }}>
            <h5 className="text-dark fw-bold text-center">Request Refund</h5>

            <h5 className="text-dark fw-bold text-center">
              Tell us the reason for requesting refund fron John Doe
            </h5>
            <div className="w-75 m-auto my-4">
              <div className="d-flex justify-content-center flex-column align-items-center my-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Option 1
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Option 3
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Option 3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Option 4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Option 5
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Option 6
                  </label>
                </div>
              </div>

              <div className="form-floating py-2">
                <textarea
                  id="floatingTextarea2"
                  className="p-2 rounded"
                  style={{ height: "300px", width: "100%" }}
                ></textarea>
              </div>

              <div className="d-flex gap-2 justify-content-end mt-3">
                <button className="w-25 btn_primary text-light p-2 rounded fw-bold " onClick={()=>onRequestRefund()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(StudentRequestRefund, ['Student']);
