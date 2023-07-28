import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "../";
import { FiRefreshCw } from "react-icons/fi";
import { TbSpeakerphone } from "react-icons/tb";
import { useRouter } from "next/router";
import InstructorFinancialReport from "@/services/FinancialReport/InstructorFinancialReport";
import ParentFinancialReport from "@/services/FinancialReport/ParentFinancialReport";
import StudentFinancialReport from "@/services/FinancialReport/StudentFinancialReport";
import styles from "../../styles/Home.module.css";
import moment from "moment";

function FinancialReport({ role }) {
  const navigation = useRouter();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [financialData, setFinancialData] = useState([]);
  const onRequestRefund = () => {
    navigation.push("/parent/requestrefund");
  };

  const fetchReports = async () => {
    try {
      let res = null;
      switch (role) {
        case "parent":
          res = await ParentFinancialReport({ page, size });
          break;
        case "student":
          res = await StudentFinancialReport({ page, size });
          break;
        default:
          res = await InstructorFinancialReport({ page, size });
      }
      setFinancialData(res.data);
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <>
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
                      <input
                        id="startDate"
                        className="form-control"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className=" d-flex align-items-center gap-3">
                      <p className="fw-bold m-0 p-0"> To </p>
                      <input
                        id="startDate"
                        className="form-control"
                        type="date"
                      />
                      <FiRefreshCw style={{ fontSize: "35px" }} />{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ minWidth: "400px", overflowY: "auto" }}
                className={styles["report-table-wrapper"]}
              >
                <table className="table ">
                  <thead>
                    <tr className="bg-light">
                      <th scope="col" style={{ minWidth: "150px" }}>
                        {" "}
                        Date{" "}
                      </th>{" "}
                      <th scope="col" style={{ minWidth: "150px" }}>
                        {" "}
                        Tutor{" "}
                      </th>{" "}
                      {role === "parent" && (
                        <th scope="col" style={{ minWidth: "150px" }}>
                          {" "}
                          Dependent{" "}
                        </th>
                      )}
                      <th scope="col" style={{ minWidth: "150px" }}>
                        {" "}
                        Course{" "}
                      </th>{" "}
                      <th scope="col" style={{ minWidth: "150px" }}>
                        {" "}
                        Hours Scheduled{" "}
                      </th>{" "}
                      <th scope="col" style={{ minWidth: "150px" }}>
                        {" "}
                        Course Cost{" "}
                      </th>{" "}
                      <th scope="col" style={{ minWidth: "150px" }}>
                        {" "}
                        Booking Fee{" "}
                      </th>{" "}
                      <th scope="col" style={{ minWidth: "150px" }}>
                        {" "}
                        Total Payment{" "}
                      </th>{" "}
                    </tr>{" "}
                  </thead>{" "}
                  <tbody>
                    {financialData.map((item, index) => {
                      <tr key={index}>
                        <th className="fw-bold" scope="row">
                          {" "}
                          {moment(item?.createdAt).format("MM / DD /YYYY ")}
                        </th>{" "}
                        <td className="fw-bold w-25">
                          {" "}
                          {item?.instructor?.firstName}{" "}
                        </td>{" "}
                        {role === "parent" && (
                          <td className="fw-bold w-25">
                            {" "}
                            {item?.studentName}{" "}
                          </td>
                        )}
                        <td className="fw-bold"> {item?.courseName} </td>{" "}
                        <td className="fw-bold"> {item?.hoursScheduled} </td>{" "}
                        <td className="fw-bold"> ${item?.hourlyRate} </td>{" "}
                        <td className="fw-bold"> ${item?.feeAmount} </td>{" "}
                        <td className="fw-bold d-flex justify-content-between align-items-center">
                          {" "}
                          ${item?.totalAmount}{" "}
                          <TbSpeakerphone onClick={() => onRequestRefund()} />{" "}
                        </td>{" "}
                      </tr>;
                    })}
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
    </>
  );
}

export default FinancialReport;
