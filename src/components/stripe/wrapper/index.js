import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_live_51J3XIEHpP2GPUgoko3NIF9po8yOlaCzmspoAJNICnVU46PQFPW0nsJy6lsI0EFQossiQFO97ay5jn5c6xvhsoTXd00pP8etsw6'
);

const StripeComponent = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeComponent;
