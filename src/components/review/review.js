import React, { useEffect, useState } from 'react';

import StarRatings from 'react-star-ratings';
import styles from '../../styles/Home.module.css';
import PostReview from '@/services/Review/PostReview';
import GetInstructorByStudent from '@/services/Review/GetInstructorByStudent';
import GetInstructorForParents from '@/services/Review/GetInstructorForParents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/actions/userActions';
import { useRouter } from 'next/router';
import { apiClient } from '@/api/client';
export default function Review({ role }) {
  const nav = useRouter();
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const [userInfo, setUserInfo] = useState(null);
  const [showActivation, setShowActivation] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [success, setSuccess] = useState(false);
  const [comment, setComment] = useState('');
  const navigation = useRouter();
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
  const onSubmit = async () => {
    try {
      let body = {
        comment: comment,
        ratingForUnderstanding: rating1,
        ratingForTeachingSkills: rating2,
        ratingForSchedule: rating3,
        reviewerId: userInfo?.id,
        instructorId: selectedInstructor?.id,
        courseId: selectedCourse,
      };
      console.log(body);
      const res = await apiClient.post('/review', {
        ...body,
      });
      console.log(res);
      setComment('');
      setRating1(0);
      setRating2(0);
      setRating3(0);
      setSelectedInstructor(null);
      setSelectedCourse(null);
      setSuccess(true);
    } catch (err) {
      console.log('err', err);
    }
  };
  const getReviewInstructors = async () => {
    try {
      let res = null;
      if (role === 'parent') {
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

  useEffect(() => {
    const run = async () => {
      const res = await apiClient('/user/logged-user-details');
      // console.log(res.data)
      setUserInfo(res.data);
    };
    run();
    getReviewInstructors();
  }, []);

  let isDisabled =
    comment.length < 100 &&
    selectedInstructor === null &&
    selectedCourse === null;

  return (
    <main className="container-fluid">
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
              You successfully sent a review.
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
      <div
        className={`container-sm w-50 pt-5 ${styles.reviewContainer}`}
        style={{ minHeight: '90vh' }}
      >
        <div className={`row ${styles.rowWrapper}`}>
          <div className="col-4">
            <h5 className="py-3"> Instructors </h5>{' '}
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
          </div>{' '}
          <div className="col col-8">
            <div className="container">
              <div className="row w-70">
                <h5 className="mb-5 col"> Instructor taught: </h5>{' '}
                <div className="col">
                  <div className="w-50">
                    <select
                      className={`form-select ${styles.reviewDropdown}`}
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <option selected>Select course</option>{' '}
                      {selectedInstructor?.coursesToTutorAndProficiencies?.map(
                        (item, index) => {
                          return (
                            <option key={index} value={item?.course?.id}>
                              {item?.course?.name}{' '}
                            </option>
                          );
                        }
                      )}
                    </select>{' '}
                  </div>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
            <div className="container">
              <h6 className="p-0 m-0"> Tutor 's understanding of course</h6>{' '}
              <div className="row align-items-center py-2">
                <div className="col">
                  <StarRatings
                    starRatedColor="#cc9338"
                    rating={rating1}
                    starHoverColor="#cc9338"
                    changeRating={setRating1}
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </div>{' '}
                <div className="col">
                  {' '}
                  {rating1}
                  /5
                </div>
              </div>{' '}
            </div>{' '}
            <div className="container">
              <h6 className="p-0 m-0"> Teaching skills </h6>{' '}
              <div className="row align-items-center py-2">
                <div className="col">
                  <StarRatings
                    starRatedColor="#cc9338"
                    rating={rating2}
                    starHoverColor="#cc9338"
                    changeRating={setRating2}
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </div>{' '}
                <div className="col">
                  {' '}
                  {rating2}
                  /5
                </div>
              </div>{' '}
            </div>{' '}
            <div className="container">
              <h6 className="p-0 m-0"> Keeps to schedule </h6>{' '}
              <div className="row align-items-center py-2">
                <div className="col">
                  <StarRatings
                    starRatedColor="#cc9338"
                    rating={rating3}
                    starHoverColor="#cc9338"
                    changeRating={setRating3}
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </div>{' '}
                <div className="col">
                  {' '}
                  {rating3}
                  /5
                </div>
              </div>{' '}
            </div>{' '}
            <div className=" my-4 fw-bold text-end">
              {' '}
              Score: {((rating1 + rating2 + rating3) / 3).toFixed(1)}
              /5
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`form-control ${styles.reviewDropdown}`}
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Tell us about your experience"
            ></textarea>{' '}
            <div className="d-grid d-md-flex tw-mt-2 justify-content-lg-between">
              <p className="opacity-50 mt-2 ms-3">
                {comment.length}/500 (min. 100 characters)
              </p>
              <button
                className={`py-2 px-4 fw-bold text-white rounded text-end`}
                style={{
                  background:
                    comment.length >= 100 && comment.length <= 500
                      ? '#f48343'
                      : 'gray',
                }}
                disabled={
                  comment.length >= 100 && comment.length <= 500 ? false : true
                }
                onClick={onSubmit}
              >
                Send
              </button>
            </div>
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </main>
  );
}
