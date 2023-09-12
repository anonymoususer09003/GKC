import { apiClient } from "../../api/client";

export default async () => {
  const response = await apiClient.get(
    `/review/get-instructors-from-logged-parent`
  );
  return response;
};
