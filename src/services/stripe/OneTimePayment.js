import { apiClient } from "../../api/client";

export const OneTimePayment = async (body) => {
  const response = await apiClient.post(
    `/stripe/one-time-payment-intent`,
    body
  );
  console.log("responses", response);
  return response;
};
