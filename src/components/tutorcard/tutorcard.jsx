import React from "react";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import { BiMessageAlt } from "react-icons/bi";
import StarRatings from "react-star-ratings";
const Tutorcard = () => {
  return (
    <>
      <div className="d-flex align-items-center gap-4 border my-2 p-3 shadow p-3 mb-5 bg-white rounded">
        <div data-bs-toggle="modal" data-bs-target="#exampleModal">
          <Image
            src="/assets/student-preview.png"
            alt=""
            width={200}
            height={200}
            priority
            className="rounded-circle bg-light"
          />
        </div>
        <div>
          <div className="d-flex align-items-center justify-content-between flex-1">
            <b
              className="m-0 p-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              John S.
            </b>
            <div
              className="d-flex align-items-center gap-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <div className="mb-2">
                <StarRatings
                  starRatedColor="#cc9338"
                  rating={4.2}
                  starDimension="20px"
                  starSpacing="0px"
                />
              </div>
              <p className="m-0 p-0">Stars 4.2/5</p>
            </div>
            <button
              className="m-0 p-0 bg_secondary border-0 text-white p-2 rounded d-flex align-items-center gap-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              <BiMessageAlt style={{ fontSize: "22px" }} />
              Reviews
            </button>
            <p className="m-0 p-0 fw-bold">$30/hr</p>
            <button
              className={`btn_primary py-2 px-5 fw-bold text-white rounded`}
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Select
            </button>
            <button
              className={`btn_primary py-2 px-5 fw-bold text-white rounded`}
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Request Interview
            </button>
          </div>
          <h5
            className="m-0 pt-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Call to action title
          </h5>
          <p
            className="m-0 py-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Praesentium repellendus blanditiis nulla obcaecati est, animi, vitae
            rerum dolores delectus, soluta iusto perspiciatis nesciunt ex
            voluptas sapiente quaerat quia temporibus nam.... read more
          </p>
          <div className="d-flex gap-2 m-0 p-0 align-items-center">
            <b className="m-0 p-0">Courses:</b>
            <ul className="d-flex list-unstyled m-0 p-0 gap-3 align-items-center">
              <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                <BsCheck2Circle style={{ fontSize: "22px" }} />
                Course 1
              </li>
              <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                <BsCheck2Circle style={{ fontSize: "22px" }} />
                Course 2
              </li>
              <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                <BsCheck2Circle style={{ fontSize: "22px" }} />
                Course 3
              </li>
              <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                <BsCheck2Circle style={{ fontSize: "22px" }} />
                Course 4
              </li>
            </ul>
          </div>
          <div className="d-flex gap-2">
            <b>Fluent in:</b>
            <ul className="d-flex list-unstyled gap-2">
              <li>English</li>
              <li>Spanish</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detail View Modal */}
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="d-flex justify-content-between">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
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
                      <b className="m-0 p-0">John S.</b>
                      <div className="d-flex align-items-center gap-2">
                        <div className="mb-2">
                          <StarRatings
                            starRatedColor="#cc9338"
                            rating={4.2}
                            starDimension="20px"
                            starSpacing="0px"
                          />
                        </div>
                        <p className="m-0 p-0">Stars 4.2/5</p>
                      </div>
                      <button className="m-0 p-0 bg_secondary border-0 text-white p-2 rounded d-flex align-items-center gap-2">
                        <BiMessageAlt style={{ fontSize: "22px" }} />
                        Reviews
                      </button>
                      <p className="m-0 p-0 fw-bold">$30/hr</p>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <h5 className="m-0 pt-2">Call to action title</h5>
                      <div className="d-flex gap-2">
                        <button
                          className={`btn_primary py-2 px-3 fw-bold text-white rounded`}
                          type="submit"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Request Interview
                        </button>
                        <button
                          className={`btn_primary py-2 px-4 fw-bold text-white rounded`}
                          type="submit"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="my-2 p-3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Praesentium repellendus blanditiis nulla obcaecati est, animi,
                  vitae rerum dolores delectus, soluta iusto perspiciatis
                  nesciunt ex voluptas sapiente quaerat quia temporibus
                  nam.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Praesentium repellendus blanditiis nulla obcaecati est, animi,
                  vitae rerum dolores delectus, soluta iusto perspiciatis
                  nesciunt ex voluptas sapiente quaerat quia temporibus nam.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Praesentium repellendus blanditiis nulla obcaecati est, animi,
                  vitae rerum dolores delectus, soluta iusto perspiciatis
                  nesciunt ex voluptas sapiente quaerat quia temporibus
                  nam.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Praesentium repellendus blanditiis nulla obcaecati est, animi,
                  vitae rerum dolores delectus, soluta iusto perspiciatis
                  nesciunt ex voluptas sapiente quaerat quia temporibus nam.
                </p>

                <div className="d-flex gap-2 m-0 px-3 align-items-center">
                  <b className="m-0 p-0">Courses:</b>
                  <ul className="d-flex list-unstyled m-0 p-0 gap-3 align-items-center">
                    <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 1
                    </li>
                    <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 2
                    </li>
                    <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 3
                    </li>
                    <li className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2">
                      <BsCheck2Circle style={{ fontSize: "22px" }} />
                      Course 4
                    </li>
                  </ul>
                </div>
                <div className="d-flex gap-2  px-3 pt-2">
                  <b>Fluent in:</b>
                  <ul className="d-flex list-unstyled gap-2">
                    <li>English</li>
                    <li>Spanish</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews View Modal */}
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="d-flex justify-content-between">
                <h5 className="modal-title" id="exampleModalLabel1"></h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
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
                    <div className="d-flex gap-3 align-items-center ">
                      <b className="m-0 p-0">John S.</b>
                      <div className="d-flex align-items-center gap-2">
                        <div className="mb-2">
                          <StarRatings
                            starRatedColor="#cc9338"
                            rating={4.2}
                            starDimension="20px"
                            starSpacing="0px"
                          />
                        </div>
                        <p className="m-0 p-0">Stars 4.2/5</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-4 border my-2 shadow p-3 bg-white rounded">
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
                  <div>
                    <div className="d-flex align-items-center justify-content-between flex-1">
                      <b className="m-0 p-0">John B.</b>
                      <div className="d-flex align-items-center gap-2">
                        <div className="mb-2">
                          <StarRatings
                            starRatedColor="#cc9338"
                            rating={4.2}
                            starDimension="20px"
                            starSpacing="0px"
                          />
                        </div>
                        <p className="m-0 p-0">Stars 4.2/5</p>
                      </div>
                    </div>
                    <p className="m-0 py-2">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Praesentium repellendus blanditiis nulla obcaecati est,
                      animi, vitae rerum dolores delectus, voluptas sapiente
                      quaerat quia temporibus nam.... read more
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-4 border my-2 shadow p-3 bg-white rounded">
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
                  <div>
                    <div className="d-flex align-items-center justify-content-between flex-1">
                      <b className="m-0 p-0">John B.</b>
                      <div className="d-flex align-items-center gap-2">
                        <div className="mb-2">
                          <StarRatings
                            starRatedColor="#cc9338"
                            rating={4.2}
                            starDimension="20px"
                            starSpacing="0px"
                          />
                        </div>
                        <p className="m-0 p-0">Stars 4.2/5</p>
                      </div>
                    </div>
                    <p className="m-0 py-2">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Praesentium repellendus blanditiis nulla obcaecati est,
                      animi, vitae rerum dolores delectus, voluptas sapiente
                      quaerat quia temporibus nam.... read more
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center p-3">
                  <button
                    className={`btn_primary py-2 px-5 fw-bold text-white rounded`}
                    type="submit"
                  >
                    Select
                  </button>

                  <p className="m-0 p-0">Read more</p>
                  <button
                    className={`btn_primary py-2 px-2 fw-bold text-white rounded`}
                    type="submit"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Request Interview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorcard;
