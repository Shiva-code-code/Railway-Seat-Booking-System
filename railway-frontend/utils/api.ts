import axios from 'axios';

const API = axios.create({
  baseURL: '🔗 https://9254-103-52-38-4.ngrok-free.app', 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token && req.headers) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
