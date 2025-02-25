import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/userApi";

export const useAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });