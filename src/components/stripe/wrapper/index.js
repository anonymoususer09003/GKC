import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51L9vs2JJ9lJUrkO5jZFlA7HSWO0r8dYbnHplnQeSxuMYts0JFWQkamKrpqmP4Y5eUFDKFx116F8Sv1crhu2SKMPD00yOLQHeJB"
);

const StripeComponent = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeComponent;
