import { useState } from "react";
import styles from "@/styles/Navbar.module.css";
import { TutorNavbar, Footer } from "../../../components";
import Head from "next/head";
import { withRole } from "../../../utils/withAuthorization";

//important imports for protections starts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//important imports for protections ends

function Report() {
    //protection starts
    const nav = useRouter()
    // checking if user logged in starts
      if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
        console.log('lol')
        useEffect(()=>{

          if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
            nav.push('/') 
          } else{
            if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Instructor') { //here we check if user has role Instructor
              nav.push('/')
            }
          }

        },[])
      }
    // checking if user logged in ends

    //protection ends
  const instructors = [
    "John Doe/ Ken Doe",
    "Jone Rich/ Ken Doe",
    "Katy Long/ Ken Doe",
  ];
  const [instructor, setInstructor] = useState("John Doe");
  return (
    <>
      <Head>
        <title> Reported Instructor </title>{" "}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>{" "}
      <TutorNavbar isLogin={true} />{" "}
      <main className="container-fluid">
        <div className={` container pt-5`} style={{ minHeight: "90vh" }}>
          <div className="row">
            <div className="col">
              <h5 className="py-3"> Your Instructors </h5>{" "}
              {instructors.map((e) => (
                <p role="button" onClick={() => setInstructor(e)}>
                  {" "}
                  {e}{" "}
                </p>
              ))}{" "}
            </div>{" "}
            <div className="col col-9">
              <h5 className="mb-5">
                Tell us your reason for reporting {`${instructor}`}{" "}
              </h5>{" "}
              <div className="form-check my-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option"
                />
                <label className="form-check-label" for="option">
                  Option 1...{" "}
                </label>{" "}
              </div>{" "}
              <div className="form-check my-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option2"
                />
                <label className="form-check-label" for="option2">
                  Option 2...{" "}
                </label>{" "}
              </div>{" "}
              <div className="form-check my-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option3"
                />
                <label className="form-check-label" for="option3">
                  Option 3...{" "}
                </label>{" "}
              </div>{" "}
              <div className="form-check my-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option4"
                />
                <label className="form-check-label" for="option4">
                  Option 4...{" "}
                </label>{" "}
              </div>{" "}
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
              ></textarea>{" "}
              <div className="mt-3 text-end">
                <button
                  className={`${styles.btn_primary} py-2 px-4 fw-bold text-white rounded text-end`}
                  type="submit"
                >
                  Submit{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
      <Footer />
    </>
  );
}

export default withRole(Report, ["Instructor"]);
