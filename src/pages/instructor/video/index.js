import React, { useState, useEffect } from "react";
import Head from "next/head";
import { TutorNavbar, Footer } from "../../../components";
import { BsFillMicFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
// import { FaShare } from "react-icons/fa";
import JitsiMeetComponent from "@/components/jitsimeet";
import { withRole } from '../../../utils/withAuthorization';
import { useRouter } from 'next/router';

function InstructoVideo() {
    //protection starts
    const nav = useRouter()
    // checking if user logged in starts
      if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
        console.log('lol')
        useEffect(()=>{

          if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
            nav.push('/') 
          } else{
            if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Instructor') { //here we check if user has role Instructor
              nav.push('/')
            }
          }

        },[])
      }
    // checking if user logged in ends

    //protection ends
  const user = {
    id: 1,
    name: "Salman",
  };
  return (
    <>
      <Head>
        <title>Instructor Video</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <JitsiMeetComponent roomName="Maths Course" user={user} />

      <Footer />
    </>
  );
}
export default withRole(InstructoVideo, ['Instructor']);
