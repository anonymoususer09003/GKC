import { apiClient } from '../../api/client';

export default async (message) => {
  let url = '/contactus/save-contact-us-from-logged-customer';
  const response = await apiClient.post(url, { message500Chars: message });
  return response;
};
