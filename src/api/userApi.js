import apiClient from "./apiClient";

export const getAllUsers = async () => {
  const { data } = await apiClient.get("/user/all");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await apiClient.get(`/user/${id}`);
  return data;
};

export const createUser = async (userData) => {
  const parsedUserData = {
    ...userData,
    rol: userData.rol ? userData.rol.toUpperCase() : undefined,
    createdAt: userData.createdAt
      ? new Date(userData.createdAt).toISOString().split("T")[0]
      : undefined,
    updatedAt: userData.updatedAt
      ? new Date(userData.updatedAt).toISOString().split("T")[0]
      : undefined,
    deletedAt: userData.deletedAt
      ? new Date(userData.deletedAt).toISOString().split("T")[0]
      : undefined,
  };

  const { data } = await apiClient.post("/user", parsedUserData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const updateUser = async (id, userData) => {
  const numericId = Number(id); // Convierte id a número

  if (isNaN(numericId)) {
    throw new Error("El ID del usuario no es un número válido.");
  }

  const parsedUserData = {
    ...userData,
    rol: userData.rol ? userData.rol.toUpperCase() : undefined,
    createdAt: userData.createdAt
      ? new Date(userData.createdAt).toISOString().split("T")[0]
      : undefined,
    updatedAt: userData.updatedAt
      ? new Date(userData.updatedAt).toISOString().split("T")[0]
      : undefined,
    deletedAt: userData.deletedAt
      ? new Date(userData.deletedAt).toISOString().split("T")[0]
      : undefined,
  };

  const { data } = await apiClient.put(`/user/${numericId}`, parsedUserData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};


export const updateUserStatus = async (id, status) => {
  const numericId = parseInt(id, 10);
  const { data } = await apiClient.put(`/user/status/${numericId}`, { status });
  return data;
};
