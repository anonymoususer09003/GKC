import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import { useRouter } from "next/router";
import axios from "axios";
import PaymentForm from "@/components/stripe/PaymentForm";

export default function StudentRegistrationCCInfo() {
  const navigation = useRouter();
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [savePaymentFutureUse, setSavePaymentFutureUse] = useState(false);

  const onRegister = async ({ getPayment }) => {
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
          savePaymentFutureUse,
          emailParent1: userInfo.emailParent1,
          emailParent2: userInfo.emailParent2,
          whoPaysEmail: selectedParent || userInfo.emailParent1,
          gradeId: userInfo.gradeId,
          courseOfInterestAndProficiency:
            userInfo.courseOfInterestAndProficiency,
          languagePreferencesId: userInfo.languagePreferencesId,
          timeZoneId: "Asia/Karachi",
        }
      );

      if (getPayment && selectedParent == "") {
        setConfirmPayment(true);
        window.localStorage.setItem("gkcAuth", JSON.stringify(response.data));
      } else {
        window.localStorage.removeItem("registrationForm");
        window.localStorage.removeItem("userType");
        navigation.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    var stored = JSON.parse(window.localStorage.getItem("registrationForm"));
    console.log("storeed", stored);
    var typ = JSON.parse(window.localStorage.getItem("userType"));
    setUserInfo(stored);
    setUserType(typ);

    const arr = [];
    [stored?.emailParent1, stored?.emailParent1].map((v) => {
      if (v) {
        arr.push(v);
      }
    });

    setParents(arr);
  }, []);
  const handlePaymentRequest = (status) => {
    window.localStorage.removeItem("registrationForm");
    window.localStorage.removeItem("userType");
    navigation.push("/");
  };
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
                  <select
                    className="w-25 p-2 rounded outline-0 border border_gray  mb-3 "
                    onChange={(e) =>
                      setSelectedParent(
                        e.target.value == "Select" ? "" : e.target.value
                      )
                    }
                    value={selectedParent}
                  >
                    <option>Select</option>
                    {parents.map((v, i) => {
                      return (
                        <option value={v} key={i}>
                          {v}
                        </option>
                      );
                    })}
                  </select>
                  <h4 className="text-dark fw-bold p-0 m-0 text-center">OR</h4>
                </div>

                <PaymentForm
                  onValueReceived={() => {}}
                  title={" Add credit card information"}
                  onPay={confirmPayment}
                  userInfo={userInfo}
                  onPaymentRequest={handlePaymentRequest}
                  disabled={selectedParent != "" ? true : false}
                />
                <div className="form-check">
                  <input
                    disabled={selectedParent != "" ? true : false}
                    className="form-check-input"
                    type="checkbox"
                    value={savePaymentFutureUse}
                    id="flexCheckDefault"
                    onChange={(e) => setSavePaymentFutureUse(e.target.checked)}
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Save the payment information for future use
                  </label>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    className="w-50 btn_primary text-light p-2 rounded fw-bold "
                    onClick={() => onRegister({ getPayment: true })}
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
