import axios from 'axios';

const API = axios.create({
  baseURL: 'https://railway-seat-booking-system.onrender.com',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token && req.headers) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;

