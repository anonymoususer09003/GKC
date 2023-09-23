import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./../../../components";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>Sign In Page</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid">
        <Link
          href="/"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          style={{cursor:'pointer'}}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back to home</p>
        </Link>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div style={{ maxWidth: "380px", width: "100%" }}>
              <div className="d-flex justify-content-center mb-5">
                <Image
                  src="https://gkc-images.s3.amazonaws.com/logo.png"
                  alt="Vercel Logo"
                  className=""
                  width={240}
                  height={50}
                  unoptimized
                />
              </div>
              <div>
                <div className="d-flex justify-content-center my-4">
                  <h4 className="text-secondary fw-bold">Reset Password</h4>
                </div>
                <div>
                  <div className="d-flex my-2">
                    <p className="text-secondary fw-bold">john@doe.com</p>
                  </div>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="New Password"
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Confirm Password"
                  />

                  <button className="w-100 btn_primary text-light p-2 rounded fw-bold ">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 position-relative"
            style={{
              backgroundImage: 'url("/assets/auth_2.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div style={{ position: "absolute", right: "0%", bottom: "7%" }}>
              <Image
                src="https://gkc-images.s3.amazonaws.com/auth_girl_2.png"
                alt="Vercel Logo"
                className=""
                width={450}
                height={600}
                unoptimized
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
