import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, getUserById, createUser, updateUser, updateUserStatus } from "../api/userApi";

export const useAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

export const useUserById = (id) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userData }) => updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user"]);
    },
  });
};
