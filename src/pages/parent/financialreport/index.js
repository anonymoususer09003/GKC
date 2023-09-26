import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "../../../components";
import {ParentNavbar} from '../../../components/'
import { FiRefreshCw } from "react-icons/fi";
import { TbSpeakerphone } from "react-icons/tb";
import FinancialReport from "@/components/financialReport";
import { useRouter } from "next/router";
import { withRole } from "../../../utils/withAuthorization";
import styles from "../../../styles/Home.module.css";

function ParentFinancialReport() {

  const navigation = useRouter();
  const onRequestRefund = () => {
    navigation.push("/parent/requestrefund");
  };
  return (
    <>
      <Head>
        <title> Parent Financial Report </title>{" "}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <ParentNavbar isLogin={true} />
      <FinancialReport role="parent" />
      <Footer />
    </>
  );
}

export default withRole(ParentFinancialReport, ["Parent"]);
