import { apiClient } from "../../api/client";

export default async (id) => {
  const response = await apiClient.get(
    `/event/get-unconfirmed-class-details?unconfirmedClassId=${id}`
  );
  return response;
};
