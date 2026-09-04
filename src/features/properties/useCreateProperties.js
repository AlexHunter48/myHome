import { useMutation } from "@tanstack/react-query";
import { createProperty as createPropertyApi } from "../../services/apiProperties";

export default function useCreateProperty() {
  const { mutate: createProperty, isPending } = useMutation({
    mutationFn: createPropertyApi,
  });

  return { createProperty, isPending };
}
