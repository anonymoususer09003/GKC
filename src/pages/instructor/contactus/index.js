import ContactUs from '@/components/contactUs';
import Head from 'next/head';
import { withRole } from '../../../utils/withAuthorization';
import { TutorNavbar } from './../../../components';

function InstructorContactUs() {
  return (
    <>
      <Head>
        <title> Contact Us </title>{' '}
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TutorNavbar isLogin={true} />
      <ContactUs />
    </>
  );
}

export default withRole(InstructorContactUs, ['Instructor']);