import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPropertyImages } from "../../services/apiStorage";

export default function useUploadPropertyImages() {
  const queryClient = useQueryClient();
  const { mutate: uploadImages, isPending } = useMutation({
    mutationFn: uploadPropertyImages,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["property-images", variables.propertyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-properties"],
      });
    },
  });

  return { uploadImages, isPending };
}
