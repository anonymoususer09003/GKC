import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { TutorNavbar, Footer } from '../../../components';
import { useRouter } from 'next/router';
import { withRole } from '../../../utils/withAuthorization';
import Link from 'next/link';
import { apiClient } from '@/api/client';

function BankInfo() {
  const navigation = useRouter();
  const [showPayoneerInput, setShowPayoneerInput] = useState(false);
  const [showPayPalInput, setShowPayPalInput] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [showACHBank, setAchBank] = useState(false);
  const [data, setData] = useState([
    {
      label: 'Name on Account',
      placeholder: 'Enter first name and last name',
      value: '',
      error: '',
    },
    {
      label: 'Routing Number',
      placeholder: 'Enter routing#',
      value: '',
      error: '',
    },
    {
      label: 'Confirm Routing Number',
      placeholder: 'Confirm routing#',
      value: '',
      error: '',
    },
    {
      label: 'Account Number',
      placeholder: 'Enter account#',
      value: '',
      error: '',
    },
    {
      label: 'Confirm Account Number',
      placeholder: 'Confirm account#',
      value: '',
      error: '',
    },
    {
      label: 'Bank Name',
      placeholder: 'Enter Bank Name',
      value: '',
      error: '',
    },
  ]);
  const handleUpdateClick = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    getPayPalEmail();
    if (email !== '') {
      setShowPayPalInput(true);
      setShowPayoneerInput(false);
    }
  }, []);

  const getPayPalEmail = async () => {
    try {
      const response = await apiClient.get(
        '/instructor/get-payPal-email-logged-instructor',
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem('gkcAuth'))
              .acessToken,
          },
        }
      );
      console.log(response?.data == '[object Object]');
      if (response?.data == '[object Object]') {
        setEmail(response?.data?.email);
        setShowPayPalInput(true);
        setShowPayoneerInput(false);
      } else {
        setEmail(response?.data);
        setShowPayPalInput(true);
        setShowPayoneerInput(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePayPalEmail = async () => {
    try {
      const response = await apiClient.put(
        '/instructor/update-payPal-email-logged-instructor',
        { email: email },
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem('gkcAuth'))
              .acessToken,
          },
        }
      );
      handleUpdateClick();
      setPopupVisible(!popupVisible);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTextChange = (value, item) => {
    let temp = [...data];
    let index = data.findIndex((el) => el.label === item.label);
    let tempValue = { ...temp[index] };
    console.log('value', value);
    if (
      tempValue.label === 'Confirm Routing Number' &&
      temp[index - 1].value != value
    ) {
      tempValue.error = 'routing number didnot matched';
    } else if (
      tempValue.label === 'Confirm Routing Number' &&
      temp[index - 1].value == value
    ) {
      tempValue.error = '';
    }
    console.log('logs', temp[index - 1]);
    if (
      tempValue.label === 'Confirm Account Number' &&
      temp[index - 1].value != value
    ) {
      console.log('if');
      tempValue.error = 'account number didnot matched';
    } else if (
      tempValue.label === 'Confirm Account Number' &&
      temp[index - 1].value == value
    ) {
      console.log('else');
      tempValue.error = '';
    }
    tempValue.value = value;
    temp[index] = tempValue;
    setData(temp);
  };
  const hasNonEmptyError = data.some((obj) => obj.error !== '');

  return (
    <>
      <Head>
        <title> Instructor CC Info </title>{' '}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>{' '}
      <TutorNavbar isLogin={true} />{' '}
      <div className="w-100">
        <h4
          style={{ marginTop: '120px' }}
          className="text-dark fw-bold pb-2 text-center"
        >
          Tell us where to deposit your payments
        </h4>
        <div className="d-flex mt-5 justify-content-center align-items-center flex-column">
          {/* <div className="d-flex align-items-center gap-5 justify-content-center">
            <p style={{ width: '100px' }} className="fw-bold">
              Payoneer
            </p>
            <button
              onClick={() => setShowPayoneerInput(!showPayoneerInput)}
              style={{ backgroundColor: '#f48342' }}
              className="py-2 px-4 fw-bold text-white rounded"
            >
              Setup
            </button>
          </div>
          {showPayoneerInput && (
            <input
              placeholder="Enter Payoneer info"
              className="mt-3 fw-bold border-2 border-dark p-1"
            ></input>
          )} */}
          <div className="mt-5 d-flex gap-5 align-items-center justify-content-center">
            <p style={{ padding: '0px', margin: '0px' }} className="fw-bold">
              ACH Bank Transfer
            </p>
            <button
              onClick={() => setAchBank(!showACHBank)}
              style={{ backgroundColor: '#f48342' }}
              className="py-2 px-4 fw-bold text-white rounded"
            >
              Setup
            </button>
          </div>
          {showACHBank && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {data.map((item, index) => {
                return (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <label style={{ width: '200px' }}>{item.label}</label>

                      <input
                        onChange={(e) => {
                          handleTextChange(e.target.value, item);
                        }}
                        style={{
                          marginLeft: '10px',
                          width: '80%',
                          border: `2px solid ${item.error ? 'red' : 'black'}`,
                        }}
                        value={item.value}
                        placeholder={item.placeholder}
                        className="fw-bold p-1"
                      />
                    </div>
                    {item.error && (
                      <p style={{ textAlign: 'end', color: 'red' }}>
                        {item.error}
                      </p>
                    )}
                  </>
                );
              })}
            </div>
          )}

          <div className="mt-5 d-flex gap-5 align-items-center justify-content-center">
            <p style={{ width: '140px' }} className="fw-bold">
              PayPal
            </p>
            {!showPayPalInput && (
              <button
                onClick={() => setShowPayPalInput(!showPayPalInput)}
                style={{ backgroundColor: '#f48342' }}
                className="py-2 px-4 fw-bold text-white rounded"
              >
                Setup
              </button>
            )}
          </div>
          {showPayPalInput && (
            <input
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder="Enter PayPal info"
              style={{ width: 300, textAlign: 'center' }}
              className="mt-3 fw-bold border-2 border-dark p-1"
            ></input>
          )}
          <div className="">
            <button
              onClick={updatePayPalEmail}
              style={{
                marginTop: '80px',
                width: 200,
                marginBottom: '20px',
                backgroundColor:
                  showACHBank && hasNonEmptyError ? 'grey' : '#f48342',
              }}
              disabled={showACHBank && hasNonEmptyError ? true : false}
              className="text-light p-2 rounded fw-bold  bg-gray-300"
            >
              Update
            </button>
            {popupVisible && (
              <div
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '55px',
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                Your payment info has been updated successfully ✔️
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRole(BankInfo, ['Instructor']);
