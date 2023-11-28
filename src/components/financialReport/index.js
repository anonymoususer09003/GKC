import React, { useState, useEffect, useRef } from 'react';
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
  const tbodyRef = useRef(null);
  const prevScrollTopRef = useRef(0);
  const [financialData, setFinancialData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecods] = useState(0);
  const [totatlAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState({
    start: '2023-09-01',
    end: moment().format('YYYY-MM-DD'),
  });

  const onRequestRefund = () => {
    navigation.push('/parent/requestrefund');
  };

  const fetchReports = async (applyFilter) => {
    try {
      let res = null;
      let filter = null;

      let endDate = moment(date?.end, 'YYYY-MM-DD');

      // Add one day to the date
      const newDate = endDate.add(1, 'days').format('YYYY-MM-DD');
      if (applyFilter)
        filter = `start=${date.start}&end=${newDate}&page=${page}&size=${size}`;

      const body = {
        start: date.start,
        end: date.end,
        size,
        sort: ['DESC'],
      };
      const queryString = new URLSearchParams(body).toString();
      if (filter !== null) {
        switch (role) {
          case 'parent':
            res = await ParentFinancialReport({ filter: queryString });
            break;
          case 'student':
            res = await StudentFinancialReport({ filter: queryString });
            break;
          default:
            res = await InstructorFinancialReport({ filter: queryString });
        }
      }

      setFinancialData(res?.data?.content ?? []);
      let sum = 0;
      res?.data?.content?.map((item) => {
        sum = item.totalAmount + sum;
      });

      setTotalAmount(sum);
      setTotalRecods(res?.data?.totalElements);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log('err', err);
    }
  };

  const fetchMoreReports = async (applyFilter) => {
    try {
      let res = null;
      let filter = null;
      if (applyFilter)
        filter = `?start=${date.start}&end=${date.end}&page=${page}&size=${size}`;
      const body = {
        start: date.start,
        end: date.end,
        size,
        sort: ['DESC'],
      };
      if (filter !== null) {
        switch (role) {
          case 'parent':
            res = await ParentFinancialReport({ filter: queryString });
            break;
          case 'student':
            res = await StudentFinancialReport({ filter: queryString });
            break;
          default:
            res = await InstructorFinancialReport({ filter: queryString });
        }
      }

      setFinancialData((prev) => [...prev, ...res?.data?.content]);
      setTotalRecods(res?.data?.totalElements);
      setPage((prev) => prev + 1);
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

      let pdfData = res.data;
      if (pdfData) {
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Create a link element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'financial_report.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  const handleDateChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setPage(0);

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

  const handleScroll = () => {
    const tbody = tbodyRef.current;
    if (tbody) {
      const scrollableHeight = tbody.scrollHeight - tbody.clientHeight;
      const scrollPosition = tbody.scrollTop;

      if (!reachedEnd && scrollPosition >= prevScrollTopRef.current) {
        // You have reached the end of the scroll and haven't triggered the action yet
        // Call your function or perform any desired action
        // Example: YourFunctionToLoadMoreData();

        if (financialData.length < totalRecords)
          fetchMoreReports(date.start && date.end ? true : false);
        setReachedEnd(true); // Set the flag to true to prevent multiple triggers
      } else if (scrollPosition < prevScrollTopRef.current) {
        // Reset the flag when scrolling back up to allow the action to trigger again
        setReachedEnd(false);
      }

      // Update the previous scroll position
      prevScrollTopRef.current = scrollPosition;
    }
  };
  useEffect(() => {
    // Attach the scroll event listener to the tbody element
    tbodyRef?.current?.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      tbodyRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [reachedEnd]);

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
              ref={tbodyRef}
              className="border rounded p-4 my-4"
              style={{
                minHeight: '400px',
                maxHeight: '400px',
                overflow: 'scroll',
              }}
            >
              <div className="w-50 m-auto pb-4">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className=" d-flex align-items-center gap-3">
                      <p className="fw-bold m-0 p-0"> From </p>{' '}
                      <input
                        value={date.start || '2023-09-01'}
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
                style={{
                  minWidth: '400px',
                }}
                className={styles['report-table-wrapper']}
              >
                <table className="table ">
                  <thead>
                    <tr className="bg-light">
                      <th scope="col" style={{ minWidth: '150px' }}>
                        {' '}
                        Date{' '}
                      </th>{' '}
                      <th scope="col" style={{ minWidth: '90px' }}>
                        {' '}
                        {role === 'instructor' ? 'Student' : 'Tutor'}
                      </th>{' '}
                      {role === 'parent' && (
                        <th scope="col" style={{ minWidth: '90px' }}>
                          {' '}
                          Dependent{' '}
                        </th>
                      )}
                      <th scope="col" style={{ minWidth: '330px' }}>
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
                    {financialData.length > 0 &&
                      financialData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th className="fw-bold" scope="row">
                              {' '}
                              {item?.createdAt.slice(0, 10)}
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
                            <td className="fw-bold">
                              {' '}
                              {item?.hoursScheduled}{' '}
                            </td>{' '}
                            <td className="fw-bold">
                              {' '}
                              ${item?.hourlyRate.toFixed(2)}{' '}
                            </td>{' '}
                            <td className="fw-bold">
                              {' '}
                              ${item?.feeAmount.toFixed(2)}{' '}
                            </td>{' '}
                            <td className="fw-bold d-flex justify-content-between align-items-center">
                              {' '}
                              ${item?.totalAmount.toFixed(2)}{' '}
                              {/* <TbSpeakerphone onClick={() => onRequestRefund()} />{' '} */}
                            </td>{' '}
                          </tr>
                        );
                      })}
                    <tr>
                      <th className="fw-bold" scope="row">
                        {' '}
                      </th>{' '}
                      <td className="fw-bold w-25"> </td>{' '}
                      {role === 'parent' && <td className="fw-bold w-25"> </td>}
                      <td className="fw-bold"> </td>{' '}
                      <td className="fw-bold"> </td>{' '}
                      <td className="fw-bold"> </td>{' '}
                      <td className="fw-bold"></td>{' '}
                      <td className="fw-bold d-flex justify-content-between align-items-center">
                        {' '}
                        ${totatlAmount.toFixed(2)}
                        {/* <TbSpeakerphone onClick={() => onRequestRefund()} />{' '} */}
                      </td>{' '}
                    </tr>
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
