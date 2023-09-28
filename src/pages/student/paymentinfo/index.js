import React, { useState, useEffect } from "react";
import Head from "next/head";
import ParentDetail from "../../../components/stripe/PaymentDetail/index";
import { withRole } from "../../../utils/withAuthorization";
import StudentLayout from "@/components/common/StudentLayout";
import { useRouter } from 'next/router';

function CreditCardInfo() {

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
