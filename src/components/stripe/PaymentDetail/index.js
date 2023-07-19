import React, { useEffect, useState } from "react";
import PaymentForm from "../PaymentForm";
import { useRouter } from "next/router";
import { ParentNavbar, Footer } from "../../";
import GetUserCardDetail from "@/services/stripe/GetUserCardDetail";
import styles from "./payment.module.css"


export default function index() {
  
  const navigation = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCvv] = useState();
  const [expiration, setExpiration] = useState();
  // const [cardDetail, setCardDetail] = useState({
  //   name: "Name as it appears on your credit card",
  //   cardNumber: "Card Number",
  //   brand: "CVV",
  //   expiry: "Expiration",
  // });

  const handleOnClick = () => {
    if (isEdit) {
    } else {
      setIsEdit(true);
    }
  };

  const fetchUserCardDetail = async () => {
    try {
      let res = await GetUserCardDetail();
      const data = res?.data;
      setCardName(data?.cardOwner || "")
      setCardNumber("***********" + data?.last4Digits)
      setCvv(data?.brand)
      setExpiration(data?.expMonth + "/" + data?.expYear)
      // setCardDetail({
      //   name: data?.cardOwner || "",
      //   cardNumber: "***********" + data?.last4Digits,
      //   brand: data?.brand,
      //   expiry: data?.expMonth + "/" + data?.expYear,
      // });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchUserCardDetail();
  }, []);

  return (
    <main className=" d-flex flex-column justify-content-between  min-vh-100 p3">
      <div className={`m-auto ${styles.paymentWrapper}`}>
        <div>
          {isEdit && (
            <PaymentForm
              disabled={isEdit ? false : true}
              title="Credit card information"
            />
          )}
          {!isEdit && (
            <>
              <h4 className="text-dark fw-bold pb-2">
                Credit card information
              </h4>
              {/* {Object.keys(cardDetail).map((item, index) => {
                return (
                  <div key={index} style={{ height: "90%" }}>
                    <div>
                      <input
                        disabled={true}
                        placeholder={item}
                        className="w-100 p-2 rounded outline-0 border border_gray  my-2"
                        value={cardDetail[item]}
                      />
                    </div>
                  </div>
                );
              })} */}
              <input 
                style={{ height: "90%" }} 
                className="w-100 p-2 rounded outline-0 border border_gray  my-2" 
                placeholder="Name as it appears on your credit card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <input 
                style={{ height: "90%" }} 
                className="w-100 p-2 rounded outline-0 border border_gray  my-2" 
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="form-row">
                <input 
                  style={{ height: "90%", width:'50%', marginRight:'30px' }} 
                  className="p-2 rounded outline-0 border border_gray my-2" 
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                  <input 
                    style={{ width:'45%' }} 
                    className="p-2 rounded outline-0 border border_gray my-2"
                    type="text"
                    placeholder="Expiration"
                    onChange={(e) => setExpiration(e.target.value)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={expiration}
                  />
              </div>
            </>
          )}
          <div className="d-flex gap-2 justify-content-center mt-3">
            {isEdit && (
              <button
                className="w-25 btn_primary text-light p-2 rounded fw-bold "
                onClick={() => setIsEdit(false)}
              >
                Back
              </button>
            )}
            <button
              className="w-25 btn_primary text-light p-2 rounded fw-bold "
              onClick={handleOnClick}
            >
              {isEdit ? "Save" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
