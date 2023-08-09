import { apiClient } from "../../api/client";

export default async (body) => {
  const response = await apiClient.post(
    `/event/send-email-to-parent-with-class-information`,
    body
  );
  return response.data;
};
