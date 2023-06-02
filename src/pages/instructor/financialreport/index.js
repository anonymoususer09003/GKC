import React, { useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { TutorNavbar, Footer } from "../../../components";
import { FiRefreshCw } from "react-icons/fi";
import { TbSpeakerphone } from "react-icons/tb";
import {useRouter} from "next/router"
export default function InstructorFinancialReport() {
  const navigation = useRouter()
  const onContinue = () => {
    navigation.push('/instructor/requestrefund')
  }
  return (
    <>
      <Head>
        <title> Instructor Financial Report </title>{" "}
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <TutorNavbar isLogin={true} />{" "}
      <main className="container-fluid">
        <div className="container">
          <div className=" " style={{ minHeight: "100vh" }}>
          <br />
          <br />
          <br />
          <br />
            <h5 className="text-dark fw-bold text-center">Report </h5>{" "}
            <div
              className="border rounded p-4 my-4"
              style={{ minHeight: "400px" }}
            >
<div className="w-50 m-auto pb-4">
<div className="row">
            <div className="col-12 col-md-6">
            <div className=" d-flex align-items-center gap-3">
                  <p className="fw-bold m-0 p-0"> From </p>{" "}
                  <input id="startDate" className="form-control" type="date" />
                </div>
</div>
 <div className="col-12 col-md-6">
 <div className=" d-flex align-items-center gap-3">
                  <p className="fw-bold m-0 p-0"> To </p>
                  <input id="startDate" className="form-control" type="date" />
                  <FiRefreshCw style={{ fontSize: "35px" }} />{" "}
                </div>
</div>
</div>
</div>

         <div style={{minWidth:"400px", overflowY:'auto'}}>

              <table className="table ">
                <thead>
                  <tr className="bg-light">
                    <th scope="col" style={{minWidth:"150px"}}> Date </th> <th scope="col" style={{minWidth:"150px"}}> Tutor </th>{" "}
                    <th scope="col" style={{minWidth:"150px"}}> Course </th>{" "}
                    <th scope="col" style={{minWidth:"150px"}}> Hours Scheduled </th>{" "}
                    <th scope="col" style={{minWidth:"150px"}}> Course Cost </th>{" "}
                    <th scope="col" style={{minWidth:"150px"}}> Booking Fee </th>{" "}
                    <th scope="col" style={{minWidth:"150px"}}> Total Payment </th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody>
                  <tr>
                    <th className="fw-bold" scope="row">
                      {" "}
                      05 / 21 / 2023{" "}
                    </th>{" "}
                    <td className="fw-bold w-25"> John Doe </td>{" "}
                    <td className="fw-bold"> Course 2 </td>{" "}
                    <td className="fw-bold"> 2 </td>{" "}
                    <td className="fw-bold"> $30 </td>{" "}
                    <td className="fw-bold"> $3 </td>{" "}
                    <td className="fw-bold d-flex justify-content-between align-items-center">
                      {" "}
                      $63 .00 <TbSpeakerphone onClick={()=> onContinue()}/>{" "}
                    </td>{" "}
                  </tr>{" "}
                  <tr>
                    <th className="fw-bold"> 05 / 21 / 2023 </th>{" "}
                    <td className="fw-bold"> John Doe </td>{" "}
                    <td className="fw-bold"> Course 2 </td>{" "}
                    <td className="fw-bold"> 2 </td>{" "}
                    <td className="fw-bold"> $30 </td>{" "}
                    <td className="fw-bold"> $3 </td>{" "}
                    <td className="fw-bold"> $63 .00 </td>{" "}
                  </tr>{" "}
                  <tr>
                    <th className="fw-bold"> 05 / 21 / 2023 </th>{" "}
                    <td className="fw-bold"> John Doe </td>{" "}
                    <td className="fw-bold"> Course 2 </td>{" "}
                    <td className="fw-bold"> 2 </td>{" "}
                    <td className="fw-bold"> $30 </td>{" "}
                    <td className="fw-bold"> $3 </td>{" "}
                    <td className="fw-bold"> $63 .00 </td>{" "}
                  </tr>{" "}
                </tbody>{" "}
              </table>
        </div>

            </div>{" "}
            <div className="d-flex gap-2 justify-content-end mt-3">
              <button className="w-25 btn_primary text-light p-2 rounded fw-bold ">
                Download{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </main>{" "}
      <Footer />
    </>
  );
}
