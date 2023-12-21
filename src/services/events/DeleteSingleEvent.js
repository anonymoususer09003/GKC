import { apiClient } from "../../api/client";

export default async (data) => {
  const response = await apiClient.delete(`/event/delete-single-occurrence`, {
    data,
  });
  return response;
};
