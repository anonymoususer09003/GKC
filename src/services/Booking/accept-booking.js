import { apiClient } from "../../api/client";

export default async (id) => {
  let url = `/event/booking-acceptance/accept/${id}`;
  const response = await apiClient.post(url, {});
  return response;
};
