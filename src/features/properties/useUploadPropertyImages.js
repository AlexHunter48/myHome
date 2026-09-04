import { useMutation } from "@tanstack/react-query";
import { uploadPropertyImages } from "../../services/apiStorage";

export default function useUploadPropertyImages() {
  const { mutate: uploadImages, isPending } = useMutation({
    mutationFn: uploadPropertyImages,
  });

  return { uploadImages, isPending };
}
