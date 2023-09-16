import React, { useState, useEffect } from "react";
import Head from "next/head";
import ParentDetail from "../../../components/stripe/PaymentDetail/index";
import { withRole } from "../../../utils/withAuthorization";
import StudentLayout from "@/components/common/StudentLayout";
import { useRouter } from 'next/router';

function CreditCardInfo() {
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
  return (
    <>
      <Head>
        <title>Credit Card Information</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <StudentLayout>
        <ParentDetail />
      </StudentLayout>
    </>
  );
}

export default withRole(CreditCardInfo, ["Student"]);
