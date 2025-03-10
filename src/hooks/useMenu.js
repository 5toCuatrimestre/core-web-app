import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMenu, updateMenu } from "../api/menuApi";

export const useMenu = () => useQuery({ queryKey: ["menu"], queryFn: getMenu });

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMenu,
    onSuccess: () => queryClient.invalidateQueries(["menu"]),
  });
};
