import { Navbar, Footer } from '../../components';
import { apiClient } from '@/api/client';
import { useState } from 'react';
import ContactUsAPI from '@/services/ContactUs/ContactUsAPI';
import Head from 'next/head';

export default function ContactUs() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false)

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
      setSuccess(true)
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <>
    {success ? (
        <div style={{position:'fixed', zIndex: 1, left:0,top:0, width:'100%', height:'100%',overflow:'auto', background: 'rgba(0, 0, 0, 0.4)'}}>
          <div style={{background: 'white', margin: '500px auto', padding:20,width:'380px'}}>
            <p style={{width: 350, margin: 'auto', textAlign:'center', fontSize:18}}>You successfully sent a message to our team.</p>
            <div
            style={{display:'flex', gap:10, justifyContent:'center'}}>
            <button 
            onClick={()=>{setSuccess(false)}}
            className="btn_primary text-light p-2 rounded fw-bold mt-3" 
            style={{width: 100, }}>Ok</button>
            </div>
          </div>
        </div>
        ) : null}
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
            className={`py-2 px-4 fw-bold text-white rounded text-end`}
              style={{background: message.length >= 100 && message.length <= 500 ? '#f48343' : 'gray' }}
              disabled={message.length >= 100 && message.length <= 500 ? false : true}
              onClick={handleMessageSubmission}
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
