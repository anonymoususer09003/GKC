import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import { useRouter } from "next/router";
import PaymentForm from "@/components/stripe/PaymentForm";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/actions/userActions";
import { apiClient } from "@/api/client";
import moment from "moment";

function StudentRegistrationCCPay() {

  const navigation = useRouter();
  const dispatch = useDispatch();
  console.log("navigation query", navigation.query);
  const {
    start,
    durationInHours,
    classFrequency,
    studentId,
    courseId,
    instructorId,
    eventInPerson,
  } = navigation.query;

  const [whoPaysId, setWhoPaysId] = useState(null);
  const [savePaymentFutureUse, setSavePaymentFutureUse] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const [instructorData, setInstructorData] = useState(null)
  const [hasSavedCC, setHasSavedCC] = useState(false);
  const [taxesFeesInfo, setTaxesFeesInfo] = useState(null)
  const [loggedUserCCinfo, setLoggedUserCCinfo] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState("");
  const [savedCCSelected, setSavedCCSelected] = useState(false)
  const [err, setErr] = useState('')

  const [nameCard, setNameCard] = useState("");

  useEffect(() => {
    dispatch(fetchUser());

    const userLoggedData = async () =>{
      try{
        const res = await apiClient('/user/logged-user-details')
        setWhoPaysId(res.data.id)
      }
      catch(err) {
        console.log('logged user err', err)
      }
    }
    userLoggedData()
  }, [dispatch]);

  function formatNumberWithTwoDecimals(number) {
   
    return number?.toFixed(2);
  }

  const scheduleSaved = async () => {
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.post(
        `https://staging-api.geekkidscode.com/event/create-class-saved-payment-method`,
        {
          start: start || "2023-11-11 23:59",
          durationInHours:
            parseInt(durationInHours) === 0 ? parseInt(durationInHours) : 1,
          classFrequency: classFrequency,
          courseId: courseId,
          studentId: studentId,
          whoPaysId: parseInt(studentId),
          instructorId: instructorId,
          eventInPerson: eventInPerson,
        },
        {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        }
      );
      console.log(res)
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const sendEmailToWhoPays = async () => {

    try {
      const ress = await apiClient.get(`user/details/?userEmail=${whoPaysId}`)
      const res = await SendEmailToParents({
        start: start,
        durationInHours: parseInt(durationInHours),
        classFrequency: classFrequency,
        courseId: parseInt(courseId),
        studentId: parseInt(studentId),
        whoPaysId: ress.data.userId,
        instructorId: parseInt(instructorId),
        eventInPerson: JSON.parse(eventInPerson)
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
    finally{
      try{
        const responce = await apiClient.post('/stripe/one-time-payment-intent',{
          instructorId: instructorId,
          durationInHours: durationInHours
        })
        console.log(responce)
      } catch(err){
        setErr('You have signed wrong data.')
        cosnsole.log(err)
      }
    }
  };

  const scheduleNoSaved = async (data) => {
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.post(
        `https://staging-api.geekkidscode.com/event/create-class-no-saved-payment-method`,
        {
          classDto: {
            start: start || "2023-11-11 23:59",
            durationInHours: parseInt(
              durationInHours === 0 ? 1 : durationInHours
            ),
            classFrequency: classFrequency,
            courseId: parseInt(courseId || 0),
            studentId: parseInt(studentId),
            whoPaysId: parseInt(whoPaysId ? whoPaysId : 0),
            instructorId: parseInt(instructorId),
            eventInPerson: JSON.parse(eventInPerson),
          },
          stripeResponseDTO: {
            paymentIntentId: data?.paymentIntentId,
            paymentStatus: data?.status,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        }
      );

      navigation.push("/parent/calandar");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleValueReceived = (value) => {
    setErr('')
    setNameCard(value);
    // Do something with the value in the parent component
  };
  const handlePaymentRequest = (data) => {
    console.log("data", data);
    if (data.status === "succeeded") {
      // scheduleSaved();
      scheduleNoSaved(data);
    }
    setPaymentStatus(data.status);
    setConfirmPayment(false);

    // if (status) {
    //   scheduleNoSaved();
    // }
  };

  useEffect(()=>{
    const getInstructorData = async () => {
      try {
        var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));

        const response = await axios.get(
          `https://staging-api.geekkidscode.com/instructor/details-for-scheduling?instructorId=${instructorId}`,
          {
            headers: {
              Authorization: `Bearer ${typ.accessToken}`,
            },
          }
        );
        setInstructorData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (instructorId) getInstructorData();
    const checkIfUserHasSavedUserCard = async () =>{
      try{
        const res = await apiClient('/stripe/has-saved-payment-method')
        setHasSavedCC(res.data)
      }catch(err){
        console.log(err)
      }
    }
    checkIfUserHasSavedUserCard()
  },[instructorId])

  useEffect(()=>{
    const getTaxesFees = async () =>{
      try {
        const res = await apiClient('/event/get-platform-fees')
        setTaxesFeesInfo(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getTaxesFees()
  },[])
  useEffect(()=>{
    const getCCdetails = async () =>{
      try {
        const res = await apiClient('/stripe/get-logged-user-card-details')
        setLoggedUserCCinfo(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getCCdetails()
  },[])
  return (
    <>
      <Head>
        <title>Auth | CC Info</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Navbar isLogin={true} />
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className="w-100 p-5">
              <div>
                <h5 className="text-dark fw-bold">Payment Information</h5>

                <div className="py-2">
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Hourly Rate:</p>
                    <p className="p-0 m-0 fw-bold">{formatNumberWithTwoDecimals(instructorData?.hourlyRate )?? 'Calculating..'} USD/hr</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">No. of Hours:</p>
                    <p className="p-0 m-0 fw-bold">{durationInHours ?? 'Calculating..'} Hrs</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Booking fee:</p>
                    <p className="p-0 m-0 fw-bold">{formatNumberWithTwoDecimals((instructorData?.hourlyRate * durationInHours)*(taxesFeesInfo?.feePercentage/100) + taxesFeesInfo?.additionalFeeAmount)  ?? 'Calculating..'} USD</p>
                  </div>
                  <div className="d-flex gap-3 py-1">
                    <p className="p-0 m-0 fw-bold">Total Due:</p>
                    <p className="p-0 m-0 fw-bold">{formatNumberWithTwoDecimals((instructorData?.hourlyRate * durationInHours) + (instructorData?.hourlyRate * durationInHours)*(taxesFeesInfo?.feePercentage/100) + taxesFeesInfo?.additionalFeeAmount)  ?? 'Calculating..'} USD</p>
                  </div>
                </div>

                <h5 className="text-dark fw-bold">Use saved Credit Card?</h5>

                <div className="py-2">
                <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 "
                  disabled={!hasSavedCC}
                  onChange={()=>{setSavedCCSelected(!savedCCSelected)}}
                  >
                    <option>{hasSavedCC ? 'Select' : 'No saved CC info'}</option>
                    {
                      hasSavedCC && <option>...{loggedUserCCinfo?.last4Digits ?? 'Error'}</option>
                    }
                    
                  </select>
                </div>
                <PaymentForm
                  title="Enter credit card information"
                  onValueReceived={handleValueReceived}
                  onPay={confirmPayment}
                  userInfo={userInfo}
                  data={{ instructorId, durationInHours, whoPaysId: parseInt(studentId) }}
                  onPaymentRequest={handlePaymentRequest}
                  oneTimePayment={true}
                  savePaymentFutureUse={savePaymentFutureUse}
                  disabled={savedCCSelected}
                  setCardFormValid={setIsCardValid}
                />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={savePaymentFutureUse}
                    onChange={(e) => setSavePaymentFutureUse(e.target.checked)}
                    id="flexCheckDefault"
                    disabled={savedCCSelected}
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Save the payment information for future use
                  </label>
                </div>
                <b>{err}</b>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button
                    style={{cursor:'pointer'}}
                    className={`w-50 btn_primary text-light p-2 rounded fw-bold bg-gray-300 btn_primary`}
                    onClick={() => {

                        if(savedCCSelected){
                          console.log('saved cc')
                          scheduleSaved()
                          setErr('✅ You successfully bought class.')
                        }else{
                          if(isCardValid) {
                              console.log('valid unsaved cc')
                              setConfirmPayment(true)
                              setErr('✅ You successfully bought class.')
                          }else{
                            console.log('unvalid unsaved cc')
                            setErr('❌ Unfortunately your signed data mismatched, please try again or contact us.')
                          }
                        }
                        setTimeout(() => {
                          navigation.push('/parent/calandar')
                        }, 3000);
                      // whoPaysId === "Select"
                      //   ? setConfirmPayment(true)
                      //   : sendEmailToWhoPays();
                    }}
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

export default withRole(StudentRegistrationCCPay, ["Parent"]);
