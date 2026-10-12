import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unPublishProperty } from "../../services/apiProperties";
import toast from "react-hot-toast";

export default function useUnPublishProperty() {
  const queryClient = useQueryClient();
  const {
    mutate: unPublishing,
    isPending,
    error,
  } = useMutation({
    mutationFn: unPublishProperty,
    onSuccess: async () => {
      toast.success("Property moved to draft");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["properties"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["my-properties"],
        }),
      ]);
    },
    onError: () => {
      toast.error("Error unpublishing property");
    },
  });
  return { unPublishing, isPending, error };
}
