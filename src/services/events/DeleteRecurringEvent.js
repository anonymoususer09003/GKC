import { apiClient } from "../../api/client";

export default async (id) => {
  const response = await apiClient.delete(
    `/event/delete-all-occurrences?eventId=${id}`
  );
  return response;
};
