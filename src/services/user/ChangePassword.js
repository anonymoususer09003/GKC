import { apiClient } from "../../api/client";

export default async (body) => {
  const response = await apiClient.put(`/user/change-password`, body);
  return response;
};
