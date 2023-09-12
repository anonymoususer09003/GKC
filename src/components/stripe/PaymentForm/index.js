import React, { useState, useEffect } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import CreateCustomer from '../../../services/stripe/CreateStripeCustomer';
import { OneTimePayment } from '../../../services/stripe/OneTimePayment';
import SavePaymentCard from '../../../services/stripe/SavePaymentCard';
import GetUserInfo from '../../../services/user/GetUserDetail';
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
  setCardFormValid,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isCardExpiryValid, setIsCardExpiryValid] = useState(false);
  const [isCardCvcValid, setIsCardCvcValid] = useState(false);
  const [billingDetail, setBillingDetail] = useState({
    name: '',
    address: '',
    vatNumber: '',
    vatType: '',
  });

  const onChange = (e) => {
    setBillingDetail({ ...billingDetail, [e.target.name]: e.target.value });
    onValueReceived(billingDetail);
  };

  const handleElementChange = (event) => {
    
    const elementType = event.elementType;
    const isElementValid = event.complete && !event.error;
    elementType === 'cardNumber'
      ? setIsCardNumberValid(isElementValid)
      : elementType === 'cardExpiry'
      ? setIsCardExpiryValid(isElementValid)
      : elementType === 'cardCvc'
      ? setIsCardCvcValid(isElementValid)
      : null;
    // Check if all card elements are valid to update the overall form validity
    setCardFormValid(
      (elementType === 'cardNumber' ? isElementValid : isCardNumberValid) &&
        (elementType === 'cardExpiry' ? isElementValid : isCardExpiryValid) &&
        (elementType === 'cardCvc' ? isElementValid : isCardCvcValid)
    );

    // setCardFormValid(isCardNumberValid && isCardExpiryValid && isCardCvcValid);
  };

  let paymentMethodId = null;
  const handlePayment = async () => {
    try {
      const responce = await stripe?.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        card: elements.getElement(CardCvcElement),
        card: elements.getElement(CardExpiryElement),
        billing_details: {
          name: billingDetail.name,
          email: userInfo?.email || '',
          address: {
            city: null,
            country: null,
            line1: userInfo?.address1 || userInfo?.address2 || 'USA',
            line2: null,
            postal_code: userInfo?.zipCode || '54545',
            state: null,
          },
        },
      });
      let res = null;
      paymentMethodId = responce?.paymentMethod?.id;
      
      if (oneTimePayment) {
        handleOneTimePayment(paymentMethodId);
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
          paymentMethodId: paymentMethodId,
        });
        onPaymentRequest(true);
      }
      if (savePaymentFutureUse) {
        SavePaymentCard({
          paymentId: paymentMethodId,
          whoPaysId: data?.whoPaysId || userInfo?.id,
          ...data,
        });
      }
      onPaymentRequest(true);
    } catch (err) {
      onPaymentRequest(false);
      console.log('err0000-', err);
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
        console.log('err', error);
        onPaymentRequest({
          ...error,
          paymentIntentId: paymentMethodId,
          status: error?.payment_intent?.status,
        });
      } else {
        console.log('res', paymentIntent);
        onPaymentRequest({
          ...paymentIntent,
          paymentIntentId: paymentMethodId,
        });
        console.log('Payment successful!');
        // Perform any necessary actions after successful payment
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    if (onPay) {
      handlePayment();
    }
  }, [onPay]);

  return (
    <form style={{ height: '90%' }}>
      <h4 className="text-dark fw-bold pb-2">{title}</h4>
      <div>
        <input
          name="name"
          disabled={disabled}
          placeholder="Name as it appears on your credit card"
          className="w-100 p-2 rounded outline-0 border border_gray  my-2"
          onChange={(e) => onChange(e)}
        />
        <CardNumberElement
          disabled={true}
          className="w-100 p-2 rounded outline-0 border border_gray text_gray  my-2"
          options={{
            disabled,
          }}
          onChange={(event) => handleElementChange(event)}
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
              onChange={(event) => handleElementChange(event)}
            />
          </div>
          <div className="w-100">
            <CardExpiryElement
              disabled={true}
              className="w-100 p-2 rounded outline-0 border border_gray text_gray  mb-3"
              options={{
                disabled,
              }}
              onChange={(event) => handleElementChange(event)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default PaymentForm;
