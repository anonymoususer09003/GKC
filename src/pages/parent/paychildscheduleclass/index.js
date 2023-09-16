import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import { ParentNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { BsFillSendFill } from "react-icons/bs";
import { FaFileVideo } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { BsCheck2Circle, BsFillCameraVideoFill } from "react-icons/bs";
import {useRouter} from "next/router"
import { withRole } from '../../../utils/withAuthorization';

import { BiMessageAlt } from "react-icons/bi";

function ParentPayScheduleClass() {
  //protection starts
  const nav = useRouter()
  // checking if user logged in starts
  if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
    console.log('lol')
    useEffect(()=>{

      if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
        nav.push('/') 
      } else{
        if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Parent') { //here we check if user has role Parent
          nav.push('/')
        }
      }

    },[])
  }
  // checking if user logged in ends

  //protection ends

  const [value, onChange] = useState(new Date());
  const navigation = useRouter();

  return (
    <>
      <Head>
        <title>Parent Pay Schedule Class</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
        <ParentNavbar isLogin={true} />
      <main className="container-fluid">
      <div
          className="row"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12 col-lg-6 pt-5">
          <p className="fw-bold text-center">Schedule class with John Doe</p>
            <Calendar onChange={onChange} value={value} />
          </div>
          <div className="col-12 col-lg-6 pt-5">

          <p className="fw-bold text-center"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal">View Profile for John Doe</p>
            <div className="shadow rounded py-5">
              <div
                className="d-flex flex-sm-nowrap flex-wrap justify-content-between gap-4 px-5"
                style={{ minHeight: "400px" }}
              >
                <div className="w-100 ">
                  <p className="p-0 m-0 fw-bold pb-2">Select time</p>
                  <div className="border rounded">
                    <p className="p-0 m-0 py-1 fw-bold bg-light p-2  px-3">
                      7:00 am
                    </p>
                    <p className="p-0 m-0 py-1 fw-bold bg-light p-2  px-3">
                      8:00 am
                    </p>
                    <p className="p-0 m-0 py-1 fw-bold p-2  px-3">9:00 am</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p className="p-0 m-0 py-1 fw-bold p-2  px-3">4:00 pm</p>
                    <p className="p-0 m-0 py-1 fw-bold p-2  px-3">5:00 pm</p>
                  </div>
                </div>
                <div className=" w-100">


                <p className="p-0 m-0 fw-bold text-center py-2">
                    Your dependent's information
                  </p>
                  <h6 className="text-dark fw-bold">
                    You selected 2 hours slot
                  </h6>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      On behalf of:
                    </h6>

                    <h6 className="text-dark fw-bold">David Gibbs</h6>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      Course:
                    </h6>

                    <h6 className="text-dark fw-bold">Course 1</h6>
                  </div>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      Frequency:
                    </h6>
                    <h6 className="text-dark fw-bold">
                      Weekly &#40;Tue, Fri&#41;
                    </h6>
                  </div>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      Mode:
                    </h6>
                    <h6 className="text-dark fw-bold">Online</h6>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      Skills:
                    </h6>
                    <h6 className="text-dark fw-bold">Intermediate</h6>
                  </div>
                  <div className="d-flex align-items-center gap-3 py-2">
                    <h6 className="text-dark fw-bold p-0 m-0 flex-fill">
                      Grade:
                    </h6>
                    <div>
                      <h6 className="text-dark fw-bold m-0 p-0">
                        Middle School
                      </h6>
                      <h6 className="text-dark fw-bold m-0 p-0">
                        &#40;12yrs - 14yrs&#41;
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center pt-5">
                <button className="w-25 btn_primary text-light p-2 rounded fw-bold " onClick={()=>navigation.push("/parent/ccpayment")}>
                  Approve
                </button>
              </div>
            </div>
          </div>
          </div>
        

       
      </main>
<Footer />


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
                <div className="d-flex flex-column flex-md-row align-items-center gap-3">
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
                    <div className="d-flex flex-wrap justify-content-between align-items-center ">
                      <h5 className="m-0 p-0">John S.</h5>
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
                      <h5 className="m-0 p-0 fw-bold">$30/hr</h5>
                    </div>
                    <div className="d-flex gap-4  pt-2">
                      <div>
                        <FaFileVideo
                          style={{ fontSize: "40px", color: "#006600" }}
                        />
                      </div>
                      <h5 className="m-0 pt-2">Call to action title</h5>
                    </div>
                  </div>
                </div>
                <p className="my-2 p-0 p-md-3 small">
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
                  <ul className="d-flex flex-wrap list-unstyled m-0 p-0 gap-1 align-items-center">
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
                <div className="d-flex gap-2  px-3 pt-2 align-items-center">
                  <b className="m-0 p-0">Mode:</b>
                  <ul className="d-flex list-unstyled m-0 p-0">
                    <li className="m-0 p-0">Online In-Persion</li>
                  </ul>
                </div>
                <div className="d-flex gap-2  px-3 pt-2">
                  <b>Speaks:</b>
                  <ul className="d-flex list-unstyled gap-2">
                    <li>English</li>
                    <li>Spanish</li>
                  </ul>
                </div>
                <div className="d-flex flex-wrap flex-column flex-md-row justify-content-center gap-4 p-0 px-3">
                  <button
                    className={` btn_primary py-2 px-3 fw-bold text-white rounded`}
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
        </div>
      </div>
    </>
  );
}
export default withRole(ParentPayScheduleClass, ['Parent']);
