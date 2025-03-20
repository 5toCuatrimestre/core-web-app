// api/storageApi.js
import apiClient from "./apiClient";

// Función para subir imagen
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post("/api/storage/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // Ahora data es directamente la URL, no necesitamos acceder a data.url
  console.log("Imagen subida con éxito, URL:", data); // Verifica que la URL esté correctamente recibida
  return data; // Retornamos directamente la URL
};

// src/api/storageApi.js
export const createMultimedia = async (url) => {
  const requestBody = { url };
  console.log("Cuerpo de la solicitud a /core/multimedia:", requestBody);

  try {
    const { data } = await apiClient.post("/multimedia", requestBody); // Realizamos la petición

    // Log para verificar la respuesta completa
    console.log("Respuesta del servidor al crear multimedia:", data);

    // Accediendo correctamente al multimediaId en el campo result
    if (data && data.result && data.result.multimediaId) {
      return { id: data.result.multimediaId }; // Retornamos el ID correcto
    } else {
      console.error("El servidor no devolvió el ID de la multimedia.");
      return { id: null }; // Devolvemos null si no se encontró el ID
    }
  } catch (error) {
    console.error("Error al crear multimedia:", error);
    throw error;
  }
};
