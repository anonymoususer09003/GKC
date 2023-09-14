import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import JitsiMeetComponent from "@/components/jitsimeet";
import { withRole } from '../../../utils/withAuthorization';

function StudentVideo() {
  const user = {
    id: 1,
    name: "Nouman",
  };
  return (
    <>
      <Head>
        <title>Student CC Info</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <JitsiMeetComponent roomName="Maths Course" user={user} />
      <Footer />
    </>
  );
}


export default withRole(StudentVideo, ['Student']);