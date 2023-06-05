import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const StripeComponent = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeComponent;
