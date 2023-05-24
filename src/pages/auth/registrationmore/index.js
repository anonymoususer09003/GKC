import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer, TutorNavbar } from "../../../components";
import { BsCheck2Circle } from "react-icons/bs";
import {useRouter} from "next/router"
import { RiArrowGoBackLine } from "react-icons/ri";

export default function InstructorRegistrationMore() {
  const navigation = useRouter();

  return (
    <>
      <Head>
        <title>Instructor Registration More</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        {/* <TutorNavbar isLogin={true} /> */}
        <Link
          href="#"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </Link>
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-75 pt-5">
              <div>
                <div className=" mb-3">
                  <p className=" fw-bold text-center">Tell parents and students about yourself</p>
               
                </div>
                <textarea
                className="form-control mb-3"
                id="exampleFormControlTextarea1"
                rows="8"
                placeholder="About myself"
              ></textarea>


<p className=" fw-bold ">Upload a 30 seconds video recording of yourself (optional)</p>
               
<input
                    type="file"
                    className="w-100 p-1 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="First Name"
                  />
  <div className="d-flex gap-2 my-2 align-items-center">
                   <p className="fw-bold w-25 p-0 m-0">Hourly Rate:</p>
<div className="w-100 d-flex  align-items-center gap-4">
<input
                      type="text"
                      className="w-25 p-2 rounded outline-0 border border_gray text_gray text-center"
                      placeholder="00:00"
                    />
                    <p className="fw-bold p-0 m-0 ">USD/hr</p>
     
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 my-2 mt-4">
                  <p className="fw-bold w-100 p-0 m-0">Accept Interview Request</p>


                    <select className="w-100 p-2 rounded outline-0 border border_gray text_gray">
                      <option>Select</option>
                      <option>Student</option>
                      <option>Student</option>
                    </select>
                  </div>
                  <p className="fw-bold w-100 p-0 m-0">(Free 15 mins interview by parents and/or students)</p>
                  <div className="d-flex gap-2 my-4">
                  <p className="fw-bold w-100 p-0 m-0">Delivery Mode</p>


                <div className="fw-bold w-100 p-0 m-0">
                <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                     Online
                    </label>
                  </div>
                      <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      In-Persion
                    </label>
                  </div>
                  </div>
                  </div>

                <div>
                 

                  <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-2">
                    <button className="w-25 btn_primary text-light p-2 rounded fw-bold " onClick={()=> navigation.push("/auth/gradestoteach")}>
                      Continue
                    </button>
                    <Link
                      href="/"
                      className="text-decoration-none d-flex gap-2 "
                    >
                      <p className="text-secondary fw-bold">
                      I'll do this later.
                      </p>
                    </Link>
                  </div>
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
