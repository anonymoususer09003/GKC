import React, { useState } from "react";
import Head from "next/head";
import { ParentNavbar, Footer } from "../../../components";
import { useRouter } from "next/router";
import PaymentForm from "@/components/stripe/PaymentForm";
import { withRole } from './../../utils/withAuthorization';

function CCPayment() {
  const navigation = useRouter();

  return (
    <>
      <Head>
        <title>Parent CC Info</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid">
        <ParentNavbar isLogin={true} />
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-75 p-5">
              <div>
                <h5 className="text-dark fw-bold">Credit Card Information</h5>

                <div className="py-2">
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Hourly Rate:</p>
                    <p className="p-0 m-0 fw-bold">$30</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">No. of Hours:</p>
                    <p className="p-0 m-0 fw-bold">2</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Booking Fee:</p>
                    <p className="p-0 m-0 fw-bold">$3</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Total Due:</p>
                    <p className="p-0 m-0 fw-bold">$63</p>
                  </div>
                </div>

                <div className="py-5 d-flex align-items-center">
                  <h5 className="text-dark fw-bold m-0 p-0 flex-fill">
                    Use saved Credit Card?
                  </h5>

                  <select className="w-25 flex-fill p-2 rounded outline-0 border border_gray  ">
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
                <h5 className="text-dark fw-bold text-center">OR</h5>

                <PaymentForm title="Enter new credit card information" />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Save the payment information for future use
                  </label>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    className="w-25 btn_primary text-light p-2 rounded fw-bold "
                    onClick={() => navigation.push("/parent/messaging")}
                  >
                    Pay
                  </button>
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

export default withRole(CCPayment, ['Parent']);
