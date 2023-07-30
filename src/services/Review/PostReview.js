import { apiClient } from "../../api/client";

export default async (body) => {
  const response = await apiClient.post(`/review`, body);
  return response;
};
