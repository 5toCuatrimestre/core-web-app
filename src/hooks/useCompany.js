import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanyInfo, uploadCompanyLogo, updateCompanyLogo } from "../api/companyApi";

// Obtener la información de la empresa
export const useCompanyInfo = () =>
  useQuery({ queryKey: ["companyInfo"], queryFn: getCompanyInfo });

// Actualizar la información de la empresa
export const useUpdateCompanyInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyInfo,
    onSuccess: () => queryClient.invalidateQueries(["companyInfo"]),
  });
};

// Subir el logo de la empresa
export const useUploadCompanyLogo = () => {
  return useMutation({
    mutationFn: uploadCompanyLogo,
  });
};

// Actualizar la URL del logo en la empresa
export const useUpdateCompanyLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyLogo,
    onSuccess: () => queryClient.invalidateQueries(["companyInfo"]),
  });
};
