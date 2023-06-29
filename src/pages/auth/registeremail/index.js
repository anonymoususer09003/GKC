import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../../components";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const navigation = useRouter();
  const [email, setEmail] = useState("");

  const isEmailValid = ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
  const handleSubmit = async () => {
    
    try {
      const response = await axios.get(`http://34.227.65.157/auth/code?email=${email}`);
      console.log(response)
        if (email) {
          window.localStorage.setItem(
            "registrationForm",
            JSON.stringify({
              email,
            })
          );
          navigation.push("/auth/activatecode");
        }

    } catch (error) {
      console.error(error);
    }
  
  };
  return (
    <>
      <Head>
        <title>Auth | Register Email</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Link
          href="/"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back to home</p>
        </Link>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div style={{ maxWidth: "380px", width: "100%" }}>
              <div className="d-flex justify-content-center mb-5">
                <Image
                  src="https://gkc-images.s3.amazonaws.com/logo.png"
                  alt="Vercel Logo"
                  className=""
                  width={100}
                  height={50}
                  priority
                />
              </div>
              <div>
                <div className="d-flex justify-content-center mb-3">
                  <h4 className="text-secondary fw-bold">
                    Register Your Email
                  </h4>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Your Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button
                    className={`w-100 text-light p-2 rounded fw-bold mt-3 bg-gray-300 ${!isEmailValid ? 'btn_disabled' : 'btn_primary'}`}
                    disabled={!isEmailValid}
                    onClick={() => handleSubmit()}
                  >
                    Continue
                  </button>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <hr className="w-25" />
                  <button className="w-50 btn_secondary text-light p-2 rounded fw-bold ">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 position-relative d-none d-md-block"
            style={{
              backgroundImage: 'url("/assets/auth_2.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div style={{ position: "absolute", right: "0%", bottom: "7%" }}>
              <Image
                src="/assets/auth_girl_1.png"
                alt="Vercel Logo"
                className=""
                width={400}
                height={600}
                priority
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
