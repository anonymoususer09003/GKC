import React, { useState } from "react"
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Navbar, Footer, TutorCard } from './../components'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [showCards, setShowCards] = useState(false)
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Navbar />
        <div className="container py-4">
          <div className="d-flex justify-content-center gap-2 flex-wrap py-3">
            <input type="text" placeholder="Search for a tutor by Name" className="p-2 rounded w-25" />
          </div>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <select className="p-2 rounded ">
              <option value="">Select Course</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded ">
              <option value="">Skills Level</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>

            <select className="p-2 rounded ">
              <option value="">Age Group</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded ">
              <option value="">Delivery Mode</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded ">
              <option value="">Spoken Language</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded ">
              <option value="">Rate</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <select className="p-2 rounded ">
              <option value="">Stars</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select>
            <input type="text" placeholder="Enter City and state or Zip/Post Code" className="p-2 rounded w-25" />
            <button className={`btn_primary py-2 px-5 fw-bold text-white rounded`} onClick={() => setShowCards(true)}>
              Search
            </button>
          </div>
        </div>
        <hr className="p-0 m-0"/>
        <div style={{backgroundImage:'url("/assets/home_bg.png")', height: '100vh', backgroundRepeat:'no-repeat',  backgroundSize:"100% 100%"}} className="">
        {
          showCards &&
          <div className="container py-4" >
            <TutorCard />
            <TutorCard />
            <TutorCard />
          </div>
        }
          </div>
        <Footer />
      </main>
    </>
  )
}
