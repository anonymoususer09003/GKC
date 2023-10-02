import axios from 'axios';
// export const base_url = 'https://staging-api.geekkidscode.com';

//-----------live url -------------------
export const base_url = 'https://live-api.geekkidscode.com';

const apiClient = axios.create({
  baseURL: base_url,
});

// Add a request interceptor

apiClient.interceptors.request.use(
  async function (config) {
    const token = window.localStorage.getItem('gkcAuth');
    console.log('token', token);
    if (token) {
      switch (config.url) {
        default:
          config.headers.Authorization =
            'Bearer ' + JSON.parse(token)?.accessToken;
      }
    }
    // Modify the request config before sending the request
    // For example, you can add headers or modify the URL
    // config.headers['Authorization'] = 'Bearer your-token';

    return config;
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Handle the response data
    // For example, you can parse the response or transform it before returning
    // response.data = transformResponse(response.data);

    return response;
  },
  function (error) {
    // Handle response errors
    return Promise.reject(error);
  }
);

// Usage example
export { apiClient };
