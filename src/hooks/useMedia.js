import { useMutation } from "@tanstack/react-query";
import { uploadMedia, deleteMedia } from "../api/mediaApi";

export const useUploadMedia = () => useMutation(uploadMedia);

export const useDeleteMedia = () => useMutation(deleteMedia);
