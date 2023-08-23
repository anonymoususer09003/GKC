import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParentNavbar, Footer } from "../../";
import GetUserCardDetail from "@/services/stripe/GetUserCardDetail";
import GetUserDetail from "../../../services/user/GetUserDetail";
import styles from "./payment.module.css"
import PaymentForm from '@/components/stripe/PaymentForm';
import Router from "next/router";


export default function index() {
  
  const navigation = useRouter();
  const [isEdit, setIsEdit] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [cardFormValid, setCardFormValid] = useState(false);
  const [nameCard, setNameCard] = useState('');
  const [onPay, setOnPay] = useState(false)
  const [cardDetail, setCardDetail] = useState({
    name: "Name as it appears on your credit card",
    cardNumber: "Card Number",
    brand: "CVV",
    expiry: "Expiration",
  });


  useEffect(() => {
    if(window.localStorage.getItem("stripeForm") === 'true'){
      setIsEdit(false);
      fetchUserCardDetail();
    }
    var stored = JSON.parse(window.localStorage.getItem("registrationForm"))
    setUserInfo(stored)
  }, [cardDetail]);
  
  const handleOnClick = () => {
    if (isEdit) {
      setIsEdit(false);
      setOnPay(!onPay)
      fetchUserCardDetail()
    }
    window.localStorage.setItem("stripeForm", 'true')
  };

  const fetchUserCardDetail = async () => {
    try { 
      if(window.localStorage.getItem("stripeForm") === 'true'){
        let res = await GetUserCardDetail();
        const data = res?.data;
        setCardDetail({
          name: data?.cardOwner || "",
          cardNumber: "***********" + data?.last4Digits,
          brand: data?.brand,
          expiry: data?.expMonth + "/" + data?.expYear,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleValueReceived = (value) => {
    setNameCard(value.name);
    // Do something with the value in the parent component
  };
  const handlePaymentRequest = (status) => {
    // navigation.push('/parent');
  };

  return (
    <main className=" d-flex flex-column justify-content-between  min-vh-100 p3">
      <div className={`m-auto ${styles.paymentWrapper}`}>
      <div>
      {
        !isEdit && 
          <div>
          <h4 style={{fontWeight:700, marginBottom:20}}>Credit card information</h4>
          <div style={{display: 'flex', flexDirection:'column', gap:'15px'}}>
            <input className="p-2 rounded w-100 border_gray"
              placeholder="card owner"
              value={cardDetail.name}
              disabled={false}
            />
            <input className="p-2 rounded w-100 border_gray"
              placeholder="card number"
              value={cardDetail.cardNumber}
              disabled={false}
            />
            <div className="d-flex" style={{justifyContent: 'space-between'}}>
            <input className="p-2 rounded border_gray" style={{width: '49%'}}
              placeholder="card brand"
              value={cardDetail.brand}
              disabled={false}
            />
            <input className="p-2 rounded border_gray" style={{width: '49%'}}
              placeholder="card expiry date"
              value={cardDetail.expiry}
              disabled={false}
            />
            </div>
            </div>
          </div>}
          {
            isEdit && 
            <>
            <PaymentForm
                title={'Credit card information'}
                disabled={isEdit ? false : true}
                onValueReceived={handleValueReceived}
                userInfo={userInfo}
                setCardFormValid={setCardFormValid}
                onPaymentRequest={handlePaymentRequest}
                savePaymentFutureUse={false}
                oneTimePayment={false}
                onPay={onPay}
              />
          </>
          }
          <div className="d-flex gap-2 justify-content-center mt-3">
            {!isEdit && (
              <button
                className="w-25 btn_primary text-light p-2 rounded fw-bold "
                onClick={() => {setIsEdit(true); window.localStorage.removeItem('stripeForm'); Router.reload();}}
              >
                Back
              </button>
            )}
            {!isEdit &&              
            <button
              className="w-25 btn_primary text-light p-2 rounded fw-bold "
              onClick={handleOnClick}
              disabled={
                cardFormValid && nameCard.length > 0 ? false : true
              }
            >
              {isEdit ? "Save" : "Update"}
            </button>}

          </div>
        </div>
      </div>
    </main>
  );
}

