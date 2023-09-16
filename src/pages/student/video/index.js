import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import JitsiMeetComponent from "@/components/jitsimeet";
import { withRole } from '../../../utils/withAuthorization';
import { useRouter } from 'next/router';

function StudentVideo() {
  //protection starts
  const nav = useRouter()
  // checking if user logged in starts
  if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
    console.log('lol')
    useEffect(()=>{

      if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
        nav.push('/') 
      } else{
        if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Student') { //here we check if user has role Student
          nav.push('/')
        }
      }

    },[])
  }
  // checking if user logged in ends

  //protection ends
  const user = {
    id: 1,
    name: "Nouman",
  };
  return (
    <>
      <Head>
        <title>Student CC Info</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <JitsiMeetComponent roomName="Maths Course" user={user} />
      <Footer />
    </>
  );
}


export default withRole(StudentVideo, ['Student']);