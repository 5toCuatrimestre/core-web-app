import apiClient from "./apiClient";

export const getAllCategories = async () => {
  const { data } = await apiClient.get("/category/all");
  return data;
};
