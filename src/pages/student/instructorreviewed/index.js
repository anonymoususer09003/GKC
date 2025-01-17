import styles from "@/styles/Navbar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import { Navbar, Footer } from "../../../components";
import Head from "next/head";
import { withRole } from '../../../utils/withAuthorization';

function InstructorReviewed() {

  const [showActivation, setShowActivation] = useState(false);
  const instructors = ["John Doe", "Jone Rich", "Katy Long"];
  const [rating1, setRating1] = useState(5);
  const [rating2, setRating2] = useState(4);
  const [rating3, setRating3] = useState(3);
  const navigation = useRouter();
  const onContinue = () => {
    if (showActivation) {
      return navigation.push("signin");
    }
    setShowActivation(true);
  };
  return (
    <>
      <Head>
        <title>Report</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div
          className={` container-sm pt-5`}
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12 row">
            <div className="col-md-4">
              <h5 className="py-3">Your Instructors</h5>
              <ul className="p-0 m-0" style={{ listStyle: "none" }}>
                <li className="p-0 m-0 fw-bold bg-light p-3 my-2 rounded ">
                  John Doe
                </li>
                <li className="p-0 m-0 fw-bold  p-3 my-2 rounded ">
                  Jane Khan
                </li>
                <li className="p-0 m-0 fw-bold  p-3 my-2 rounded ">Liz Gibz</li>
                <li className="p-0 m-0 fw-bold  p-3 my-2 rounded ">
                  Scott Lopez
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-8">
              <div className="container">
                <div className="row w-70">
                  <h5 className="mb-5 col">Tutor tought me: </h5>
                  <div className="col">
                    <div className="w-50">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        {/* <option selected>Select course</option> */}
                        <option value="1">Course 1</option>
                        <option value="2">Course 2</option>
                        <option value="3">Course 3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <h6 className="p-0 m-0">Tutor's understanding of course</h6>
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
                  </div>
                  <div className="col">{rating1}/5</div>
                </div>
              </div>
              <div className="container">
                <h6 className="p-0 m-0">Teaching skills</h6>
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
                  </div>
                  <div className="col">{rating2}/5</div>
                </div>
              </div>
              <div className="container">
                <h6 className="p-0 m-0">Keeps to schedule</h6>
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
                  </div>
                  <div className="col">{rating3}/5</div>
                </div>
              </div>
              <div className=" my-4 fw-bold text-end">
                Score: {((rating1 + rating2 + rating3) / 3).toFixed(2)}/5
              </div>

              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="8"
                placeholder="Tell us about your experience"
              >
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
              </textarea>
              <div className="mt-3 text-end">
                <button
                  className={`${styles.btn_primary} py-2 px-5 fw-bold text-white rounded text-end`}
                  type="submit"
                >
                  Edit
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


export default withRole(InstructorReviewed, ['Student']);
