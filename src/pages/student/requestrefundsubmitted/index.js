import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "../../../components";
import { FiRefreshCw } from "react-icons/fi";
import { TbSpeakerphone } from "react-icons/tb";
import {useRouter} from "next/router"
import { withRole } from '../../../utils/withAuthorization';

function RequestRefundSubmited() {

  const navigation = useRouter();
  const onRequestRefundSubmit = () => {
      navigation.push("/")
  };
  return (
    <>
      <Head>
        <title>Student Financial Report</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div className="container">
          <div className="pt-5" style={{ minHeight: "100vh" }}>
            <h5 className="text-dark fw-bold text-center">Request Refund</h5>

            <div className="row py-3">
              <div className="col-12 col-md-2">
                <p className="fw-bold p-0 m-0">Reason</p>
                <p className="fw-bold p-0 m-0">01/16/2023</p>
              </div>

              <div className="col-12 col-md-10">
                <div className="d-flex justify-content-between">
                  <p className="fw-bold p-0 m-0">Tutor was a no-show</p>
                  <div className="d-flex gap-4">
                    <p className="fw-bold p-0 m-0">Status:</p>
                    <p className="fw-bold p-0 m-0">Closed</p>
                  </div>
                </div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>

            <div className="row py-3">
              <div className="col-12 col-md-2">
                <p className="fw-bold p-0 m-0">Tutor's response</p>
                <p className="fw-bold p-0 m-0">01/18/2023</p>
              </div>

              <div className="col-12 col-md-10">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>

            <div className="row py-5">
              <div className="col-12 col-md-2">
                <p className="fw-bold p-0 m-0">GKC</p>
                <p className="fw-bold p-0 m-0">01/16/2023</p>
              </div>

              <div className="col-12 col-md-10">
                <div className="d-flex justify-content-between">
                  <p className="fw-bold p-0 m-0">
                    Refund has been issued. Case is closed
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-end mt-3">
              <button className="w-25 btn_primary text-light p-2 rounded fw-bold " onClick={()=> onRequestRefundSubmit()}>
                Exit
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(RequestRefundSubmited, ['Student']);
