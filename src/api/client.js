import axios from 'axios';
export const base_url = 'http://34.227.65.157';
// Create an instance of Axios with a base URL
const apiClient = axios.create({
  baseURL: 'http://34.227.65.157',
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
