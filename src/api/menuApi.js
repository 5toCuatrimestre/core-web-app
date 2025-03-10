import apiClient from "./apiClient";

export const getMenu = async () => {
  const { data } = await apiClient.get("/menu");
  return data;
};

export const updateMenu = async (menuData) => {
  const { data } = await apiClient.put("/menu", menuData);
  return data;
};
