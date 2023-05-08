import React, { useEffect } from "react"
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-calendar/dist/Calendar.css';
export default function App({ Component, pageProps }) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return <Component {...pageProps }
    />
}