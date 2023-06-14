import React, { useState,  useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ParentNavbar, Footer, ParentTutorCard } from "../../components";
const inter = Inter({ subsets: ["latin"] });
import { withRole } from '../.././utils/withAuthorization';
import axios from "axios";
import { parseISO, format } from 'date-fns'

function ParentLandingPage() {
  const [showCards, setShowCards] = useState(true);
  const [insructors, setInsructors] = useState([]);

  const getInstructors = async () => {
  try {
    const res = await axios.get("http://34.227.65.157/public/landing/filter?page=0&size=10");
    setInsructors(res.data);
  // setProfile(res.data);
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};
  useEffect(()=>{
    getInstructors()
  }, [])
  return (
    <>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentNavbar />
      <main  className="container-fluid" >
        <div className="container py-4" >
          <div className="d-flex justify-content-center gap-2 flex-wrap py-3">
            <input
              type="text"
              placeholder="Search for a tutor by Name"
              className="p-2 rounded w-25 outline-0 border border_gray"
            />
          </div>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Select Course</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Skills Level</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>

            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Age Group</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Delivery Mode</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Spoken Language</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Rate</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded outline-0 border border_gray">
              <option value="">Stars</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <input
              type="text"
              placeholder="Enter City and state or Zip/Post Code"
              className="p-2 rounded w-25 outline-0 border border_gray"
            />
            <button
              className={`btn_primary py-2 px-5 fw-bold text-white rounded`}
              onClick={() => setShowCards(true)}
            >
              Search
            </button>
          </div>
        </div>
        <hr className="p-0 m-0" />
        <div
          style={{
            backgroundImage: 'url("/assets/home_bg.png")',
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className=""
        >
          {insructors && (
            <div className="container py-4">
            {
              insructors.map((instructor)=> {
                return <ParentTutorCard data={instructor} key={instructor.id} />
              })
            }
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}


export default withRole(ParentLandingPage, ['Parent']);
