import apiClient from "./apiClient";

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post("/media/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const deleteMedia = async (fileId) => {
  const { data } = await apiClient.delete(`/media/${fileId}`);
  return data;
};
