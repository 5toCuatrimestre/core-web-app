import axios from "axios";

// Usar la IP de la laptop para acceder desde otros dispositivos en la red
const baseURL = "http://192.168.0.146:5000/core";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
