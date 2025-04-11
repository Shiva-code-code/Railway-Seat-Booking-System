import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token && req.headers) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
