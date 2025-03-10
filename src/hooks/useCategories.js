import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/categoryApi";

export const useAllCategories = () => useQuery({ queryKey: ["categories"], queryFn: getAllCategories });
