import apiClient from "./apiClient";

export const getMenu = async () => {
  const { data } = await apiClient.get("/menu/1");
  return data;
};

export const updateMenu = async (menuData) => {
  console.log("menuData11111", menuData);
  const { data } = await apiClient.put(`/menu/1`, menuData);
  return data;
};
