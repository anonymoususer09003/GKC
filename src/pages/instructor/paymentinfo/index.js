import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { TutorNavbar } from '@/components';
import { withRole } from '@/utils/withAuthorization';
import { apiClient } from '@/api/client';
import { isEmailValid } from '@/services/Validation/validationService';
// import { isCountryUSA, isEmailValid, isEntireStingNumbers } from '@/services/Validation/validationService';

function BankInfo() {

  const [showPayoneerInput, setShowPayoneerInput] = useState(false);
  const [showPayPalInput, setShowPayPalInput] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [payPalChanged, setPayPalChanged] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  // const [achCreated, setAchCreated] = useState(false);
  // const [showACHBank, setAchBank] = useState(false);
  // const [achInfo, setAchInfo] = useState([
  //   {
  //     label: 'Name on Account*',
  //     placeholder: 'Enter first name and last name',
  //     value: '',
  //     error: ''
  //   },
  //   {
  //     label: 'Routing Number*',
  //     placeholder: 'Enter routing#',
  //     value: '',
  //     error: '',
  //     isANumber: true
  //   },
  //   {
  //     label: 'Confirm Routing Number*',
  //     placeholder: 'Confirm routing#',
  //     value: '',
  //     error: '',
  //     compareWithIndex: 1,
  //     isANumber: true
  //   },
  //   {
  //     label: 'Account Number*',
  //     placeholder: 'Enter account#',
  //     value: '',
  //     error: '',
  //     isANumber: true
  //   },
  //   {
  //     label: 'Confirm Account Number*',
  //     placeholder: 'Confirm account#',
  //     value: '',
  //     error: '',
  //     compareWithIndex: 3,
  //     isANumber: true
  //   }
  // ]);

  const handleUpdateClick = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!payPalChanged) setPayPalChanged(true);
  };

  useEffect(() => {
    // getUserInfo();
    getPayPalEmail();
    // getAchBankInfo();
    if (email !== '') {
      setShowPayPalInput(true);
      setShowPayoneerInput(false);
    }
  }, []);
  // const getUserInfo = async () => {
  //   try {
  //     const response = await apiClient('/user/logged-user-details');
  //     setUserInfo(response?.data || null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getPayPalEmail = async () => {
    try {
      const response = await apiClient.get(
        '/instructor/get-payPal-email-logged-instructor',
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem('gkcAuth'))
              .acessToken
          }
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
              .acessToken
          }
        }
      );
      console.log(response);
      handleUpdateClick();
      setPopupVisible(!popupVisible);
      setPayPalChanged(false);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleTextChange = (value, item) => {
  //   let temp = [...achInfo];
  //   let index = achInfo.findIndex((el) => el.label === item.label);
  //   let currentInput = { ...temp[index], value };
  //   let compareToInput = temp[currentInput?.compareWithIndex];
  //
  //
  //   if (currentInput?.isANumber && !isEntireStingNumbers(currentInput.value)) {
  //     currentInput.error = 'No alphabets or special characters';
  //   } else {
  //     currentInput.error = '';
  //   }
  //
  //   if (compareToInput) {
  //     if (currentInput.value === compareToInput.value) {
  //       currentInput.error = '';
  //     } else {
  //       currentInput.error = compareToInput.label.replace('*', '') + ' did not match';
  //     }
  //   }
  //
  //   temp[index] = currentInput;
  //   setAchInfo(temp);
  // };

  // const getAchBankInfo = async () => {
  //   try {
  //     const response = await apiClient.get('/billdotcom/vendor');
  //     setAchBankInfo(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //
  // const setAchBankInfo = (info) => {
  //   if (!info?.name || !info?.routingNumber || !info?.accountNumber) return;
  //
  //   let temp = [...achInfo];
  //   temp[0].value = info.name;
  //   temp[1].value = info.routingNumber;
  //   temp[2].value = info.routingNumber;
  //   temp[3].value = info.accountNumber;
  //   temp[4].value = info.accountNumber;
  //
  //   setAchCreated(true);
  //   setAchBank(temp);
  // };

  //
  // const updateAchBankInfo = async () => {
  //   if (!checkIfAchInfoIsValid() || !isAccountNumberValid || !isRoutingNumberValid || !userInfo) return;
  //   const name = achInfo[0].value;
  //   const routingNumber = achInfo[1].value;
  //   const accountNumber = achInfo[3].value;
  //   try {
  //     const data = {
  //       routingNumber,
  //       accountNumber,
  //       name,
  //       savings: false,
  //       address1: userInfo.address1,
  //       addressCity: userInfo.city,
  //       addressState: userInfo.state,
  //       addressZip: userInfo.zipCode,
  //       addressCountry: userInfo.country
  //     };
  //     console.log(data);
  //     if (achCreated) {
  //       const response = await apiClient.put('/billdotcom/bank-account', data);
  //       console.log(response);
  //       setEncryptedAccountingNumber();
  //     } else {
  //       const response = await apiClient.post('/billdotcom/vendor', data);
  //       setEncryptedAccountingNumber();
  //       setAchCreated(true);
  //       console.log(response);
  //     }
  //     handleUpdateClick();
  //     setPopupVisible(!popupVisible);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //
  // const setEncryptedAccountingNumber = () => {
  //   let temp = [...achInfo];
  //   let hidden = '***' + achInfo[3].value.slice(3);
  //   temp[3].value = hidden;
  //   temp[4].value = hidden;
  //   setAchBank(temp);
  // };


  // const isAccountNumberValid = isEntireStingNumbers(achInfo[3].value);
  // const isRoutingNumberValid = isEntireStingNumbers(achInfo[1].value);
  // const checkIfAchInfoIsValid = () => achInfo.every(field => field.value && !field.error);
  // const isUpdateAchButtonActive = () => {
  //   return !!(showACHBank && checkIfAchInfoIsValid() && isAccountNumberValid && isRoutingNumberValid);
  // };
  const disablePPUpdateButton = () => {
    return !!(!payPalChanged || !email || !isEmailValid(email));
  };


  return (
    <>
      <Head>
        <title> Instructor CC Info </title>{' '}
        <meta name='description' content='Where kids learn to code' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='icon'
          href='https://gkc-images.s3.amazonaws.com/favicon.ico'
        />
      </Head>{' '}
      <TutorNavbar isLogin={true} />{' '}
      <div className='w-100'>
        <h4
          style={{ marginTop: '120px' }}
          className='text-dark fw-bold pb-2 text-center'
        >
          Tell us where to deposit your payments
        </h4>
        <div className='d-flex mt-5 justify-content-center align-items-center flex-column'>
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
          {/*{isCountryUSA(userInfo?.country) && (*/}
          {/*  <>*/}
          {/*    <div className='mt-5 d-flex gap-5 align-items-center justify-content-center'>*/}
          {/*      <p style={{ padding: '0px', margin: '0px' }} className='fw-bold'>*/}
          {/*        ACH Bank Transfer*/}
          {/*      </p>*/}
          {/*      {!achCreated && (*/}

          {/*        <button*/}
          {/*          onClick={() => setAchBank(!showACHBank)}*/}
          {/*          style={{ backgroundColor: '#f48342' }}*/}
          {/*          className='py-2 px-4 fw-bold text-white rounded'*/}
          {/*        >*/}
          {/*          Setup*/}
          {/*        </button>*/}
          {/*      )}*/}
          {/*    </div>*/}
          {/*    {showACHBank && (*/}
          {/*      <>*/}
          {/*        <div style={{ display: 'flex', flexDirection: 'column' }}>*/}
          {/*          {achInfo.map((item, index) => {*/}
          {/*            return (*/}
          {/*              <>*/}
          {/*                <div*/}
          {/*                  style={{*/}
          {/*                    display: 'flex',*/}
          {/*                    alignItems: 'center',*/}
          {/*                    marginTop: '10px'*/}
          {/*                  }}*/}
          {/*                >*/}
          {/*                  <label style={{ width: '200px' }}>{item.label}</label>*/}

          {/*                  <input*/}
          {/*                    onChange={(e) => {*/}
          {/*                      handleTextChange(e.target.value, item);*/}
          {/*                    }}*/}
          {/*                    style={{*/}
          {/*                      marginLeft: '10px',*/}
          {/*                      width: '80%',*/}
          {/*                      border: `2px solid ${item.error ? 'red' : 'black'}`*/}
          {/*                    }}*/}
          {/*                    value={item.value}*/}
          {/*                    placeholder={item.placeholder}*/}
          {/*                    className='fw-bold p-1'*/}
          {/*                  />*/}
          {/*                </div>*/}
          {/*                {item.error && (*/}
          {/*                  <p style={{ textAlign: 'end', color: 'red' }}>*/}
          {/*                    {item.error}*/}
          {/*                  </p>*/}
          {/*                )}*/}
          {/*              </>*/}
          {/*            );*/}
          {/*          })}*/}
          {/*        </div>*/}
          {/*        <div className=''>*/}
          {/*          <button*/}
          {/*            onClick={updateAchBankInfo}*/}
          {/*            style={{*/}
          {/*              marginTop: '20px',*/}
          {/*              width: 200,*/}
          {/*              marginBottom: '20px',*/}
          {/*              backgroundColor:*/}
          {/*                !isUpdateAchButtonActive() ? 'grey' : '#f48342'*/}
          {/*            }}*/}
          {/*            disabled={!isUpdateAchButtonActive()}*/}
          {/*            className='text-light p-2 rounded fw-bold  bg-gray-300'*/}
          {/*          >*/}
          {/*            Update*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      </>*/}

          {/*    )}*/}
          {/*  </>)}*/}
          <div className='mt-5 d-flex gap-5 align-items-center justify-content-center'>
            <p style={{ width: '140px' }} className='fw-bold'>
              PayPal
            </p>
            {!showPayPalInput && (
              <button
                onClick={() => setShowPayPalInput(!showPayPalInput)}
                style={{ backgroundColor: '#f48342' }}
                className='py-2 px-4 fw-bold text-white rounded'
              >
                Setup
              </button>
            )}
          </div>
          {showPayPalInput && (
            <input
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder='Enter PayPal info'
              style={{ width: 300, textAlign: 'center' }}
              className='mt-3 fw-bold border-2 border-dark p-1'
            ></input>
          )}
          <div className=''>
            <button
              onClick={updatePayPalEmail}
              style={{
                marginTop: '20px',
                width: 200,
                marginBottom: '20px',
                backgroundColor:
                  disablePPUpdateButton() ? 'grey' : '#f48342'
              }}
              disabled={disablePPUpdateButton()}
              className='text-light p-2 rounded fw-bold  bg-gray-300'
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
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
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
