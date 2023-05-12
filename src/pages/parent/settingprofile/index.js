import React, { useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
export default function StudentRegistrationCCPay() {
  return (
    <>
      <Head>
        <title>Parent Setting Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div
          className="p-5 "
          style={{ minHeight: "90vh", maxWidth: "1700px", margin: "auto" }}
        >
          <div class="row">
            <div class="col-4">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  <h5 className="fw-bold py-3">John Doe</h5>

                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: "22px" }} />
                    parent@123.com
                  </p>

                  <p className="p-0 m-0 py-2 fw-bold">Address</p>
                  <div className="d-flex gap-1 align-items-center gap-2 pb-3 ">
                    <MdLocationOn className="h5 p-0 m-0" />
                    1234 Smith Street, Apt. 2 Hourston, Texas 774778, USA
                  </div>

                  <hr className="bg_secondary" />

                  <div></div>

                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button className="w-50 btn_primary text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2">
                      <FiEdit /> Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-8">
              <div className="shadow rounded-10 p-5 bg-white  my-4">
                <div className="row m-0 p-0 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Dependents:</h4>
                  </div>
                  <ul className="m-0 primary-list py-4">
                    <li className="fw-bold m-0 p-0 ps-4 py-2">Name One</li>
                    <li className="fw-bold m-0 p-0 ps-4 py-2">Name One</li>
                    <li className="fw-bold m-0 p-0 ps-4 py-2">Name One</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
