import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../../components";
import { BsCheck2Circle } from "react-icons/bs";
import { useRouter } from "next/router";
import { RiArrowGoBackLine } from "react-icons/ri";
export default function RegisterStudent() {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgree, setTermsAgree] = useState(false);
  const navigation = useRouter();

  const onContinue = () => {
    // window.localStorage.setItem("userType", JSON.stringify(email));
    window.localStorage.setItem("gkcAuth", JSON.stringify(true));

    var stored = JSON.parse(window.localStorage.getItem("registrationForm"));
    console.log(stored);
    stored.email = email;
    stored.firstname = firstname;
    stored.lastname = lastname;
    stored.password = password;
    stored.address1 = address1;
    stored.address2 = address2;
    stored.city = city;
    stored.zip = zip;
    console.log(stored);

    window.localStorage.setItem("registrationForm", JSON.stringify(stored));

    if (password == confirmPassword) {
        navigation.push("/auth/registrationmore");
    } else {
      alert("password not matched");
    }
  };

  useEffect(() => {
    const value = JSON.parse(window.localStorage.getItem("userType"));
    var stored = JSON.parse(window.localStorage.getItem("registrationForm"));
    setEmail(stored.email);
    setUserType(value);
  }, []);
  return (
    <>
      <Head>
        <title>Auth | Instructor Registration</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Link
          href="#"
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </Link>
        <div className="row">
          <div
            className="col-12 col-lg-6 position-relative  d-none d-md-block "
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div className="w-100 w-md-75 p-5">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-secondary fw-bold text-capitalize">
                    Instructor
                  </h4>
                  <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <BsCheck2Circle style={{ fontSize: "22px" }} />
                    {email}
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="First Name"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="Address 1"
                    value={address1}
                    name="address1"
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                    placeholder="Address 2"
                    value={address2}
                    name="address2"
                    onChange={(e) => setAddress2(e.target.value)}
                  />

                  <div className="d-flex   flex-md-nowrap flex-wrap gap-2">
                  <select onChange={(e)=> setCountry(e.target.value) } className="w-100 p-2 rounded outline-0 border border_gray text_gray mb-3 ">
                    <option value="">Country</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                  </select>

                  <select onChange={(e)=> setStateName(e.target.value) } className="w-100 p-2 rounded outline-0 border border_gray text_gray mb-3 ">
                    <option value="">State/Province/Region</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                  </select>
                  </div>

                  <div className="d-flex   flex-md-nowrap flex-wrap gap-2">
                  <select onChange={(e)=> setCity(e.target.value) } className="w-100 p-2 rounded outline-0 border border_gray text_gray mb-3 ">
                    <option value="">City</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                  </select>
                  <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                      placeholder="Zip/Post Code"
                      name="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                  <div className="d-flex  flex-md-nowrap flex-wrap gap-2">
                    <input
                      type="password"
                      className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={termsAgree}
                      id="flexCheckDefault"
                      onChange={() => setTermsAgree(!termsAgree)}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      I agree to the Terms of Use and Privacy Policy of GKC
                    </label>
                  </div>
                  <div className="d-flex flex-wrap gap-2 justify-content-between mt-3">
                    <button
                      className="w-50 btn_primary text-light p-2 rounded fw-bold "
                      onClick={onContinue}
                    >
                      Continue
                    </button>
                    <Link
                      href="/"
                      className="text-decoration-none d-flex gap-2 justify-content-center"
                    >
                      <p className="text-secondary fw-bold">
                        Already have an Account?
                      </p>
                      <p className="fw-bold text_secondary">login</p>
                    </Link>
                  </div>
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
