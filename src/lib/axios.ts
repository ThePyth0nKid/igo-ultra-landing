import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // uses your .env variable
});

// Automatically attach token if present, except for public routes
API.interceptors.request.use((config) => {
  const publicRoutes = ["/users/register", "/token", "/token/refresh"];

  const isPublic = publicRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (!isPublic) {
    const token = localStorage.getItem("access_token");;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;
