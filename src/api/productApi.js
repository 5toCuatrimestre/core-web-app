// api/productApi.js
import apiClient from "./apiClient";

// Obtener todos los productos
export const getAllProducts = async () => {
  const { data } = await apiClient.get("/product/all");
  return data;
};

// Crear un producto
export const createProduct = async (productData) => {
  const { data } = await apiClient.post("/product", {
    ...productData,
    // Se envía multimedia: [{ id: ... }] y productCategories: [{ categoryId: ... }]
  });
  return data;
};

// Actualizar un producto
export const updateProduct = async (id, productData) => {
  const { data } = await apiClient.put(`/product/${id}`, {
    ...productData,
  });
  return data;
};
