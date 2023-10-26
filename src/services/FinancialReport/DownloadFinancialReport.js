import axios from 'axios';
import { base_url } from '../../api/client';
export default async ({ filter }) => {
  let url = `/financial/logged-user-pdf-report`;
  if (filter) url = url + filter;
  const token = window.localStorage.getItem('gkcAuth');
  const response = await axios({
    method: 'get',
    url: base_url + url,
    responseType: 'arraybuffer', // Set the response type to 'arraybuffer' for binary data
    headers: {
      Authorization: 'Bearer ' + JSON.parse(token)?.accessToken,
    },
  });

  return response;
};
