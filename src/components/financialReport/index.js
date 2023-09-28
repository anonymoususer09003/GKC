import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Navbar, Footer } from '../';
import { FiRefreshCw } from 'react-icons/fi';
import { TbSpeakerphone } from 'react-icons/tb';
import { useRouter } from 'next/router';
import InstructorFinancialReport from '@/services/FinancialReport/InstructorFinancialReport';
import ParentFinancialReport from '@/services/FinancialReport/ParentFinancialReport';
import StudentFinancialReport from '@/services/FinancialReport/StudentFinancialReport';
import DownloadFinancialReport from '@/services/FinancialReport/DownloadFinancialReport';
import styles from '../../styles/Home.module.css';
import moment from 'moment';

function FinancialReport({ role }) {
  const navigation = useRouter();
  const [financialData, setFinancialData] = useState([]);
  const [date, setDate] = useState({
    start: null,
    end: null,
  });

  const onRequestRefund = () => {
    navigation.push('/parent/requestrefund');
  };

  const fetchReports = async (applyFilter) => {
    try {
      let res = null;
      let filter = null;
      if (applyFilter)
        filter = `?start=${date.start}&end=${date.end}`;
      if (filter !== null){
        switch (role) {
          case 'parent':
            res = await ParentFinancialReport({ filter });
            break;
          case 'student':
            res = await StudentFinancialReport({ filter });
            break;
          default:
            res = await InstructorFinancialReport({ filter });
        }
      }

      setFinancialData(res?.data ?? []);
      console.log('res', res);
      console.log(financialData)
    } catch (err) {
      console.log('err', err);
    }
  };
  const downloadReport = async () => {
    try {
      let filter = null;
      if (date.start && date.end) {
        filter = `?start=${date.start}&end=${date.end}`;
      }
      let res = await DownloadFinancialReport({ filter });
      console.log('download report ', res);
    } catch (err) {
      console.log('err', err);
    }
  };
  const handleDateChange = (e) => {
    console.log(e.target.value)
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setDate({
      start: null,
      end: null,
    });
    fetchReports();
  };
  useEffect(() => {
    fetchReports();
  }, []);
  useEffect(() => {
    if (date.start && date.end) fetchReports(true);
  }, [date]);

  return (
    <>
      <main className="container-fluid">
        <div className="container">
          <div className=" " style={{ minHeight: '100vh' }}>
            <br />
            <br />
            <h5 className="text-dark fw-bold text-center">Report </h5>{' '}
            {financialData.length == 0 ? (
              <p className="tw-text-center pt-2 tw-text-[#f48342] tw-font-semibold">
                {' '}
                You currently don't have any transaction to report
              </p>
            ) : null}
            <div
              className="border rounded p-4 my-4"
              style={{ minHeight: '400px' }}
            >
              <div className="w-50 m-auto pb-4">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className=" d-flex align-items-center gap-3">
                      <p className="fw-bold m-0 p-0"> From </p>{' '}
                      <input
                        value={date.start || new Date()}
                        id="startDate"
                        className="form-control"
                        type="date"
                        onChange={(e) => handleDateChange(e)}
                        name="start"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className=" d-flex align-items-center gap-3">
                      <p className="fw-bold m-0 p-0"> To </p>
                      <input
                        value={date?.end || new Date()}
                        id="startDate"
                        className="form-control"
                        type="date"
                        name="end"
                        onChange={(e) => handleDateChange(e)}
                      />
                      <FiRefreshCw
                        onClick={handleReset}
                        // onClick={()=>{console.log(date)}}
                        style={{ fontSize: '35px' }}
                      />{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ minWidth: '400px', overflowY: 'auto' }}
                className={styles['report-table-wrapper']}
              >
                <table className="table ">
                  <thead>
                    <tr className="bg-light">
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        Date{' '}
                      </th>{' '}
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        {role === 'instructor' ? 'Student' : 'Tutor'}
                      </th>{' '}
                      {role === 'parent' && (
                        <th scope="col" style={{ minWidth: '150px' }}>
                          {' '}
                          Dependent{' '}
                        </th>
                      )}
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        Course{' '}
                      </th>{' '}
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        Hours Scheduled{' '}
                      </th>{' '}
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        Course Cost{' '}
                      </th>{' '}
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        Booking Fee{' '}
                      </th>{' '}
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        Total Payment{' '}
                      </th>{' '}
                    </tr>{' '}
                  </thead>{' '}
                  <tbody>
                    {financialData.length > 0 && financialData.map((item, index) => { return<tr key={index}>
                        <th className="fw-bold" scope="row">
                          {' '}
                          {item?.createdAt.slice(0,10)}
                        </th>{' '}
                        <td className="fw-bold w-25">
                          {' '}
                          {role === 'instructor'
                            ? item?.studentName
                            : item?.instructorName}{' '}
                        </td>{' '}
                        {role === 'parent' && (
                          <td className="fw-bold w-25">
                            {' '}
                            {item?.studentName}{' '}
                          </td>
                        )}
                        <td className="fw-bold"> {item?.courseName} </td>{' '}
                        <td className="fw-bold"> {item?.hoursScheduled} </td>{' '}
                        <td className="fw-bold"> ${item?.hourlyRate} </td>{' '}
                        <td className="fw-bold"> ${item?.feeAmount} </td>{' '}
                        <td className="fw-bold d-flex justify-content-between align-items-center">
                          {' '}
                          ${item?.totalAmount}{' '}
                          {/* <TbSpeakerphone onClick={() => onRequestRefund()} />{' '} */}
                        </td>{' '}
                      </tr>;
                    })}
                  </tbody>{' '}
                </table>
              </div>
            </div>{' '}
            <div className="d-flex gap-2 justify-content-end mt-3">
              <button
                onClick={downloadReport}
                className="w-25 btn_primary text-light p-2 rounded fw-bold "
              >
                Download{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
        </div>
      </main>{' '}
    </>
  );
}

export default FinancialReport;
