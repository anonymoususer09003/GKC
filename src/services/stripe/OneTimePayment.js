import { apiClient } from "../../api/client";

export default async (body) => {
  const response = await apiClient.post(
    `/stripe/one-time-payment-intent`,
    body
  );
  return response;
};
