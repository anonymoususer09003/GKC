import React, { useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "./../../../components";
import { BsCheck2Circle } from "react-icons/bs";
import { MdEmail, MdDelete } from "react-icons/md";
export default function StudentRegistrationCCPay() {
  return (
    <>
      <Head>
        <title>Profile Edit Page</title>
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
                  {/* <h5 className="fw-bold py-3">John Doe</h5> */}

                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: "22px" }} />
                    parent@123.com
                  </p>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                      placeholder="First Name"
                    />

                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                      placeholder="Last Name"
                    />
                  </div>

                  <p className="p-0 m-0 py-2 fw-bold">Address 1</p>

                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="1234, Smith Street"
                  />
                  <p className="p-0 m-0 py-2 fw-bold">Address 2</p>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="Apt. 2"
                  />

                  <div className="d-flex align-items-center gap-3 py-2">
                    <select className="w-25 flex-fill p-2 rounded outline-0 border border_gray text_gray">
                      <option>USA</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>

                    <select className="w-25 flex-fill p-2 rounded outline-0 border border_gray text_gray">
                      <option>Texas</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <select className="w-25 flex-fill p-2 rounded outline-0 border border_gray text_gray">
                      <option>Houston</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>

                    <input
                      type="text"
                      className="w-25 flex-fill p-2 rounded outline-0 border border_gray text_gray"
                      placeholder="77478"
                    />
                  </div>

                  <hr className="bg_secondary" />

                  <div></div>

                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button className="px-4 btn btn-success text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2">
                      <BsCheck2Circle className="h3 m-0 p-0" /> Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-8">
              <div className="shadow rounded-10 p-5 bg-white">
                <div className="col px-4 border_primary">
                  <h4 className="fw-bold">Dependents:</h4>
                  <div class="p-4 w-50">
                    <div class="d-flex justify-content-between gap-4 my-2">
                      <p className="p-0 m-0">Name One</p>
                      <MdDelete style={{ fontSize: "24px" }} />
                    </div>
                    <div class="d-flex justify-content-between gap-4 my-2">
                      <p className="p-0 m-0">Name Two</p>
                      <MdDelete style={{ fontSize: "24px" }} />
                    </div>

                    <div class="d-flex justify-content-between gap-4 my-2">
                      <p className="p-0 m-0">Name Three</p>
                      <MdDelete style={{ fontSize: "24px" }} />
                    </div>

                    <div class="d-flex justify-content-between gap-4 my-2">
                      <p className="p-0 m-0">Name Four</p>
                      <MdDelete style={{ fontSize: "24px" }} />
                    </div>
                  </div>
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
