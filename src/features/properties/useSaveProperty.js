import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProperty as savePropertyApi } from "../../services/apiProperties";

export default function useSaveProperty() {
  const queryClient = useQueryClient();
  const {
    mutate: saveProperty,
    isPending,
    error,
  } = useMutation({
    mutationFn: savePropertyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isSaved"],
      });
    },
  });

  return { saveProperty, isPending, error };
}
