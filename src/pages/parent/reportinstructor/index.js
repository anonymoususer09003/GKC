import { useEffect, useState } from 'react';
import { ParentNavbar, Footer } from '../../../components';
import Head from 'next/head';
import { withRole } from '../../../utils/withAuthorization';
import styles from '../../../styles/Home.module.css';
import GetInstructorForParents from '@/services/Review/GetInstructorForParents';
import GetInstructorByStudent from '@/services/Review/GetInstructorByStudent';
import report from '@/services/Report/report';
import { useRouter } from 'next/router';
import { apiClient } from '@/api/client';

function ReportInstructor() {

  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [comment, setComment] = useState('');
  const [reasonOfReporting, setreasonOfReporting] = useState('');
  const [success, setSuccess] = useState(false);
  function removeDuplicates(arr) {
    const uniqueObjects = {};
    const resultArray = [];

    for (const obj of arr) {
      // Convert the object to a string for easy comparison
      const objString = JSON.stringify(obj);

      // Check if we've seen this object before
      if (!uniqueObjects[objString]) {
        uniqueObjects[objString] = true;
        resultArray.push(obj);
      }
    }

    return resultArray;
  }

  const getReviewInstructors = async () => {
    try {
      let res = null;
      if (
        JSON.parse(window.localStorage.getItem('gkcAuth')).role === 'Parent'
      ) {
        res = await GetInstructorForParents();
        const uniqueArray = removeDuplicates(res.data);
        setInstructors(uniqueArray);
      } else {
        res = await GetInstructorByStudent();
        const uniqueArray = removeDuplicates(res.data);
        setInstructors(uniqueArray);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const onSubmit = async () => {
    try {
      let body = {
        comment: comment,
        reasonOfReporting: reasonOfReporting,
        reportedUserId: selectedInstructor?.id,
      };
      const res = await apiClient.post(`/report`, {
        ...body,
      });
      console.log(res);
      setSuccess(true);
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    getReviewInstructors();
  }, []);
  console.log('instructors', instructors);
  return (
    <>
      {success ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              background: 'white',
              margin: '500px auto',
              padding: 20,
              width: '380px',
            }}
          >
            <p
              style={{
                width: 350,
                margin: 'auto',
                textAlign: 'center',
                fontSize: 18,
              }}
            >
              You successfully sent a report to our team.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setSuccess(false);
                  nav.back();
                }}
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: 100 }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Head>
        <title>Parent Reported Instructor</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <ParentNavbar isLogin={true} />
      <main className="container-fluid">
        <div className={` container pt-5`} style={{ minHeight: '90vh' }}>
          <div className="row">
            <div className="col">
              <h5 className="py-3">Your Instructors</h5>
              {instructors.map((item, key) => {
                return (
                  <ul
                    onClick={() => setSelectedInstructor(item)}
                    key={key}
                    className="p-0 m-0"
                    style={{ listStyle: 'none' }}
                  >
                    <li
                      className={`p-0 m-0 fw-bold ${
                        selectedInstructor && selectedInstructor.id === item.id
                          ? 'bg-black text-white'
                          : 'bg-gray'
                      } p-3 my-2 rounded`}
                    >
                      {item?.firstName + ' ' + item?.lastName}
                    </li>{' '}
                  </ul>
                );
              })}
            </div>
            <div className="col col-9">
              <h5 className="mb-5">
                Tell us your reason for reporting{' '}
                {`${
                  selectedInstructor !== null
                    ? selectedInstructor?.firstName +
                      ' ' +
                      selectedInstructor?.lastName
                    : ''
                }`}
              </h5>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting('Unprofessional Conduct');
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option"
                />
                <label className="form-check-label" htmlFor="option">
                  Unprofessional Conduct
                </label>
              </div>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting('Not skilled in subject area');
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option2"
                />
                <label className="form-check-label" htmlFor="option2">
                  Not skilled in subject area
                </label>
              </div>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting(
                    'Does not give clear explanation of subject'
                  );
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option3"
                />
                <label className="form-check-label" htmlFor="option3">
                  Does not give clear explanation of subject
                </label>
              </div>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting('Inadequate teaching experience');
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option4"
                />
                <label className="form-check-label" htmlFor="option4">
                  Inadequate teaching experience
                </label>
              </div>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting('Violation of policies');
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option5"
                />
                <label className="form-check-label" htmlFor="option5">
                  Violation of policies
                </label>
              </div>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting('Lateness to class');
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option6"
                />
                <label className="form-check-label" htmlFor="option6">
                  Lateness to class
                </label>
              </div>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting('Does not teach for the hours paid');
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option7"
                />
                <label className="form-check-label" htmlFor="option7">
                  Does not teach for the hours paid
                </label>
              </div>
              <div
                className="form-check my-3"
                onClick={() => {
                  setreasonOfReporting('Other');
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option8"
                />
                <label className="form-check-label" htmlFor="option8">
                  Other...
                </label>
              </div>
              <textarea
                className={`form-control ${styles.reviewDropdown}`}
                id="exampleFormControlTextarea1"
                rows="5"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
              <div className="mt-3 text-end d-md-flex justify-content-lg-between">
                <p className="opacity-50 mt-2 ms-3">
                  {comment.length}/500 (min. 100 characters)
                </p>
                <button
                  className={` py-2 px-4 fw-bold text-white rounded text-end`}
                  style={{
                    background:
                      comment.length >= 100 &&
                      comment.length <= 500 &&
                      reasonOfReporting.length >= 3
                        ? '#f48343'
                        : 'gray',
                  }}
                  disabled={
                    comment.length >= 100 &&
                    comment.length <= 500 &&
                    reasonOfReporting.length >= 3
                      ? false
                      : true
                  }
                  type="submit"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(ReportInstructor, ['Parent']);
