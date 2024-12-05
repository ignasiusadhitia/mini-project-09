import axios from 'axios';

// Base URLs
const BASE_URLS = {
  dash: import.meta.env.VITE_DASH_API_BASE_URL || 'http://localhost:3000',
  front: import.meta.env.VITE_FRONT_API_BASE_URL || 'http://localhost:3000',
};

// Function to create Axios instance dynamically
export const createAxiosInstance = ({
  baseURLKey = 'dash', // Default to BASE_URL_1
  headers = {},
  auth = false,
  multipart = false,
  token = '',
  apiKey = '',
} = {}) => {
  const instance = axios.create({
    baseURL: BASE_URLS[baseURLKey],
    headers: {
      'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
      ...headers,
    },
  });

  // Add x-api-key dynamically if provided
  if (apiKey) {
    instance.defaults.headers['x-api-key'] = apiKey;
  }

  // Add Authorization header dynamically
  if (auth) {
    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Attach global error handler
  instance.interceptors.response.use(
    (response) => response,
    (error) => globalErrorHandler(error)
  );

  return instance;
};

// Global Error Handler
const globalErrorHandler = (error) => {
  if (error.response) {
    console.error('Error Response:', error.response);

    switch (error.response.status) {
      case 401:
        console.error('Unauthorized: Redirecting to login...');
        window.location.href = '/login';
        break;
      case 403:
        console.error('Forbidden: Insufficient permissions');
        break;
      case 500:
        console.error('Internal Server Error');
        break;
      default:
        console.error(
          `Error ${error.response.status}:`,
          error.response.data?.message || 'Unknown error'
        );
    }
  } else if (error.request) {
    console.error('No response received from server:', error.request);
  } else {
    console.error('Error:', error.message);
  }

  return Promise.reject(error);
};
