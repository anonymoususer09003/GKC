import styles from "@/styles/Navbar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import { TutorNavbar, Footer } from "../../../components";
import Head from "next/head";
import { withRole } from '../../../utils/withAuthorization';

function ViewReviewResponse() {

  const [showActivation, setShowActivation] = useState(false);
  const instructors = ["John Doe", "Jone Rich", "Katy Long"];
  const [rating1, setRating1] = useState(3);
  const [rating2, setRating2] = useState(2);
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
        <title>Instructor View Review Responses</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <main className="container-fluid">
        <div
          className={` container-sm w-50 pt-5`}
          style={{ minHeight: "90vh" }}
        >
          <div className="row">
            <div className="col-4">
              <h5 className="py-3">Your Reviews</h5>
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
            <div className="col col-8">
              <div className="container">
                <div className="row w-70">
                  <h5 className="mb-5 col">Course Taught: </h5>
                  <div className="col">
                    <div className="w-50">
                      <p className="fw-bold">Course 1</p>
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
                  <div className="col">{rating3 }/5</div>
                </div>
              </div>
              <div className=" my-4 fw-bold text-end">Score: {((rating1+rating2+rating3)/3).toFixed(1)}/5</div>

      
<p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet numquam repellendus error. Perspiciatis tempore, voluptas eos esse deserunt dolorum eveniet blanditiis, laborum asperiores mollitia laboriosam amet error reiciendis, illum omnis?

</p>
           
<p className="fw-bold">Your response</p>
              <textarea className="w-100 rounded p-2" rows="7" >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet numquam repellendus error. Perspiciatis tempore, voluptas eos esse deserunt dolorum eveniet blanditiis, laborum asperiores mollitia laboriosam amet error reiciendis, illum omnis?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet numquam repellendus error. Perspiciatis tempore, voluptas eos esse deserunt dolorum eveniet blanditiis, laborum asperiores mollitia laboriosam amet error reiciendis, illum omnis?

</textarea>
   <div className="mt-3 text-end">
                <button
                  className={`${styles.btn_primary} py-2 px-4 fw-bold text-white rounded text-end`}
                  type="submit"
                >
                  Respond
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

export default withRole(ViewReviewResponse, ['Instructor']);
