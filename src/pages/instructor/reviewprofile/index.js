import React from "react";
import Head from "next/head";
import { Navbar,TutorNavbar, Footer } from "../../../components";
import Image from "next/image";
import { FaFileVideo } from "react-icons/fa";

import { RiArrowGoBackLine } from "react-icons/ri";
import { BsCheck2Circle, BsFillCameraVideoFill } from "react-icons/bs";
import { BiMessageAlt } from "react-icons/bi";
import { MdOutlineCelebration } from "react-icons/md";
import StarRatings from "react-star-ratings";
import { withRole } from '../../../utils/withAuthorization';

function ReviewProfile() {

  return (
    <>
      <Head>
        <title>Review Profile</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />

      <main className="container-fluid">
        <div className="container">
          <div style={{ minHeight: "90vh" }}>
            <div className="">
              <div className="d-flex  justify-content-center align-items-center gap-2 py-3">
                <div className="bg_secondary rounded-circle p-3 ">
                  <MdOutlineCelebration
                    style={{ fontSize: "50px", color: "white" }}
                  />
                </div>

                <div>
                  <h2 className="m-0 p-0 fw-bold text-muted pb-2">
                    Congratulations
                  </h2>

                  <p className="m-0 p-0 fw-bold text-muted">
                    This is what parents and students will see
                  </p>
                </div>
              </div>

              <div className="bg-black text-white my-4 p-5 rounded-5">
                <div className="modal-body">
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <Image
                        src="/assets/student-preview.png"
                        alt=""
                        width={120}
                        height={120}
                        priority
                        className="rounded-circle bg-light"
                      />
                    </div>
                    <div className="flex-1 w-100">
                      <div className="d-flex justify-content-between align-items-center ">
                        <h5 className="m-0 p-0">John S.</h5>

                        <h4 className="m-0 p-0 fw-bold">$30/hr</h4>
                      </div>
                      <div className="d-flex align-items-center gap-4">
                        <div className="mb-2">
                          <StarRatings
                            starRatedColor="#cc9338"
                            rating={4.2}
                            starDimension="20px"
                            starSpacing="0px"
                          />
                        </div>
                        <p className="m-0 p-0">Stars 4.2/5</p>
                        <button className="m-0 p-0 bg_secondary border-0 text-white p-2 rounded d-flex align-items-center gap-2">
                          <BiMessageAlt style={{ fontSize: "22px" }} />
                          Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div className="d-flex align-items-center p-3 gap-3">
                    <FaFileVideo
                      style={{ fontSize: "40px", color: "#006600" }}
                    />

                    <h5 className="m-0 p-0 pb-0">Call to action title</h5>
                  </div>
                  <p className="my-2 p-3 pt-0">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Praesentium repellendus blanditiis nulla obcaecati est,
                    animi, vitae rerum dolores delectus, soluta iusto
                    perspiciatis nesciunt ex voluptas sapiente quaerat quia
                    temporibus nam.Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Praesentium repellendus blanditiis nulla
                    obcaecati est, animi, vitae rerum dolores delectus, soluta
                    iusto perspiciatis nesciunt ex voluptas sapiente quaerat
                    quia temporibus nam. Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Praesentium repellendus blanditiis nulla
                    obcaecati est, animi, vitae rerum dolores delectus, soluta
                    iusto perspiciatis nesciunt ex voluptas sapiente quaerat
                    quia temporibus nam.Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Praesentium repellendus blanditiis nulla
                    obcaecati est, animi, vitae rerum dolores delectus, soluta
                    iusto perspiciatis nesciunt ex voluptas sapiente quaerat
                    quia temporibus nam.
                  </p>
                  <div className="row">
                    <div className="col-5">
                      <div className="m-0 px-3 align-items-center">
                        <h5 className="m-0 p-0  pb-3">
                          Course/s and Skill Levels I Teach
                        </h5>
                        <div className="d-flex gap-4 m-0 p-0 b-3">
                          <p className="fw-bold m-0 p-0 fw-lighter">Course 1</p>
                          <p className="fw-bold m-0 p-0 fw-lighter">Beginner</p>
                          <p className="fw-bold m-0 p-0 fw-lighter">
                            Intermediate
                          </p>
                        </div>
                        <div className="d-flex gap-4 m-0 p-0 b-3">
                          <p className="fw-bold m-0 p-0 fw-lighter">Course 2</p>
                          <p className="fw-bold m-0 p-0 fw-lighter">
                            Semi-Expert
                          </p>
                        </div>

                        <div className="d-flex gap-4 m-0 p-0 b-3">
                          <p className="fw-bold m-0 p-0 fw-lighter">Course 3</p>
                          <p className="fw-bold m-0 p-0 fw-lighter">
                            Intermediate
                          </p>

                          <p className="fw-bold m-0 p-0 fw-lighter">
                            Semi-Expert
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col d-flex gap-4">
                      <div className=" px-3 pt-2">
                        <h5 className="m-0 p-0 pb-3">Age Group</h5>

                        <ul className="d-flex list-unstyled m-0 p-0 gap-4">
                          <li className="m-0 p-0">Middle School (10yrs) </li>
                        </ul>
                      </div>
                      <div className=" px-3 pt-2">
                        <h5 className="m-0 p-0 pb-3">Speaks</h5>

                        <ul className="d-flex list-unstyled m-0 p-0 gap-4">
                          <li className="m-0 p-0">English</li>
                        </ul>
                      </div>
                      <div className="px-3 pt-2">
                        <h5 className="m-0 p-0 pb-3">Delivery Mode:</h5>

                        <ul className="d-flex list-unstyled m-0 p-0 gap-4">
                          <li className="m-0 p-0">Online </li>
                          <li className="m-0 p-0"> In-Persion </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-4 p-0 px-3">
              <button
                className={`w-25 btn_primary py-2 px-3 fw-bold text-white rounded`}
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(ReviewProfile, ['Instructor']);
