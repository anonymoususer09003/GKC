import { apiClient } from "../../api/client";

export default async (body) => {
  const response = await apiClient.post(
    `/stripe/save-card-payment-intent`,
    body
  );
  return response;
};
