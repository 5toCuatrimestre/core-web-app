import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, getUserById, createUser, updateUser, updateUserStatus } from "../api/userApi";

// Hook para obtener todos los usuarios
export const useAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

// Hook para obtener un usuario por ID
export const useUserById = (id) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Solo se ejecuta si id tiene un valor válido
  });

// Hook para crear un usuario
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Refresca la lista de usuarios
    },
  });
};

// Hook para actualizar un usuario
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userData }) => updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user", id]); // Refresca el usuario específico
    },
  });
};

// Hook para actualizar el estado del usuario (activo/inactivo)
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user", id]);
    },
  });
};
