import apiClient from "./apiClient";

export const getAllUsers = async () => {
  const { data } = await apiClient.get("/user/all");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await apiClient.get(`/user/${id}`);
  return data;
};

export const createUser = async (userData) => {
  const { data } = await apiClient.post("/user", userData);
  return data;
};

export const updateUser = async (id, userData) => {
  const { data } = await apiClient.put(`/user/${id}`, userData);
  return data;
};

export const updateUserStatus = async (id, status) => {
  const { data } = await apiClient.put(`/user/status/${id}`, { status });
  return data;
};