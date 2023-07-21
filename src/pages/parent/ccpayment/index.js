import React, { useState } from "react";
import Head from "next/head";
import { ParentNavbar, Footer } from "../../../components";
import { useRouter } from "next/router";
import PaymentForm from "@/components/stripe/PaymentForm";
import { withRole } from "../../../utils/withAuthorization";
import { useSelector } from "react-redux";

function CCPayment() {
  const navigation = useRouter();
  const [isCardValid, setIsCardValid] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [nameCard, setNameCard] = useState("");
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const [whoPaysId, setWhoPaysId] = useState("");
  const [savePaymentFutureUse, setSavePaymentFutureUse] = useState(true);
  const handleValueReceived = (value) => {
    setNameCard(value);
    // Do something with the value in the parent component
  };
  const handlePaymentRequest = (data) => {
    if (data.status === "succeeded") {
      scheduleSaved(data);
    } else {
      alert("Payment Failed");
    }
    setPaymentStatus(data.status);
    setConfirmPayment(false);
  };
  return (
    <>
      <Head>
        <title>Parent CC Info</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid">
        <ParentNavbar isLogin={true} />
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-75 p-5">
              <div>
                <h5 className="text-dark fw-bold">Credit Card Information</h5>

                <div className="py-2">
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Hourly Rate:</p>
                    <p className="p-0 m-0 fw-bold">$30</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">No. of Hours:</p>
                    <p className="p-0 m-0 fw-bold">2</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Booking Fee:</p>
                    <p className="p-0 m-0 fw-bold">$3</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Total Due:</p>
                    <p className="p-0 m-0 fw-bold">$63</p>
                  </div>
                </div>

                <div className="py-5 d-flex align-items-center">
                  <h5 className="text-dark fw-bold m-0 p-0 flex-fill">
                    Use saved Credit Card?
                  </h5>

                  <select className="w-25 flex-fill p-2 rounded outline-0 border border_gray  ">
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
                <h5 className="text-dark fw-bold text-center">OR</h5>

                <div className="form-check">
                  <div className="w-100 w-md-75 p-5">
                    <PaymentForm
                      title="Enter new credit card information"
                      onValueReceived={handleValueReceived}
                      onPay={confirmPayment}
                      userInfo={userInfo}
                      // data={{ instructorId, durationInHours, whoPaysId }}
                      data={{}}
                      onPaymentRequest={handlePaymentRequest}
                      oneTimePayment={true}
                      savePaymentFutureUse={savePaymentFutureUse}
                      setIsCardValid={setIsCardValid}
                    />
                  </div>

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
                    className={`w-25 btn_primary text-light p-2 rounded fw-bold bg-gray-300 ${
                      !nameCard || !isCardValid ? "btn_disabled" : "btn_primary"
                    }`}
                    disabled={!nameCard || !isCardValid}
                    onClick={handlePaymentRequest}
                  >
                    Pay
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

export default withRole(CCPayment, ["Parent"]);
