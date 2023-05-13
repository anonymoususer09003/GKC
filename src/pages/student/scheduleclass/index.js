import React, { useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { BsFillSendFill } from "react-icons/bs";

export default function StudentRegistrationCCPay() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Head>
        <title>Student Schedule Class</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Navbar isLogin={true} />
      <main className="container-fluid">
      <div
          className="row"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12 col-lg-6 pt-5">
          <p className="fw-bold text-center">Schedule class with John Doe</p>
            <Calendar onChange={onChange} value={value} />
          </div>
          <div className="col-12 col-lg-6 pt-5">

          <p className="fw-bold text-center text-white">I</p>
            <div className="shadow rounded py-5">
              <div
                className="d-flex flex-sm-nowrap flex-wrap justify-content-between gap-4 px-5"
                style={{ minHeight: "400px" }}
              >
                <div className="w-100 ">
                  <p className="p-0 m-0 fw-bold pb-2">Select time</p>
                  <div className="border rounded">
                    <p className="p-0 m-0 py-1 fw-bold bg-light p-2  px-3">
                      7:00 am
                    </p>
                    <p className="p-0 m-0 py-1 fw-bold bg-light p-2  px-3">
                      8:00 am
                    </p>
                    <p className="p-0 m-0 py-1 fw-bold p-2  px-3">9:00 am</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p className="p-0 m-0 py-1 fw-bold p-2  px-3">4:00 pm</p>
                    <p className="p-0 m-0 py-1 fw-bold p-2  px-3">5:00 pm</p>
                  </div>
                </div>
                <div className=" w-100">
                  <p className="p-0 m-0 fw-bold text-center py-2">
                    Your information
                  </p>
                  <h6 className="text-dark fw-bold">
                    You selected 2 hours slot
                  </h6>

                  <div className="py-1">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        One-Time
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Weekly Recurrence
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Bi-Weekly
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Monthly
                      </label>
                    </div>
                  </div>

                  <div className="py-2 d-flex align-items-center gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Course:</h6>

                    <select className="w-25 p-2 rounded outline-0 border border_gray text_gray  ">
                      <option>Select</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>

                  <div className="py-2 d-flex align-items-center gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Mode:</h6>

                    <select className="w-25 p-2 rounded outline-0 border border_gray text_gray  ">
                      <option>Select</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>

                  <div className="py-2 d-flex align-items-center gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Skills:</h6>

                    <h6 className="text-dark fw-bold m-0 p-0">Intermediate</h6>
                  </div>

                  <div className="py-2 d-flex align-items-start gap-4">
                    <h6 className="text-dark fw-bold m-0 p-0">Grade:</h6>
                    <div>
                      <h6 className="text-dark fw-bold m-0 p-0">
                        Middle School
                      </h6>
                      <h6 className="text-dark fw-bold m-0 p-0">
                        &#40;12yrs - 14yrs&#41;
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center pt-5">
                <button className="w-25 btn_primary text-light p-2 rounded fw-bold ">
                  Schedule
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
