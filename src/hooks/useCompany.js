import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanyInfo, updateCompanyInfo } from "../api/companyApi";

export const useCompanyInfo = () => useQuery({ queryKey: ["companyInfo"], queryFn: getCompanyInfo });

export const useUpdateCompanyInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyInfo,
    onSuccess: () => queryClient.invalidateQueries(["companyInfo"]),
  });
};
