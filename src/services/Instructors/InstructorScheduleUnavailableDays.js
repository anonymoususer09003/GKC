import { apiClient } from "../../api/client";

export default async (id) => {
  const response = await apiClient.get(
    `/instructor/schedule-and-unavailable-days-iCal?instructorId=${id}`
  );
  return response;
};
