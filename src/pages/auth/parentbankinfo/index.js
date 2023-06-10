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
  const [nameCard, setNameCard] = useState("");
  const [numberCard, setNumberCard] = useState("");

  const onContinue = () => {
    console.log(userInfo);
  };

  const onRegister = async () => {
    console.log(userInfo);
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
      const res = await axios.get(
        "http://34.227.65.157/user/logged-user-role",
        {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        }
      );
      console.log(res.data);
      window.localStorage.setItem("gkcAuth", JSON.stringify({accessToken: response.data.accessToken, role: res.data.name}));   
     console.log(response.data)
    navigation.push("/parent");

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    var stored = JSON.parse(window.localStorage.getItem("registrationForm"));
    var typ = JSON.parse(window.localStorage.getItem("userType"));
    setUserInfo(stored);
    setUserType(typ);
  }, []);


  const handleValueReceived = (value) => {
    setNameCard(value);
    // Do something with the value in the parent component
  };

  return (
    <>
      <Head>
        <title>Auth | Parent Bank Info</title>
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
  
                <PaymentForm title={" Add credit card information"}  onValueReceived={handleValueReceived}/>
          
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    onClick={onRegister}
                    className={`w-50 text-light p-2 px-5 rounded fw-bold  bg-gray-300 ${!nameCard ? 'btn_disabled' : 'btn_primary'}`}

                    disabled={!nameCard}
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