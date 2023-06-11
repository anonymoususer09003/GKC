import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import CreateCustomer from "../../../services/stripe/CreateStripeCustomer";
import OneTimePayment from "../../../services/stripe/OneTimePayment";
import SavePaymentCard from "../../../services/stripe/SavePaymentCard";
import GetUserInfo from "../../../services/user/GetUserDetail";
const PaymentForm = ({
  isEdit,
  onClose,
  title,
  onValueReceived,
  onPay,
  userInfo,
  onPaymentRequest,
  oneTimePayment,
  savePaymentFutureUse,
  disabled,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [billingDetail, setBillingDetail] = useState({
    name: "",
    address: "",
    vatNumber: "",
    vatType: "",
  });
  const onChange = (e) => {
    setBillingDetail({ ...billingDetail, [e.target.name]: e.target.value });
    onValueReceived(billingDetail);
  };

  const handlePayment = async () => {
    try {
      const { paymentMethod } = await stripe?.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        card: elements.getElement(CardExpiryElement),
        card: elements.getElement(CardCvcElement),
        billing_details: {
          name: billingDetail.name,
          email: userInfo?.email || "",
          address: {
            city: null,
            country: null,
            line1: userInfo?.address1 || userInfo?.address2 || "USA",
            line2: null,
            postal_code: userInfo?.zipCode || "54545",
            state: null,
          },
        },
      });
      let res = null;
      if (oneTimePayment) {
        res = await OneTimePayment({
          paymentId: paymentMethod?.id,
        });
      }
      {
        res = await CreateCustomer({
          paymentId: paymentMethod?.id,
        });
        onPaymentRequest("success");
      }
      // if (savePaymentFutureUse) {
      //   const userInfo = await GetUserInfo();
      //   console.log("userinfo", userInfo.data);
      //   SavePaymentCard({
      //     paymentId: paymentMethod?.id,
      //     whoPaysId: userInfo?.data?.id,
      //   });
      // }
      console.log("res", res);
      console.log("paymentMethod", paymentMethod);
    } catch (err) {
      onPaymentRequest("failed");
      console.log("err0000-", err);
    }
  };

  useEffect(() => {
    if (onPay) {
      oneTimePayment ? OneTimePayment() : handlePayment();
    }
  }, [onPay]);
  return (
    <form style={{ height: "90%" }} onSubmit={handlePayment}>
      <h4 className="text-dark fw-bold pb-2">{title}</h4>
      <div>
        <input
          name="name"
          disabled={disabled}
          placeholder="name"
          className="w-100 p-2 rounded outline-0 border border_gray  my-2"
          onChange={(e) => onChange(e)}
        />

        <CardNumberElement
          disabled={true}
          className="w-100 p-2 rounded outline-0 border border_gray text_gray  my-2"
          options={{
            disabled,
          }}
        />

        <div className="d-flex gap-2 my-3">
          <div className="w-100">
            <CardCvcElement
              disabled={true}
              placeholder="akka"
              className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
              options={{
                disabled,
              }}
            />
          </div>
          <div className="w-100">
            <CardExpiryElement
              disabled={true}
              className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
              options={{
                disabled,
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default PaymentForm;
