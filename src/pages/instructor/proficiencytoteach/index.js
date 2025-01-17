import React, { useState } from "react";
import Head from "next/head";
import { Navbar, TutorNavbar, Footer } from "../../../components";
import { BsCheck2Circle } from "react-icons/bs";
import { withRole } from "../../../utils/withAuthorization";

//important imports for protections starts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//important imports for protections ends

function StudentRegistrationCourse() {

  return (
    <>
      <Head>
        <title> Proficiency Course </title>{" "}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>{" "}
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <TutorNavbar isLogin={true} />{" "}
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>{" "}
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-75 pt-5">
              <div>
                <h4 className="text-dark fw-bold">
                  Which courses do you teach ?
                </h4>
                <div className="py-4">
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option> Select </option> <option> Option 1 </option>{" "}
                    <option> Option 2 </option>{" "}
                  </select>
                  <div className="d-flex flex-wrap gap-2">
                    <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 1{" "}
                    </p>{" "}
                    <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 2{" "}
                    </p>{" "}
                    <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 3{" "}
                    </p>{" "}
                    <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 4{" "}
                    </p>{" "}
                  </div>{" "}
                </div>
                <h4 className="text-dark fw-bold pb-2"> Proficiency </h4>
                <div className="d-flex align-items-center gap-2 ">
                  <p> Course 1 </p>{" "}
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option> Select </option> <option> Beginner </option>{" "}
                    <option> Intermediate </option>{" "}
                    <option> Semi Expert </option>{" "}
                  </select>{" "}
                </div>{" "}
                <div className="d-flex align-items-center gap-2 ">
                  <p> Course 2 </p>{" "}
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option> Select </option> <option> Beginner </option>{" "}
                    <option> Intermediate </option>{" "}
                    <option> Semi Expert </option>{" "}
                  </select>{" "}
                </div>{" "}
                <div className="d-flex align-items-center gap-2">
                  <p> Course 3 </p>{" "}
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option> Select </option> <option> Beginner </option>{" "}
                    <option> Intermediate </option>{" "}
                    <option> Semi Expert </option>{" "}
                  </select>{" "}
                </div>{" "}
                <div className="d-flex align-items-center gap-2 py-2">
                  <p> Course 4 </p>{" "}
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option> Select </option> <option> Beginner </option>{" "}
                    <option> Intermediate </option>{" "}
                    <option> Semi Expert </option>{" "}
                  </select>{" "}
                </div>{" "}
                <div>
                  <h4 className="text-dark fw-bold">
                    Spoken Language Preference ?
                  </h4>
                  <div className="py-2">
                    <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                      <option> Select </option> <option> Option 1 </option>{" "}
                      <option> Option 2 </option>{" "}
                    </select>{" "}
                  </div>
                  <div className="d-flex gap-2 justify-content-between mt-3">
                    <button className="w-25 btn_primary text-light p-2 rounded fw-bold ">
                      Continue{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <Footer />
      </main>{" "}
    </>
  );
}

export default withRole(StudentRegistrationCourse, ["Instructor"]);
