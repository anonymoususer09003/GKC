import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { Navbar, Footer, TutorCard } from '../../components';
import {RiArrowGoBackLine} from "react-icons/ri"
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [showCards, setShowCards] = useState(false);
  return (
    <>
      <Head>
        <title>Sign In Page</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid">
      <Link href="/" className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"> 
      
<RiArrowGoBackLine /><p className="fw-bold m-0 p-0 ">Back to home</p>
      </Link>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
            <div style={{ maxWidth: '400px', width: '100%' }}>
              {/* <h1 className="text-center mb-5">GSK</h1> */}
              <div className="d-flex justify-content-center mb-5">
                <Image
                  src="/assets/logo.png"
                  alt="Vercel Logo"
                  className=""
                  width={240}
                  height={50}
                  priority
                />
              </div>
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <h4 className="text-secondary fw-bold">Sign In</h4>
                  <Link href="/forgotpassword" className="text-decoration-none d-flex gap-2">
                  <p className="fw-bold text_secondary">Forgot Password?</p></Link>
                </div>
                <div>
                  <select className="w-100 p-2 rounded outline-0 border border_gray text_gray mb-3 ">
                    <option>Student</option>
                    <option>Student</option>
                    <option>Student</option>
                  </select>
                  <input type="text" className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3" placeholder='Your Email'/>
                  <input type="text" className="w-100 p-2 rounded outline-0 border border_gray  text_gray mb-3" placeholder='Password' />
                  <button className="w-100 btn_primary text-light p-2 rounded fw-bold mt-3">Sign In</button>
                </div>
                <Link href="/" className="text-decoration-none d-flex gap-2 justify-content-center py-3"><p className="text-secondary fw-bold">Not yet Register?</p>
                  <p className="fw-bold text_secondary">Create account?</p></Link>
                  
                </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6            "
            style={{
              backgroundImage: 'url("/assets/signin_right.png")',
              height: '90vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          >

<div className="d-flex justify-content-center mb-5">
                {/* <Image
                  src="/assets/login-photo 1.png"
                  alt="Vercel Logo"
                  className=""
                  width={400}
                  height={540}
                  priority
                /> */}
              </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
