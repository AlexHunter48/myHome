import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty as deletePropertyApi } from "../../services/apiProperties";
import toast from "react-hot-toast";

export default function useDeleteProperty() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteProperty,
    isPending,
    error,
  } = useMutation({
    mutationFn: deletePropertyApi,
    onSuccess: () => {
      toast.success("Property deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: () => {
      toast.error("Error deleting property");
    },
  });
  return { deleteProperty, isPending, error };
}
