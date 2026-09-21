import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPropertyImages } from "../../services/apiProperties";
import { toast } from "react-hot-toast";

export default function useEditPropertyImages() {
  const queryClient = useQueryClient();

  const {
    mutate: editImages,
    isPending,
    error,
  } = useMutation({
    mutationFn: editPropertyImages,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["property-images", variables.propertyId],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-properties"],
      });

      queryClient.invalidateQueries({
        queryKey: ["property", variables.propertyId],
      });

      toast.success("Photos updated successfully");
    },

    onError: (error) => {
      toast.error(error.message || "Could not update photos");
    },
  });

  return {
    editImages,
    isPending,
    error,
  };
}
