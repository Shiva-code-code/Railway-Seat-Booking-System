import axios from 'axios';

const API = axios.create({
  baseURL: 'https://railway-backend-production.up.railway.app',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token && req.headers) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
