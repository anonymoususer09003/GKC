import React, { useState } from "react";
import Head from "next/head";
import ParentDetail from "../../../components/stripe/PaymentDetail/index";
import { withRole } from "../../../utils/withAuthorization";

function CreditCardInfo() {
  return (
    <>
      <Head>
        <title>Credit Card Information</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentDetail />
    </>
  );
}

export default withRole(CreditCardInfo, ["Student"]);
