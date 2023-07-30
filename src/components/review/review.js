import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import styles from "../../styles/Home.module.css";
import PostReview from "@/services/Review/PostReview";
import { useDispatch, useSelector } from "react-redux";
export default function Review({ role }) {
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const [showActivation, setShowActivation] = useState(false);
  const instructors = ["John Doe", "Jone Rich", "Katy Long"];
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [comment, setComment] = useState("");
  const navigation = useRouter();
  console.log("loggedin user", loggedInUser);
  const onSubmit = async () => {
    try {
      let body = {
        comment: comment,
        ratingForUnderstanding: rating1,
        ratingForTeachingSkills: rating2,
        ratingForSchedule: rating3,
        reviewerId: loggedInUser?.id,
        instructorId: loggedInUser?.id,
        courseId: 0,
      };
      let res = await PostReview(body);
      setComment("");
      setRating1(0);
      setRating2(0);
      setRating3(0);
      alert("Review has been submitted successfully");
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <main className="container-fluid">
      <div
        className={`container-sm w-50 pt-5 ${styles.reviewContainer}`}
        style={{ minHeight: "90vh" }}
      >
        <div className={`row ${styles.rowWrapper}`}>
          <div className="col-4">
            <h5 className="py-3"> Your Instructors </h5>{" "}
            <ul className="p-0 m-0" style={{ listStyle: "none" }}>
              <li className="p-0 m-0 fw-bold bg-light p-3 my-2 rounded ">
                John Doe{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="col col-8">
            <div className="container">
              <div className="row w-70">
                <h5 className="mb-5 col"> Tutor tought me: </h5>{" "}
                <div className="col">
                  <div className="w-50">
                    <select
                      className={`form-select ${styles.reviewDropdown}`}
                      aria-label="Default select example"
                    >
                      {/* <option selected>Select course</option> */}{" "}
                      <option value="1"> Course 1 </option>{" "}
                      <option value="2"> Course 2 </option>{" "}
                      <option value="3"> Course 3 </option>{" "}
                    </select>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="container">
              <h6 className="p-0 m-0"> Tutor 's understanding of course</h6>{" "}
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
                </div>{" "}
                <div className="col">
                  {" "}
                  {rating1}
                  /5
                </div>
              </div>{" "}
            </div>{" "}
            <div className="container">
              <h6 className="p-0 m-0"> Teaching skills </h6>{" "}
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
                </div>{" "}
                <div className="col">
                  {" "}
                  {rating2}
                  /5
                </div>
              </div>{" "}
            </div>{" "}
            <div className="container">
              <h6 className="p-0 m-0"> Keeps to schedule </h6>{" "}
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
                </div>{" "}
                <div className="col">
                  {" "}
                  {rating3}
                  /5
                </div>
              </div>{" "}
            </div>{" "}
            <div className=" my-4 fw-bold text-end">
              {" "}
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
            ></textarea>{" "}
            <div className="mt-3 text-end">
              <button
                onSubmit={onSubmit}
                className={`${styles.btn_primary} py-2 px-4 fw-bold text-white rounded text-end`}
                type="submit"
              >
                Submit{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}
