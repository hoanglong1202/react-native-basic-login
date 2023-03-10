import axios from 'axios';
const apiUrl = 'https://dev.fuku-sin.jp/api';

const axiosClient = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('error 1');
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    console.log('response', response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('error 2', error);
    return Promise.reject(error);
  },
);

export default axiosClient;
