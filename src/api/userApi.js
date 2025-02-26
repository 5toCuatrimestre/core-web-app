import apiClient from "./apiClient";

export const getAllUsers = async () => {
  const { data } = await apiClient.get("/user/all");
  return data; 
};
