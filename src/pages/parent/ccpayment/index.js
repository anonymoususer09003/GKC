import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { useRouter } from 'next/router';
import PaymentForm from '@/components/stripe/PaymentForm';
import { withRole } from '../../../utils/withAuthorization';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/actions/userActions';
import { apiClient } from '@/api/client';
function ParentRegistrationCCPay() {
  const navigation = useRouter();
  const dispatch = useDispatch();
  console.log('navigation query', navigation.query);
  const {
    start,
    durationInHours,
    classFrequency,
    studentId,
    courseId,
    instructorId,
    eventInPerson,
  } = navigation.query;

  const [whoPaysId, setWhoPaysId] = useState(studentId);
  const [savePaymentFutureUse, setSavePaymentFutureUse] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const [paymentStatus, setPaymentStatus] = useState('');

  const [nameCard, setNameCard] = useState('');

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const scheduleSaved = async () => {
    try {
      const res = await apiClient.post(
        `/event/create-class-saved-payment-method`,
        {
          start: start,
          durationInHours: durationInHours,
          classFrequency: classFrequency,
          courseId: courseId,
          studentId: studentId,
          whoPaysId: studentId,
          instructorId: instructorId,
          eventInPerson: eventInPerson,
        }
      );
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const scheduleNoSaved = async (data) => {
    try {
      const res = await apiClient.post(
        `/event/create-class-no-saved-payment-method`,
        {
          classDto: {
            start: start,
            durationInHours: parseInt(durationInHours),
            classFrequency: classFrequency,
            courseId: parseInt(courseId),
            studentId: parseInt(studentId),
            whoPaysId: parseInt(whoPaysId),
            instructorId: parseInt(instructorId),
            eventInPerson: JSON.parse(eventInPerson),
          },
          stripeResponseDTO: {
            paymentIntentId: data?.paymentIntentId,
            paymentStatus: data?.status,
          },
        }
      );
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleValueReceived = (value) => {
    setNameCard(value);
    // Do something with the value in the parent component
  };
  const handlePaymentRequest = (data) => {
    console.log('data', data);
    if (data.status === 'succeeded') {
      // scheduleSaved();
      scheduleNoSaved(data);
    } else {
      alert('Payment Failed');
    }
    setPaymentStatus(data.status);
    setConfirmPayment(false);

    // if (status) {
    //   scheduleNoSaved();
    // }
  };

  return (
    <>
      <Head>
        <title>Auth | CC Info</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Navbar isLogin={true} />
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-100 p-5">
              <div>
                <h5 className="text-dark fw-bold">Payment Information</h5>

                <div className="py-2">
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">No. of Hours:</p>
                    <p className="p-0 m-0 fw-bold">{durationInHours}</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Total Due:</p>
                    <p className="p-0 m-0 fw-bold">{durationInHours}</p>
                  </div>
                </div>
                <h5 className="text-dark fw-bold">
                  Who pays for this tutoring?
                </h5>

                <div className="py-2">
                  <select
                    className="w-25 p-2 rounded outline-0 border border_gray  mb-3 "
                    value={whoPaysId}
                    onChange={(e) => setWhoPaysId(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="1">example@mail.com</option>
                    <option value="2">example2@mail.com</option>
                  </select>
                </div>

                <h5 className="text-dark fw-bold">Use saved Credit Card?</h5>

                <div className="py-2">
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 ">
                    <option>Select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
                <PaymentForm
                  title="Enter new credit card information"
                  onValueReceived={handleValueReceived}
                  onPay={confirmPayment}
                  userInfo={userInfo}
                  data={{ instructorId, durationInHours, whoPaysId }}
                  onPaymentRequest={handlePaymentRequest}
                  oneTimePayment={true}
                  savePaymentFutureUse={savePaymentFutureUse}
                  setIsCardValid={setIsCardValid}
                />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={savePaymentFutureUse}
                    onChange={(e) => setSavePaymentFutureUse(e.target.checked)}
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Save the payment information for future use
                  </label>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    className={`w-50 btn_primary text-light p-2 rounded fw-bold bg-gray-300 ${
                      !nameCard || !isCardValid ? 'btn_disabled' : 'btn_primary'
                    }`}
                    disabled={!nameCard || !isCardValid}
                    onClick={() => setConfirmPayment(true)}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default withRole(ParentRegistrationCCPay, ['Parent']);
