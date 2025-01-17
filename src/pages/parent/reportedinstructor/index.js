import styles from "@/styles/Navbar.module.css";
import height from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import { ParentNavbar, Footer } from "../../../components";
import Head from "next/head";
import { withRole } from '../../../utils/withAuthorization';

function ReportedInstructor() {

  const [showActivation, setShowActivation] = useState(false);
  const instructors = ["John Doe", "Jone Rich", "Katy Long"];
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
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
        <title>Parent Reported Instructor</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <ParentNavbar isLogin={true} />
      <main className="container-fluid">
        <div
          className={` container-sm pt-5`}
          style={{ minHeight: "90vh" }}
        >
          <p className="fw-bold h4 text-center py-3">Reporting</p>

          <div className="row">
            <div className="col-12 col-md-4">
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
            <div className="col-12  col-md-8">
              <p className="fw-bold h5">Issue: Poor explanation of subject</p>

              <textarea
                className="form-control my-4"
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

export default withRole(ReportedInstructor, ['Parent']);
