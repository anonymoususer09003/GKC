import React, { useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import { useRouter } from "next/router";
import PaymentForm from "@/components/stripe/PaymentForm";
export default function StudentRegistrationCCPay() {
  const navigation = useRouter();
  const onContinue = () => {
    navigation.push("/");
  };
  return (
    <>
      <Head>
        <title>Auth | CC Info</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Navbar isLogin={true} />
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
            <div className="w-100 p-5">
              <div>
                <h5 className="text-dark fw-bold">Payment Information</h5>

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
                <h5 className="text-dark fw-bold">
                  Who pays for this tutoring?
                </h5>

                <div className="py-2">
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>

                <h5 className="text-dark fw-bold">Use saved Credit Card?</h5>

                <div className="py-2">
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
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
                    className="w-50 btn_primary text-light p-2 rounded fw-bold "
                    onClick={onContinue}
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
