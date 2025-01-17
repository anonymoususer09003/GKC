import React, { useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import StripeForm from "../../../components/stripe/PaymentForm/index";
import { useRouter } from "next/router";

export default function ParentRegistrationCCInfo() {
  const navigation = useRouter();

  return (
    <>
      <Head>
        <title>Parent CC Info</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid">
        <Navbar isLogin={true} />
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
                {/* <h4 className="text-dark fw-bold">Who pays for tutoring?</h4>
                <div className="py-4">
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <h4 className="text-dark fw-bold p-0 m-0 text-center">OR</h4>
                </div> */}

                <StripeForm title="Add credit card information" />

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
                    onClick={() => navigation.push("/parent")}
                  >
                    Continue
                  </button>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button className="w-25 btn_secondary text-light p-2 rounded fw-bold ">
                    I wil do this later
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
