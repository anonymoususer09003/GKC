import { apiClient } from "../../api/client";

export default async ({ filter }) => {
  let url = `/financial/logged-student-report}`;
  if (filter) url = url + filter;

  const response = await apiClient.get(url);

  return response;
};
