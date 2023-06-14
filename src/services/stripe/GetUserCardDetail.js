import { apiClient } from "../../api/client";

export default async (body) => {
  const response = await apiClient.get(`/stripe/get-logged-user-card-details`);
  return response;
};
