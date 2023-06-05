import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import { useRouter } from "next/router";
import axios from "axios";

export default function StudentRegistrationCCInfo() {
  const navigation = useRouter();
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [nameCard, setNameCard] = useState("");
  const [numberCard, setNumberCard] = useState("");

  const onContinue = () => {
    console.log(userInfo);
  };

  const onRegister = async () => {
    console.log(userInfo);
    if (userType === "student") {
      try {
        const response = await axios.post(
          `http://34.227.65.157/auth/register-student`,
          {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
            address1: userInfo.address1,
            address2: userInfo.address2,
            country: userInfo.country,
            state: userInfo.state,
            city: userInfo.city,
            zipCode: userInfo.zipCode,
            savePaymentFutureUse: true,
            emailParent1: userInfo.emailParent1,
            emailParent2: userInfo.emailParent2,
            whoPaysEmail: userInfo.email,
            gradeId: userInfo.gradeId,
            courseOfInterestAndProficiency:
              userInfo.courseOfInterestAndProficiency,
            languagePreferencesId: userInfo.languagePreferencesId,
            timeZoneId: 'Asia/Karachi',
          }
        );
        window.localStorage.setItem("gkcAuth", JSON.stringify(response.data))
        console.log(response.data)
        window.localStorage.removeItem("registrationForm")
        window.localStorage.removeItem("userType")
        navigation.push("/");

      } catch (error) {
        console.error(error);
      }
    }
    if (userType === "parent") {
      try {
        const response = await axios.post(
          `http://34.227.65.157/auth/register-parent`,
          {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
            address1: userInfo.address1,
            address2: userInfo.address2,
            country: userInfo.country,
            state: userInfo.state,
            city: userInfo.city,
            zipCode: userInfo.zipCode,
            timeZoneId: 'Asia/Karachi',
            savePaymentFutureUse: true,
          }
        );
        window.localStorage.setItem("gkcAuth", JSON.stringify(response.data))
       console.log(response.data)
       window.localStorage.removeItem("registrationForm")
       window.localStorage.removeItem("userType")
      navigation.push("/parent");

      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    var stored = JSON.parse(window.localStorage.getItem("registrationForm"));
    var typ = JSON.parse(window.localStorage.getItem("userType"));
    setUserInfo(stored);
    setUserType(typ);
  }, []);

  return (
    <>
      <Head>
        <title>Auth | CC Info</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Navbar isLogin={true} />
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative  d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-100 w-md-75 p-5">
              <div>
                <h4 className="text-dark fw-bold">Who pays for tutoring?</h4>

                <div className="py-4">
                  <select className="w-25 p-2 rounded outline-0 border border_gray text_gray mb-3 ">
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <h4 className="text-dark fw-bold p-0 m-0 text-center">OR</h4>
                </div>

                <h4 className="text-dark fw-bold pb-2">
                  Add credit card information
                </h4>
                <input
                  type="text"
                  className="w-100 p-2 rounded outline-0 border border_gray text_gray  my-2"
                  placeholder="Name on Credit Card"
                  value=""
                />
                <input
                  type="text"
                  className="w-100 p-2 rounded outline-0 border border_gray text_gray  my-2"
                  placeholder="Credit Card Number"
                  value=""
                />

                <div className="d-flex gap-2 my-2">
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="CVV"
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="Expiration Date"
                  />
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Save the payment information for future use
                  </label>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    className="w-50 btn_primary text-light p-2 rounded fw-bold "
                    onClick={onContinue}
                  >
                    Continue
                  </button>
                </div>
                <div className="d-flex gap-2 justify-content-center  mt-3">
                  <button
                    className="w-50 btn_secondary text-light p-2 rounded fw-bold "
                    onClick={onRegister}
                  >
                    I wil do this later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
