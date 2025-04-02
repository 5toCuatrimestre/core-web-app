// src/api/authApi.js
import apiClient from "./apiClient";

export async function login(credentials) {
  const { data } = await apiClient.post("/auth/admin/login", credentials);
  return data;
}
