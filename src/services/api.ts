import axios from "axios";

// Базовая конфигурация
const api = axios.create({
  baseURL: "http://localhost:5109/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для автоматической подстановки токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;