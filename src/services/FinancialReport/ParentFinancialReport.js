import { apiClient } from '../../api/client';

export default async ({ filter }) => {
  let url = `/financial/logged-parent-report?`;
  if (filter) url = url + filter;
  const response = await apiClient.get(url);
  return response;
};
