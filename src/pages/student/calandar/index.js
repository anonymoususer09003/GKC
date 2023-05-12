import React, { useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function StudentRegistrationCCPay() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Head>
        <title>Student Calandar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div
          className="d-flex justify-content-between gap-5  p-5 "
          style={{ height: "90vh" }}
        >
          <div className="w-50 pt-5">
            <Calendar onChange={onChange} value={value} />
          </div>
          <div className="w-50">
            <h3 className="text-center">Schedule</h3>
            <div
              className=" shadow p-5 bg-white rounded "
              style={{ minHeight: "400px" }}
            >
              <div className="d-flex align-items-center py-3">
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">
                  John Doe
                </h5>
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">11:00AM</h5>
                <BsFillChatFill className="p-0 m-0 flex-fill h2 flex-fill" />

                <GoDeviceCameraVideo
                  className="p-0 m-0 flex-fill h2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                />

                <RiDeleteBin6Line className="p-0 m-0 h2 flex-fill" />
              </div>
              <div className="d-flex align-items-center py-3">
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">
                  John Doe
                </h5>
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">11:00AM</h5>
                <BsFillChatFill className="p-0 m-0 flex-fill h2 flex-fill" />

                <GoDeviceCameraVideo
                  className="p-0 m-0 flex-fill h2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                />

                <RiDeleteBin6Line className="p-0 m-0 h2 flex-fill" />
              </div>
              <div className="d-flex align-items-center py-3">
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">
                  John Doe
                </h5>
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">11:00AM</h5>
                <BsFillChatFill className="p-0 m-0 flex-fill h2 flex-fill" />

                <GoDeviceCameraVideo
                  className="p-0 m-0 flex-fill h2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                />

                <RiDeleteBin6Line className="p-0 m-0 h2 flex-fill" />
              </div>
              <div className="d-flex align-items-center py-3">
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">
                  John Doe
                </h5>
                <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">11:00AM</h5>
                <BsFillChatFill className="p-0 m-0 flex-fill h2 flex-fill" />

                <GoDeviceCameraVideo
                  className="p-0 m-0 flex-fill h2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                />

                <RiDeleteBin6Line className="p-0 m-0 h2 flex-fill" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
        {/* Chat View Modal */}
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            aria-labelledby="exampleModal2Label"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-2">
                <div className="d-flex justify-content-between">
                  <h5 className="modal-title" id="exampleModal2Label"></h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className=" p-3" style={{ minHeight: "400px" }}>
                    <div className="py-1 text-end">
                      <p className="p-0 m-0 fw-bold">
                        lorem ipsum dolor sit amet, consectetur adipis.
                      </p>
                      <small className="p-0 m-0">John Doe 4/11/23 8:15am</small>
                    </div>

                    <div className="py-1">
                      <p className="p-0 m-0 fw-bold">
                        lorem ipsum dolor sit amet, consectetur adipis.
                      </p>
                      <small className="p-0 m-0">John Doe 4/11/23 8:15am</small>
                    </div>
                  </div>

                  <div className=" d-flex align-items-center px-2 gap-2">
                    <input
                      type="text"
                      placeholde=""
                      className="border  p-2 rounded flex-fill"
                    />{" "}
                    <BsFillSendFill className="h3 p-0 m-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
