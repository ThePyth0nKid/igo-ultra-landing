import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // uses your .env variable
});

// Automatically attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
