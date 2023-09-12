import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ParentNavbar, Footer, ParentTutorCard } from "../../components";
const inter = Inter({ subsets: ["latin"] });
import { withRole } from "../.././utils/withAuthorization";
import { apiClient } from "../../api/client";
import { parseISO, format } from "date-fns";

function ParentLandingPage() {
  const [showCards, setShowCards] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [selectedCourse, setSelectCourse] = useState("");
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [mode, setMode] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedZip, setSelectedZip] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const [courses, setCourses] = useState([]);
  const [lang, setLang] = useState([]);
  const [proficiency, setProficiency] = useState([]);
  const [insructors, setInsructors] = useState([]);

  const search = async () => {
    try {
      const res = await apiClient.get(
        `/public/landing/filter?name=${name}&hourlyRate=${hourlyRate}&grades=${ageGroup}&courses=${selectedCourse}&spokenLanguage=${selectedLang}&deliveryModes=${mode}&page=0&size=10`
      );
      setInsructors(res.data);
      console.log(res);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const getInstructors = async () => {
    try {
      const res = await apiClient.get("/public/landing/filter?page=0&size=10");
      setInsructors(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await apiClient.get(`/public/course/with-instructors`);
      var technologyList = [];

      response.data.forEach((v) => {
        technologyList.push({ value: v.id, label: v.name });
      });
      setCourses(technologyList);
    } catch (error) {
      console.error(error);
    }
  };

  const getProficiency = async () => {
    try {
      const response = await apiClient.get(
        `/public/course/get-all-proficiencies`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setProficiency(arr);
    } catch (error) {
      console.error(error);
    }
  };
  const getLang = async () => {
    try {
      const response = await apiClient.get(`/public/language/with-instructors`);
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setLang(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
    getProficiency();
    getLang();
  }, []);
  return (
    <>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentNavbar />
      <main className="container-fluid">
        <div className="container py-4">
        <p className="text-center mb-0 tw-font-medium tw-text-[25px] tw-text-[#f48342]">
            Start here by searching
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap py-3">
            <input
              type="text"
              placeholder="Search for a tutor by Name"
              className={`p-2 rounded outline-0 border border_gray ${styles.landingInputs}`}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <select
              className="p-2 rounded outline-0 border border_grFay"
              onChange={(e) => setSelectCourse(e.target.value)}
            >
              <option value="">Course</option>
              {courses.map((course) => {
                return (
                  <option value={course.value} key={course.value}>
                    {course.label}
                  </option>
                );
              })}
            </select>
            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => setSkill(e.target.value)}
            >
              <option value="">Proficiency</option>
              {proficiency.map((prof) => {
                return (
                  <option value={prof.value} key={prof.value}>
                    {prof.label}
                  </option>
                );
              })}
            </select>

            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="">Grade</option>
              <option value="1">Elementary School &#40;&#60;=10yrs&#41;</option>
              <option value="2">
                Middle School &#40;11yrs - 13yrs&#41;
              </option>
              <option value="3">
                High School &#40;14yrs - 18yrs&#41;
              </option>
              <option value="4">College & Beyond &#40;&gt;18yrs&#41;</option>
            </select>
            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="">Delivery Mode</option>
              <option value="1">In-Person</option>
              <option value="2">Online</option>
            </select>
            <select
              className="p-2 rounded outline-0 border border_gray"
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="">Spoken Language</option>
              {lang.map((lan) => {
                return (
                  <option value={lan.value} key={lan.value}>
                    {lan.label}
                  </option>
                );
              })}
            </select>
            <input
              type="number"
              placeholder="Max Hourly Rate"
              className={`p-2 rounded outline-0 border border_gray ${styles.landingInputs}`}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Min Stars</option>
              <option value="">1 Star</option>
              <option value="">2 Stars</option>
              <option value="">3 Stars</option>
              <option value="">4 Stars</option>
              <option value="">5 Stars</option>
            </select>
            <input
              type="text"
              placeholder="Enter City and state or Zip/Post Code"
              className={`p-2 rounded outline-0 border border_gray w-25 ${styles.landingInputs}`}
              onChange={(e) => setSelectedZip(e.target.value)}
            />
            <button
              className={`btn_primary py-2 px-5 fw-bold text-white rounded`}
              onClick={() => search(true)}
            >
              Search
            </button>
          </div>
        </div>
        <hr className="p-0 m-0" />
        <div
          style={{
            backgroundImage: 'url("/assets/home_bg.png")',
            minHeight: "775px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className=""
        >
          {insructors && (
            <div className="container py-4">
              {insructors.map((instructor) => {
                return (
                  <ParentTutorCard
                    data={instructor}
                    key={instructor.id}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRole(ParentLandingPage, ["Parent"]);
