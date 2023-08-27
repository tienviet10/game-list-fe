import axios, { InternalAxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      const newConfig = {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      };
      return newConfig as InternalAxiosRequestConfig;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default client;
