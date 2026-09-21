import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProperty as updatePropertyApi } from "../../services/apiProperties";

export default function useUpdateProperty() {
  const queryClient = useQueryClient();
  const { mutate: updateProperty, isPending } = useMutation({
    mutationFn: updatePropertyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-properties"] });
    },
  });

  return {
    updateProperty,
    isPending,
  };
}
