import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Footer } from '../../../components';
import { BsCheck2Circle } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { RiArrowGoBackLine } from 'react-icons/ri';
import axios from 'axios';
import styles from '../../../styles/Home.module.css';
import { base_url } from '../../../api/client';
export default function RegisterStudent() {
  const router = useRouter();
  const navigation = useRouter();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [guardianEmail1, setGuardianEmail1] = useState('');
  const [guardianEmail2, setGuardianEmail2] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [guardian1Exists, setGuardian1Exists] = useState(true);
  const [guardian2Exists, setGuardian2Exists] = useState(true);

  let isValidForm =
    (guardianEmail1.length == 0 || guardian1Exists) &&
    (guardianEmail2.length == 0 || guardian2Exists) &&
    country &&
    state &&
    city &&
    zipCode;

  const onContinue = () => {
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
    console.log(stored);
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    stored.email = email;
    stored.firstName = firstname;
    stored.lastName = lastname;
    stored.password = password;
    // stored.emailParent1 =
    //   guardianEmail1.length > 0 && guardian1Exists ? guardianEmail1 : null;
    // stored.emailParent2 =
    //   guardianEmail2.length > 0 && guardian2Exists ? guardianEmail2 : null;
    stored.emailParent1 = guardianEmail1;
    stored.emailParent2 = guardianEmail2;
    stored.address1 = address1;
    stored.address2 = address2;
    stored.country = country;
    stored.state = state;
    stored.city = city;
    stored.zipCode = zipCode;
    stored.whoPaysEmail = email;
    stored.savePaymentFutureUse = false;
    stored.timeZoneId = timezone;

    window.localStorage.setItem('registrationForm', JSON.stringify(stored));
    if (password == confirmPassword) {
      navigation.push('/auth/registrationgrade');
    } else {
      alert('password not matched');
    }
  };

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/location/get-countries`
      );
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getStates = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/location/get-states?countryName=${country}`
      );
      setStates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfGuardian1Exists = async () => {
    try {
      const res = await axios.get(
        `${base_url}/public/register/is-parent-registered?parentEmail=${guardianEmail1}`,
        {}
      );
      setGuardian1Exists(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfGuardian2Exists = async () => {
    try {
      const res = await axios.get(
        `${base_url}/public/register/is-parent-registered?parentEmail=${guardianEmail2}`,
        {}
      );
      setGuardian2Exists(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    try {
      const response = await axios.get(
        `${base_url}/public/location/get-cities?countryName=${country}&stateName=${state}`
      );
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const value = window.localStorage.getItem('userType');
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
    setEmail(stored?.email);
    setUserType(value);
    getCountries();
  }, []);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      getStates();
    }
  }, [country]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      getCities();
    }
  }, [state]);

  const handleBack = () => {
    router.push('/auth/registerstudent');
  };
  return (
    <>
      <Head>
        <title>Auth | Student Registration</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <div
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          onClick={()=>navigation.back()}
          style={{cursor:'pointer'}}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </div>
        <div className="row">
          <div
            className="col-12 col-lg-6 position-relative  d-none d-md-block "
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          ></div>
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div className="w-100 w-md-75 p-5">
              <div>
                <div
                  className={`d-flex justify-content-between align-items-center mb-3 ${styles.studentEmailWrapper}`}
                >
                  <h4 className="text-secondary fw-bold text-capitalize">
                    Student
                  </h4>
                  <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <BsCheck2Circle style={{ fontSize: '22px' }} />
                    {email}
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray"
                    placeholder="Enter Parent/Guardian 1 Email"
                    value={guardianEmail1}
                    name="guardian1"
                    onChange={(e) => setGuardianEmail1(e.target.value)}
                    onBlur={checkIfGuardian1Exists}
                  />
                  {!guardian1Exists && guardianEmail1.length > 0 ? (
                    <p className="tw-text-red-600">
                      Parent email doesn't exist
                    </p>
                  ) : (
                    ''
                  )}
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray mt-3  "
                    placeholder="Enter Parent/Guardian 2 Email"
                    value={guardianEmail2}
                    name="guardian3"
                    onChange={(e) => setGuardianEmail2(e.target.value)}
                    onBlur={checkIfGuardian2Exists}
                  />
                  {!guardian2Exists && guardianEmail2.length > 0 ? (
                    <p className="tw-text-red-600">
                      Parent email doesn't exist
                    </p>
                  ) : (
                    ''
                  )}
                  <div className="py-2">
                    <label className=" m-0 mb-3">
                      This is to link your account to your parent/guardian
                    </label>
                    <br />
                  </div>{' '}
                  <div className="d-flex   flex-md-nowrap flex-wrap gap-2">
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="First Name"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Last Name"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Address 1"
                    name="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Address 2"
                    name="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  <div className="d-flex   flex-md-nowrap flex-wrap gap-2">
                    <select
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-100 p-2 rounded outline-0 border border_gray  mb-3 "
                    >
                      <option value="">Select Country</option>
                      {countries.map((v, i) => {
                        return (
                          <option value={v.name} key={i}>
                            {v.name}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      onChange={(e) => setState(e.target.value)}
                      className="w-100 p-2 rounded outline-0 border border_gray  mb-3 "
                    >
                      <option value="">Select State</option>
                      {states.map((v, i) => {
                        return (
                          <option value={v.name} key={i}>
                            {v.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="d-flex flex-md-nowrap flex-wrap gap-2">
                    <select
                      onChange={(e) => setCity(e.target.value)}
                      className="w-100 p-2 rounded outline-0 border border_gray  mb-3"
                    >
                      <option value="student">Select City</option>
                      {cities.map((v, i) => {
                        return (
                          <option value={v.name} key={i}>
                            {v.name}
                          </option>
                        );
                      })}
                    </select>
                    <input
                      type="text"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Zip"
                      name="zip"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  {/* <div className="d-flex  flex-md-nowrap flex-wrap gap-2">
                    <input
                      type="password"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div> */}
                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={termsAgree}
                      id="flexCheckDefault"
                      onChange={() => setTermsAgree(!termsAgree)}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      I agree to the{' '}
                      <Link
                        href="/terms-of-use"
                        className="fw-bold no-underline hover:text_secondary text_secondary"
                      >
                        {' '}
                        Terms of Use
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privicy-policy"
                        className="fw-bold no-underline hover:text_secondary text_secondary"
                      >
                        {' '}
                        Privacy Policy{' '}
                      </Link>{' '}
                      of GeekKidsCode.com
                    </label>
                  </div> */}
                  <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mt-3">
                    <button
                      className={`w-50 text-light p-2 rounded fw-bold  bg-gray-300 ${
                        !isValidForm ? 'btn_disabled' : 'btn_primary'
                      }`}
                      disabled={!isValidForm}
                      onClick={onContinue}
                    >
                      Continue
                    </button>
                    <Link
                      href="/auth/signin"
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
