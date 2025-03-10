import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllDishes, createDish, updateDish } from "../api/dishApi";

export const useAllDishes = () => useQuery({ queryKey: ["dishes"], queryFn: getAllDishes });

export const useCreateDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDish,
    onSuccess: () => queryClient.invalidateQueries(["dishes"]),
  });
};

export const useUpdateDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dishData }) => updateDish(id, dishData),
    onSuccess: () => queryClient.invalidateQueries(["dishes"]),
  });
};
