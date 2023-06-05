import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import StripeWrapper from "../components/stripe/wrapper/index";
export default function App({ Component, ...pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <StripeWrapper>
      <Component {...pageProps} />
    </StripeWrapper>
  );
}
