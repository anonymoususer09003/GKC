import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import CreateCustomer from "../../../services/stripe/CreateStripeCustomer";
import { OneTimePayment } from "../../../services/stripe/OneTimePayment";
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
  data = {},
  setIsCardValid,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [billingDetail, setBillingDetail] = useState({
    name: "",
    address: "",
    vatNumber: "",
    vatType: "",
  });

  const [cardFormValid, setCardFormValid] = useState(false);

  const onChange = (e) => {
    setBillingDetail({ ...billingDetail, [e.target.name]: e.target.value });
    onValueReceived(billingDetail);
  };

  const handleElementChange = (event) => {
    setIsCardValid(event.complete && !event.error);
    setCardFormValid(event.complete && !event.error);
  };
  let paymentMethodId = null;
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
      paymentMethodId = paymentMethod?.id;
      if (oneTimePayment) {
        handleOneTimePayment(paymentMethod?.id);

        // const { error } = await stripe.confirmCardPayment(paymentIntentId, {
        //   payment_method: {
        //     card: elements.getElement(CardElement),
        //     billing_details: {
        //       // Include billing details if required
        //     }
        //   }
        // });
      } else {
        res = await CreateCustomer({
          paymentId: paymentMethod?.id,
        });

        onPaymentRequest(true);
      }
      if (savePaymentFutureUse) {
        SavePaymentCard({
          paymentId: paymentMethod?.id,
          whoPaysId: data?.whoPaysId || userInfo?.id,
          ...data,
        });
      }
    } catch (err) {
      onPaymentRequest(false);
      console.log("err0000-", err);
    }
  };

  const handleOneTimePayment = async (paymentMethodId) => {
    try {
      let res = await OneTimePayment(data);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        res.data,
        {
          payment_method: paymentMethodId,
        }
      );

      if (error) {
        console.log("err", error);
        onPaymentRequest({
          ...error,
          paymentIntentId: paymentMethodId,
          status: "failed",
        });
      } else {
        console.log("res", paymentIntent);
        onPaymentRequest({
          ...paymentIntent,
          paymentIntentId: paymentMethodId,
        });
        console.log("Payment successful!");
        // Perform any necessary actions after successful payment
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (onPay) {
      handlePayment();
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
          onChange={handleElementChange}
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
              onChange={handleElementChange}
            />
          </div>
          <div className="w-100">
            <CardExpiryElement
              disabled={true}
              className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
              options={{
                disabled,
              }}
              onChange={handleElementChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default PaymentForm;
