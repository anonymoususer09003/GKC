import { apiClient } from "../../api/client";

export default async (body) => {
  const response = await apiClient.post(
    `/stripe/create-customer-registration-form`,
    body
  );
  return response.data;
};
