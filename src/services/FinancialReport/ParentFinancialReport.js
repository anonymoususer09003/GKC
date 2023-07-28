import { apiClient } from "../../api/client";

export default async ({ page, size }) => {
  const response = await apiClient.get(
    `/financial/logged-parent-report?page=${page}&size=${size}`
  );
  return response;
};
