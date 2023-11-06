import { apiClient } from "../../api/client";

export default async (body) => {
  let url = "/event/booking-acceptance";
  const response = await apiClient.post(url, body);
  return response;
};
