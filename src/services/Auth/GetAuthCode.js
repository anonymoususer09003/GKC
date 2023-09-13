import { apiClient } from "../../api/client";

export default async (email) => {
  const response = await apiClient.get(`/auth/code?email=${email}`);
  return response;
};
