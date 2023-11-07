import { apiClient } from "../../api/client";

export default async (id) => {
  let url = `/event/booking-acceptance/${id}`;
  const response = await apiClient.get(url);
  return response;
};
