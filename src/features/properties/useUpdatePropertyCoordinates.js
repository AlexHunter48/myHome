import { useMutation } from "@tanstack/react-query";
import { updatePropertyCoordinates as updateCoordinatesApi } from "../../services/apiProperties";

export default function useUpdatePropertyCoordinates() {
  const {
    mutate: updateCoordinates,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateCoordinatesApi,
  });

  return { updateCoordinates, isPending, error };
}
