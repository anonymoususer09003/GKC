import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Navbar, Footer } from '../../../components';
import { FiRefreshCw } from 'react-icons/fi';
import { TbSpeakerphone } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import styles from '../../../styles/Home.module.css';
import FinancialReport from '@/components/financialReport';

function StudentFinancialReport() {
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
  const navigation = useRouter();
  const onRequestRefund = () => {
    navigation.push('/student/requestrefund');
  };
  return (
    <>
      <Head>
        <title> Student Financial Report </title>{' '}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>{' '}
      <Navbar isLogin={true} /> 
      <FinancialReport role="student" />
      <Footer />
    </>
  );
}

export default withRole(StudentFinancialReport, ['Student']);
