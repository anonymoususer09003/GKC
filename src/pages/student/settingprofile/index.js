import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import { MdEmail, MdArrowForwardIos } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/router";
import { withRole } from '../../../utils/withAuthorization';
import axios from 'axios'

function SettingProfle() {
const navigation = useRouter();
const onEditProfile = () => {
  navigation.push("/student/editprofile")
}


const [profile, setProfile] = useState({});

useEffect(() => {
  const fetchProfileData = async () => {
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
    const res = await axios.get("http://34.227.65.157/user/logged-user-details", {
      headers: {
        Authorization: `Bearer ${typ.accessToken}`,
      },
    });
    console.log(res.data);
    setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  fetchProfileData();
}, []);
  return (
    <>
      <Head>
        <title>Profile Setting Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div
          className="p-5 "
          style={{ minHeight: "90vh", maxWidth: "1700px", margin: "auto" }}
        >
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="shadow rounded-10 bg-white py-4">
                <div className="px-4">
                  <h5 className="fw-bold py-3">{profile.firstName} {profile.lastName}</h5>

                  <p className="w-75 bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                    <MdEmail style={{ fontSize: "22px" }} />
                    {profile.email}
                  </p>

                  <p className="p-0 m-0 py-2 fw-bold">Parent1/guardian1</p>
                  <div className="d-flex gap-1 align-items-center gap-2 pb-3 ">
                    <MdEmail className="h5 p-0 m-0" />
                    guardian1@123.com
                  </div>
                  <p className="p-0 m-0 py-2 fw-bold">Parent2/guardian2</p>

                  <div className="d-flex gap-1 align-items-center gap-2 pb-3 ">
                    <MdEmail className="h5 p-0 m-0" />
                    guardian2@123.com
                  </div>
                  <hr className="bg_secondary" />

                  <div></div>

                  <div className="d-flex gap-2 justify-content-center py-3">
                    <button className="w-50 btn_primary text-light p-2 rounded fw-bold d-flex align-items-center justify-content-center gap-2" onClick={() => onEditProfile()}>
                      <FiEdit /> Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 py-2">
              <div className="shadow rounded-10 p-5 bg-white">
                <div className="row">
                  <div className="col">
                    <h4 className="fw-bold">Grade:</h4>
                    <p className="fw-bold">
                      {" "}
                      Middle School &#40;11yrs - 13yrs&#41;
                    </p>
                  </div>
                  <div className="col border-start px-4 border_primary">
                    <h4 className="fw-bold">Delivery Mode:</h4>
                    <ul className="m-0 primary-list">
                      <li className="fw-bold m-0 p-0">Online</li>
                    </ul>
                  </div>
                  <div className="col border-start px-4 border_primary">
                    <h4 className="fw-bold">Language Preference:</h4>
                    <ul className="m-0 primary-list">
                      <li className="fw-bold m-0 p-0">English</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="shadow rounded-10 p-5 bg-white  my-4">
                <div className="row m-0 p-0 ">
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Courses:</h4>
                  </div>
                  <div className="col ">
                    <h4 className="fw-bold m-0 p-0">Perference:</h4>
                  </div>

                  <div className="row m-0 p-0 py-2 pt-4">
                    <div className="col d-flex align-items-center gap-2">
                      <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                      <p className="fw-bold m-0 p-0 h5 fw-lighter">Course 1</p>
                    </div>
                    <div className="col ">
                      <ul className="m-0 primary-list">
                        <li className="fw-bold m-0 p-0">Beginner</li>
                      </ul>
                    </div>
                  </div>

                  <div className="row m-0 p-0 py-2">
                    <div className="col d-flex align-items-center gap-2">
                      <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                      <p className="fw-bold m-0 p-0 h5 fw-lighter">Course 2</p>
                    </div>
                    <div className="col ">
                      <ul className="m-0 d-flex gap-4 primary-list">
                        <li className="fw-bold m-0 p-0">Beginner</li>
                        <li className="fw-bold m-0 p-0">Intermediate</li>
                      </ul>
                    </div>
                  </div>

                  <div className="row m-0 p-0 py-2">
                    <div className="col d-flex align-items-center gap-2">
                      <MdArrowForwardIos className="text_primary h4 p-0 m-0" />
                      <p className="fw-bold m-0 p-0 h5 fw-lighter">Course 3</p>
                    </div>
                    <div className="col ">
                      <ul className="m-0 d-flex gap-4 primary-list">
                        <li className="fw-bold m-0 p-0">Beginner</li>
                        <li className="fw-bold m-0 p-0">Intermediate</li>
                        <li className="fw-bold m-0 p-0">Semi-Expert</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}


export default withRole(SettingProfle, ['Student']);
