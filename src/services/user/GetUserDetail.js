import { apiClient } from "../../api/client";

export default async () => {
  const response = await apiClient.get(`/user/logged-user-details`);
  return response;
};
