import apiClient from "./apiClient";

// Obtener la información de la empresa
export const getCompanyInfo = async () => {
  const { data } = await apiClient.get("/companies/1");
  return data;
};

// Subir logo de la empresa (devuelve la URL de la imagen)
export const uploadCompanyLogo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post("/api/storage/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data; // Devuelve la URL de la imagen subida
};

export const updateCompanyLogo = async ({ imageUrl }) => {
  const encodedUrl = encodeURIComponent(imageUrl); // Codifica la URL correctamente
  const { data } = await apiClient.put(`/companies/1/image?imageUrl=${encodedUrl}`);
  return data;
};

