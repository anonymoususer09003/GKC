import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "../../../components";
import { useRouter } from "next/router";
import PaymentForm from "@/components/stripe/PaymentForm";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/actions/userActions";
import SendEmailToParents from "@/services/StudentScheduler/SendEmailToParents";
import { apiClient } from "@/api/client";
function StudentRegistrationCCPay() {

  const navigation = useRouter();
  const dispatch = useDispatch();

  const {
    start,
    durationInHours,
    classFrequency,
    studentId,
    courseId,
    instructorId,
    eventInPerson,
  } = navigation.query;

  const [whoPaysId, setWhoPaysId] = useState("Select");
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
  const [fullParentName, setFullParentName] = useState('')
  const [success, setSuccess] = useState(false)

  const [nameCard, setNameCard] = useState("");
  useEffect(() => {
    dispatch(fetchUser());
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
          start: start,
          durationInHours: parseInt(durationInHours),
          classFrequency: classFrequency,
          courseId: parseInt(courseId),
          studentId: parseInt(studentId),
          whoPaysId: parseInt(studentId),
          instructorId: parseInt(instructorId),
          eventInPerson: JSON.parse(eventInPerson),
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
        setSuccess(true)
      } catch(err){
        setErr('You have signed wrong data.')
        cosnsole.log(err)
      }
    }
  };

  const scheduleNoSaved = async (data) => {
    if(data !== undefined) {
      try {
        var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        const res = await axios.post(
          `https://staging-api.geekkidscode.com/event/create-class-no-saved-payment-method`,
          {
            classDto: {
              start: start,
              durationInHours: parseInt(durationInHours),
              classFrequency: classFrequency,
              courseId: parseInt(courseId),
              studentId: parseInt(studentId),
              whoPaysId: parseInt(studentId),
              instructorId: parseInt(instructorId),
              eventInPerson: JSON.parse(eventInPerson),
            },
            stripeResponseDTO: {
              paymentIntentId: data?.id,
              paymentStatus: data?.status,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${typ.accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
  };

  const handleValueReceived = (value) => {
    setNameCard(value);
    setErr('')
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
      {success ? (
        <div style={{position:'fixed', zIndex: 1, left:0,top:0, width:'100%', height:'100%',overflow:'auto', background: 'rgba(0, 0, 0, 0.4)'}}>
          <div style={{background: 'white', margin: '500px auto', padding:20,width:'380px'}}>
            <p style={{width: 350, margin: 'auto', textAlign:'center', fontSize:18}}>A review request has been sent to {fullParentName}. Class will be booked upon approval and payment.</p>
            <div
            style={{display:'flex', gap:10, justifyContent:'center'}}>
            <button 
            onClick={()=>{
              navigation.push(`/`)
            }}
            className="btn_primary text-light p-2 rounded fw-bold mt-3" 
            style={{width: 100, }}>Ok</button>
            </div>
          </div>
        </div>
        ) : null}
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
                <h5 className="text-dark fw-bold">
                  Who pays for this tutoring?
                </h5>

                <div className="py-2">
                  <select
                    className="w-25 p-2 rounded outline-0 border border_gray  mb-3 "
                    
                    onChange={(e) => {
                      console.log(e.target.value)
                      setWhoPaysId(JSON.parse(e.target.value).id); 
                      setFullParentName(JSON.parse(e.target.value).name)
                    }}
                    disabled={savedCCSelected}
                  >
                    <option>Select</option>
                    {userInfo?.parents?.length > 0 && (
                      <option value={JSON.stringify({id: userInfo?.parents[0]?.email, name: userInfo?.parents[0]?.firstName + ' ' + userInfo?.parents[0]?.lastName})}>
                        {userInfo?.parents[0]?.firstName + ' ' + userInfo?.parents[0]?.lastName}
                      </option>
                    )}
                    {userInfo?.parents?.length > 1 && (
                      <option value={JSON.stringify({id:userInfo?.parents[1]?.email, name: userInfo?.parents[1]?.firstName + ' ' + userInfo?.parents[1]?.lastName})}>
                        {userInfo?.parents[1]?.firstName + ' ' + userInfo?.parents[1]?.lastName}
                      </option>
                    )}
                  </select>
                </div>

                <h5 className="text-dark fw-bold">Use saved Credit Card?</h5>

                <div className="py-2">
                  <select className="w-25 p-2 rounded outline-0 border border_gray  mb-3 "
                  disabled={whoPaysId !== 'Select' || !hasSavedCC}
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
                  disabled={whoPaysId !== "Select" || savedCCSelected}
                  setCardFormValid={setIsCardValid}
                />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={savePaymentFutureUse}
                    onChange={(e) => setSavePaymentFutureUse(e.target.checked)}
                    id="flexCheckDefault"
                    disabled={whoPaysId !== 'Select' || savedCCSelected}
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
                      if(whoPaysId !== 'Select'){
                        console.log('parents')
                        sendEmailToWhoPays()
                        setErr('✅ You successfully bought class.')
                      } else{
                        if(savedCCSelected){
                          console.log('saved cc')
                          scheduleSaved()
                          setErr('✅ You successfully bought class.')
                        }else{
                          if(isCardValid) {
                              console.log('do save valid unsaved cc')
                              setConfirmPayment(true)
                              scheduleNoSaved()
                          }else{
                            console.log('unvalid unsaved cc')
                            setErr('Unfortunately your signed data mismatched, please try again or contact us.')
                          }
                        }
                      }
                      setTimeout(() => {
                        navigation.push('/student/calandar')
                      }, 3000)
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

export default withRole(StudentRegistrationCCPay, ["Student"]);
