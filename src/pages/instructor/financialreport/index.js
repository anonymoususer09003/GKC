import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { TutorNavbar, Footer } from '../../../components';
import { FiRefreshCw } from 'react-icons/fi';
import { TbSpeakerphone } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import styles from '../../../styles/FinancialReport.module.css';
import FinancialReport from '@/components/financialReport';
import Withdrawals from '@/components/withdrawalsReport';

function InstructorFinancialReport() {
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
  const navigation = useRouter();

  const [activeTab, setActiveTab] = useState('revenue');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <>
      <Head>
        <title> Instructor Financial Report </title>{' '}
        <meta name="description" content="Where kids code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <TutorNavbar isLogin={true} />
      <div className={styles.topBar}>
        <div
          className={styles.button}
          style={{
            backgroundColor: activeTab === 'revenue' ? '#f48342' : 'white',
          }}
          onClick={() => handleTabClick('revenue')}
        >
          <p
            style={{
              marginBottom: '0px',
            }}
            className="btn-text"
          >
            Revenue
          </p>
        </div>
        <div
          className={styles.button}
          style={{
            backgroundColor: activeTab === 'withdrawal' ? '#f48342' : 'white',
          }}
          onClick={() => handleTabClick('withdrawal')}
        >
          <p
            style={{
              marginBottom: '0px',
            }}
            className="btn-text"
          >
            Withdrawal
          </p>
        </div>
        {/* Add more tab items for additional options */}
      </div>
      {activeTab === 'revenue' ? (
        <FinancialReport role="instructor" />
      ) : (
        <Withdrawals />
      )}
      <Footer />
    </>
  );
}

export default withRole(InstructorFinancialReport, ['Instructor']);
