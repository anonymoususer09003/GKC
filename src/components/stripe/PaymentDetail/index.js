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
  const [savePaymentFutureUse, setSavePaymentFutureUse] = useState(false)
  const [cardDetail, setCardDetail] = useState({
    name: "...Loading card owner",
    cardNumber: "...Loading card number",
    brand: "...Loaing brand name",
    expiry: "...Loading expiry date",
  });


  useEffect(() => {
    (async ()=>{
      const responce = await GetUserDetail();
      setUserInfo(responce.data)
    })()
    if(window.localStorage.getItem("stripeForm") === 'true'){
      setIsEdit(false);
      fetchUserCardDetail();
    }
  }, []);
  
  const handleOnClick = () => {
    if (isEdit) {
      // setIsEdit(false);
      setOnPay(!onPay)
      setSavePaymentFutureUse(!savePaymentFutureUse)
    }
    setTimeout(() => {
      Router.reload()
    }, 1400);
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
    <main className=" d-flex flex-column min-vh-100 p3">
      <div className={`${styles.paymentWrapper}`} style={{margin: '40px auto'}}>
      <div>
      {
        !isEdit && 
          <div>
          <h4 style={{fontWeight:700, marginBottom:20}}>Credit card information</h4>
          <div style={{display: 'flex', flexDirection:'column', gap:'15px', fontSize: 20}}>
            <input className="p-2 rounded w-100 border_gray"
              placeholder="card owner"
              value={cardDetail.name}
              disabled
            />
            <input className="p-2 rounded w-100 border_gray"
              placeholder="card number"
              value={cardDetail.cardNumber}
              disabled
            />
            <div className="d-flex" style={{justifyContent: 'space-between'}}>
            <input className="p-2 rounded border_gray" style={{width: '49%'}}
              placeholder="card brand"
              value={cardDetail.brand}
              disabled
            />
            <input className="p-2 rounded border_gray" style={{width: '49%'}}
              placeholder="card expiry date"
              value={cardDetail.expiry}
              disabled
            />
            </div>
            </div>
          </div>}
          {
            isEdit && 
            <>
            <div
            style={{fontSize: 20}}
            >
            <PaymentForm
                title={'Credit card information'}
                disabled={isEdit ? false : true}
                onValueReceived={handleValueReceived}
                userInfo={userInfo}
                setCardFormValid={setCardFormValid}
                onPaymentRequest={handlePaymentRequest}
                savePaymentFutureUse={savePaymentFutureUse}
                oneTimePayment={false}
                onPay={onPay}
              />
            </div>
          </>
          }
          <div className="d-flex gap-2 justify-content-center mt-3">
            {!isEdit && (
              <button
                className="w-25 btn_primary text-light p-2 rounded fw-bold "
                onClick={() => {setIsEdit(true); window.localStorage.removeItem('stripeForm');}}
              >
                Update
              </button>
            )}
            {isEdit &&              
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

