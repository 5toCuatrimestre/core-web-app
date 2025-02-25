import axios from "axios";

// Correcto (URL relativa para que el proxy funcione)
const apiClient = axios.create({
  baseURL: "/core",
  headers: { "Content-Type": "application/json" },
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
