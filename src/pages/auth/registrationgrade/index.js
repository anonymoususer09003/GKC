import React, {useState, useeEffect} from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import {useRouter} from "next/router"
import { RiArrowGoBackLine } from "react-icons/ri";
import Link from "next/link"
export default function RegistrationGrade() {
  const [grade, setGrade] = useState(null)
  const navigation = useRouter();
  const onContinue = () => {
    var stored = JSON.parse(window.localStorage.getItem("registrationForm"));
    stored.gradeId = Number(grade);
    window.localStorage.setItem("registrationForm", JSON.stringify(stored));
    navigation.push("/auth/registrationcourse")
  }

  
  return (
    <>
      <Head>
        <title>Auth | Registration Course</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid">
      <Link
          href="#"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </Link>
        <div className="py-5 ">
          <h5 className="text-secondary fw-bold text-center py-4">
            Tell us about yourself?
          </h5>

          <div
            className=" d-flex flex-wrap justify-content-center m-auto gap-4 py-5"
            style={{ maxWidth: "700px" }}
          >
            <div
              style={{
                backgroundImage: 'url("/assets/5_plus.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                width: "240px",
                height: "240px",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <input
value="0"
                className="form-check-input position-absolute"
                style={{ top: "5px", right: "5px" }}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={grade == 0}
              onChange={(e)=> setGrade(e.target.value)}
              />
              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-50 fw-bold">
                <small className="text-secondary">
                  Elementry &#40;&#60;10yrs&#41;
                </small>
              </div>
            </div>
            <div
              style={{
                backgroundImage: 'url("/assets/10_plus.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                width: "240px",
                height: "240px",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <input
value={1}
                className="form-check-input position-absolute"
                style={{ top: "5px", right: "5px" }}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={grade == 1}
              onChange={(e)=> setGrade(e.target.value)}
              />

              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-50 fw-bold">
                <small className="text-secondary">
                  Middle School &#40;&#60;11yrs - 13yrs&#41;
                </small>
              </div>
            </div>

            <div
              style={{
                backgroundImage: 'url("/assets/14_plus.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                width: "240px",
                height: "240px",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <input
value="2"
                className="form-check-input position-absolute"
                style={{ top: "5px", right: "5px" }}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={grade == 2}
              onChange={(e)=> setGrade(e.target.value)}
              />

              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-50 fw-bold">
                <small className="text-secondary">
                  High School &#40;&#60;14yrs - 18yrs&#41;
                </small>
              </div>
            </div>

            <div
              style={{
                backgroundImage: 'url("/assets/18_plus.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                width: "240px",
                height: "240px",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <input
value="3"
                className="form-check-input position-absolute"
                style={{ top: "5px", right: "5px" }}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={grade == 3}
              onChange={(e)=> setGrade(e.target.value)}
              />

              <div className="position-absolute bottom-0 p-2 bg-light w-100 bg-opacity-50 fw-bold">
                <small className="text-secondary">
                  College & Beyond &#40;&gt;18yrs&#41;
                </small>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-3">
            <button 
              className={`text-light p-2 px-5 rounded fw-bold  bg-gray-300 ${!grade ? 'btn_disabled' : 'btn_primary'}`}
              disabled={!grade}
              onClick={onContinue}
             >
              Continue
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
