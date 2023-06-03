import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
export default function App({ Component, ...pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
      <Component {...pageProps} />
  );
}
