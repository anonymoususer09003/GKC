import { Navbar, Footer } from '../../components';
import { apiClient } from '@/api/client';
import { useState } from 'react';
import ContactUsAPI from '@/services/ContactUs/ContactUsAPI';
import Head from 'next/head';

export default function ContactUs() {
  const [message, setMessage] = useState('');

  // const handleMessageSubmission = async () => {
  //   try {
  //     let url = '/contactus/save-contact-us-from-logged-customer';
  //     const response = await apiClient.post(url, { message });
  //     setMessage('');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleMessageSubmission = async () => {
    try {
      const response = await ContactUsAPI(message);
      console.log(response.data);
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="vh-100 p-5">
        <div className="text-center">
          <h2 className="text-center">Contact us</h2>
          <div className="mt-5">
            <textarea
              value={message}
              placeholder="Send us a message"
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              className="form-control p-3 border border-dark"
              rows="8"
            />
          </div>
          <div className="d-grid d-md-flex justify-content-lg-between">
            <p className="opacity-50 mt-2 ms-3">
              {message.length}/500 (min. 100 characters)
            </p>
            <button
              disabled={
                message.length >= 100 && message.length < 500 ? false : true
              }
              onClick={handleMessageSubmission}
              className={`btn_primary mt-3  py-2 px-4 fw-bold text-white rounded text-decoration-none`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
