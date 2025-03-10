import apiClient from "./apiClient";

export const getAllStyles = async () => {
  const { data } = await apiClient.get("/style/all");
  return data;
};

export const updateStyle = async (id, styleData) => {
  const { data } = await apiClient.put(`/style/${id}`, styleData);
  return data;
};
