// hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, createProduct, updateProduct } from "../api/productApi";

export const useAllProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: getAllProducts });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, productData }) => updateProduct(id, productData),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
};
