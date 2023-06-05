import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ isEdit, onClose, title }) => {
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
  };

  const handlePayment = async (event) => {
    try {
      event.preventDefault();
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        card: elements.getElement(CardExpiryElement),
        card: elements.getElement(CardCvcElement),
        billing_details: {
          name: billingDetail.name,
          email: "",
          address: {
            city: null,
            country: null,
            line1: billingDetail.address || "AA",
            line2: null,
            postal_code: "54545",
            state: null,
          },
        },
      });
    } catch (err) {
      console.log("err0000-", err);
    }
  };
  return (
    <form style={{ height: "90%" }} onSubmit={handlePayment}>
      <h4 className="text-dark fw-bold pb-2">{title}</h4>
      <div>
        <input
          name="name"
          placeholder="name"
          className="w-100 p-2 rounded outline-0 border border_gray  my-2"
          onChange={(e) => onChange(e)}
        />

        <CardNumberElement className="w-100 p-2 rounded outline-0 border border_gray text_gray  my-2" />
        <div className="d-flex gap-2 my-3">
          <div className="w-100">
            <CardCvcElement
              placeholder="akka"
              className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
            />
          </div>
          <div className="w-100">
            <CardExpiryElement className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3" />
          </div>
        </div>
      </div>
    </form>
  );
};
export default PaymentForm;
