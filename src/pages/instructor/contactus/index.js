import ContactUs from '@/components/contactUs';
import Head from 'next/head';
import { withRole } from '../../../utils/withAuthorization';
import { TutorNavbar } from './../../../components';

//important imports for protections starts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//important imports for protections ends

function InstructorContactUs() {

  return (
    <>
      <Head>
        <title> Contact Us </title>{' '}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <ContactUs />
    </>
  );
}

export default withRole(InstructorContactUs, ['Instructor']);
