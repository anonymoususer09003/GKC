import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Footer } from '../../../components';
import { BsCheck2Circle } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { RiArrowGoBackLine } from 'react-icons/ri';
import axios from 'axios';
import { apiClient, base_url } from '../../../api/client';
import styles from '../../../styles/Home.module.css';
import { BsPersonCircle } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { saveImage } from '@/store/actions/filesActions';
import { CountryCodes } from '@/utils/countryCodes';
import { useScreenSize } from '@/hooks/mobile-devices';
export default function RegisterInstructor() {
  const navigation = useRouter();
  const { isLargeScreen } = useScreenSize();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const dispatch = useDispatch();
  const [isImageTooLarge, setIsImageTooLarge] = useState(false);
  const [err, setErr] = useState('');

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];

    const selectedFileSizeInBytes = selectedFile.size;
    const fileSizeInKB = selectedFileSizeInBytes / 1024;

    if (fileSizeInKB > 200) {
      setIsImageTooLarge(true);
      return;
    } else {
      setIsImageTooLarge(false);
    }

    const file = new FormData();
    file.append('file', selectedFile);
    try {
      const response = await apiClient.post(
        '/aws/upload-instructor-photo',
        file,
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  let isValidForm =
    email &&
    firstName &&
    lastName &&
    address1 &&
    country &&
    state &&
    city &&
    zipCode;

  const onContinue = () => {
    if (password == confirmPassword) {
      var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let dial_code = CountryCodes.find(
        (item) => item.name === country
      ).dial_code;
      console.log('stor', stored);
      stored.phoneNumber = dial_code + '-' + phoneNumber;
      stored.email = email;
      stored.firstName = firstName;
      stored.lastName = lastName;
      stored.password = password;
      stored.address1 = address1;
      stored.address2 = address2;
      stored.country = country;
      stored.state = state;
      stored.city = city;
      stored.zipCode = zipCode;
      stored.savePaymentFutureUse = true;
      stored.timeZoneId = timezone;

      window.localStorage.setItem('registrationForm', JSON.stringify(stored));
      navigation.push('/auth/registrationmore');
    } else {
      setErr('Password and new password mismatch');
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
    const value = JSON.parse(window.localStorage.getItem('userType'));
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
  return (
    <>
      <Head>
        <title>Auth | Instructor Registration</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <div
          onClick={() => navigation.back()}
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          style={{ cursor: 'pointer' }}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </div>
        <div className="row">
          <div
            className="col-12 tw-my-auto col-lg-6 position-relative d-none d-md-block "
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: '110vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          ></div>
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div className="w-100 w-md-75 p-5">
              <div>
                <div className="d-flex flex-column w-75 justify-content-center align-items-center mb-5">
                  {image ? (
                    <img
                      src={image}
                      style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '50%',
                      }}
                      className="tw-object-fit-cover"
                    />
                  ) : (
                    <BsPersonCircle
                      style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                  <label
                    for="files"
                    style={{ width: '120px', backgroundColor: '#f48342' }}
                    className="mx-auto p-2 mt-2 tw-rounded-lg text-center"
                  >
                    Upload image
                  </label>
                  <input
                    accept="image/*"
                    className="mt-3"
                    id="files"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={(e) => {
                      handleImageUpload(e);
                      setImage(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {isImageTooLarge && (
                    <p className="tw-text-center tw-text-[15px] tw-w-full tw-text-red-500 tw-font-sm">
                      Max allowed size is 200KB
                    </p>
                  )}
                </div>
                <div
                  className={`d-flex justify-content-between align-items-center mb-3 ${styles.intructorTitle}`}
                >
                  <h4 className="text-secondary fw-bold text-capitalize">
                    Instructor
                  </h4>
                  <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <BsCheck2Circle style={{ fontSize: '22px' }} />
                    {email}
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="First Name"
                    name="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Last Name"
                    name="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Address 1"
                    value={address1}
                    name="address1"
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-100 p-2 rounded outline-0 border border_gray   mb-3"
                    placeholder="Address 2"
                    value={address2}
                    name="address2"
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

                  <div className="d-flex   flex-md-nowrap flex-wrap gap-2">
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
                      placeholder="Zip/Post Code"
                      name="zip"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="text"
                        style={{ width: '22%', marginRight: 10 }}
                        className="p-2 rounded outline-0 border border_gray   mb-3"
                        placeholder="CountryCode"
                        name="countryCode"
                        value={
                          country
                            ? CountryCodes.find((item) => item.name === country)
                                .dial_code
                            : ''
                        }
                        readOnly
                      />
                      <input
                        type="text"
                        style={{ width: !isLargeScreen ? '100%' : '73%' }}
                        className=" p-2 rounded outline-0 border border_gray   mb-3"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    {isLargeScreen && (
                      <div
                        style={{
                          width: '50%',
                          // border: '1px solid black',
                          height: '50px',
                        }}
                      />
                    )}
                  </div>
                  <div className="d-flex flex-wrap gap-2 justify-content-between mt-3">
                    <button
                      className={`w-50 text-light p-2 rounded fw-bold  bg-gray-300 ${
                        isValidForm ? 'btn_primary' : 'btn_disabled'
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
                      <p className="fw-bold text_secondary">Login</p>
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
