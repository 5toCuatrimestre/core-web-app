import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllStyles, updateStyle } from "../api/styleApi";

export const useAllStyles = () => useQuery({ queryKey: ["styles"], queryFn: getAllStyles });

export const useUpdateStyle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, styleData }) => updateStyle(id, styleData),
    onSuccess: () => queryClient.invalidateQueries(["styles"]),
  });
};
