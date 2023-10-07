import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51J3XIEHpP2GPUgokcLLLj3yv4Rq8j2t3VoODgaRTroFghAVHjdkqh9lfTEnoFNUXcsH6LDhB59FEas7of46GYj0J006GCWRtqf'
);

const StripeComponent = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeComponent;
