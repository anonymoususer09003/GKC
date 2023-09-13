import { apiClient } from "../../api/client";

export default async (id) => {
  const response = await apiClient.get(`/user/details/{userId}?userId=${id}`);
  return response;
};
