import apiClient from "./apiClient";

export const getAllProducts = async () => {
  const { data } = await apiClient.get("/product/all");
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await apiClient.post("/product", productData);
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await apiClient.put(`/product/${id}`, productData);
  return data;
};
