import axios from 'axios';

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(request => {
  console.log(`Request [${request.method.toUpperCase()}] ${request.url}`);
  return request;
});

// Response interceptor
axiosInstance.interceptors.response.use(response => {
  console.log(`Response [${response.status}] ${response.config.url}`);
  return response;
}, error => {
  if (error.response) {
    console.log(`Response [${error.response.status}] ${error.response.config.url}`);
  }
  return Promise.reject(error);
});

export default axiosInstance;
