import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSavedProperty } from "../../services/apiProperties";

export default function useRemoveSavedProperty() {
  const queryClient = useQueryClient();

  const {
    mutate: removeProperty,
    isPending,
    error,
  } = useMutation({
    mutationFn: removeSavedProperty,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isSaved"],
      });
    },
  });

  return {
    removeProperty,
    isPending,
    error,
  };
}
