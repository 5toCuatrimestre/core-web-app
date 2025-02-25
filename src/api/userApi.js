import apiClient from "./apiClient";

export const getAllUsers = async () => {
  const { data } = await apiClient.get("/user/all");
  return data; // data debe tener la estructura: { text, type, result: [ ...usuarios ] }
};
