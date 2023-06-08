import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Footer } from "../../../components";
import { useRouter } from "next/router";
import axios from "axios";
export default function SignIn() {
  const navigation = useRouter();
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onContinue = () => {
    // console.log(userType)
    // window.localStorage.setItem("userType", JSON.stringify(userType))
    // window.localStorage.setItem("gkcAuth", JSON.stringify(true))
    // if(userType === "student"){
    //   navigation.push("/")
    // }
    // if(userType === "parent"){
    //   navigation.push("/parent")
    // }
    // if(userType === "instructor"){
    //   navigation.push("/instructor")
    // }
  };

  const onLogin = async () => {
    console.log(email, password);
    try {
      const response = await axios.post(`http://34.227.65.157/auth/login`, {
        email: email,
        password: password,
      });
      console.log(response.data.accessToken);
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
      if (res.data.name === "Student") {
        navigation.push("/");
      }

      if (res.data.name === "Instructor") {
        navigation.push("/instructor");
      }

      if (res.data.name === "Parent") {
        navigation.push("/parent");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Head>
        <title>Auth | Sign In</title>
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
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-4 ">
            <div style={{ maxWidth: "400px", width: "100%" }}>
              {/* <h1 className="text-center mb-5">GSK</h1> */}
              <div className="d-flex justify-content-center mb-5">
                <Image
                  src="/assets/logo.png"
                  alt="Vercel Logo"
                  className=""
                  width={100}
                  height={50}
                  priority
                />
              </div>
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <h4 className="text-secondary fw-bold">Sign In</h4>
                  <Link
                    href="/auth/forgotpassword"
                    className="text-decoration-none d-flex gap-2"
                  >
                    <p className="fw-bold text_secondary">Forgot Password?</p>
                  </Link>
                </div>
                <div>
                  {/* <select onChange={(e)=> setUserType(e.target.value) } className="w-100 p-2 rounded outline-0 border border_gray text_gray mb-3 ">
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="instructor">Instructor</option>
                  </select> */}
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray mb-3"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="w-100 btn_primary text-light p-2 rounded fw-bold mt-3"
                    onClick={onLogin}
                  >
                    Sign In
                  </button>
                </div>
                <Link
                  href="/auth/selection"
                  className="text-decoration-none d-flex gap-2 justify-content-center py-3"
                >
                  <p className="text-secondary fw-bold">Not yet Register?</p>
                  <p className="fw-bold text_secondary">Create account?</p>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 position-relative d-none d-md-block"
            style={{
              backgroundImage: 'url("/assets/auth_2.png")',
              height: "90vh",
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
