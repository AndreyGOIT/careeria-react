import axios from "axios";

// Base configuration
const api = axios.create({
  baseURL: "https://nwbackendandy.azurewebsites.net/api",
  // baseURL: "http://localhost:5109/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor for automatic token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;