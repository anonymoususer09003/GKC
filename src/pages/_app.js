import React, { useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css';
import StripeWrapper from '../components/stripe/wrapper/index';
import { wrapper } from '../store/store';

function App({ Component, ...pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <StripeWrapper>
      <Component {...pageProps} />
    </StripeWrapper>
  );
}

export default wrapper.withRedux(App);
