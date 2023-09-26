import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withRole } from "../../../utils/withAuthorization";
import ParentDetail from "../../../components/stripe/PaymentDetail/index";
import ParentLayout from "@/components/common/ParentLayout";

function CreditCardInfo() {

  return (
    <>
      <Head>
        <title>Credit Card Information</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <ParentLayout>
        <ParentDetail />
      </ParentLayout>
    </>
  );
}

export default withRole(CreditCardInfo, ["Parent"]);
