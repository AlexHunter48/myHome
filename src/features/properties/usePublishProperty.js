import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishProperty } from "../../services/apiProperties";
import toast from "react-hot-toast";

export default function usePublishProperty() {
  const queryClient = useQueryClient();
  const { mutate: publish, isPending } = useMutation({
    mutationFn: publishProperty,
    onSuccess: async () => {
      toast.success("Property published");
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
      toast.error("Error publishing property");
    },
  });

  return { publish, isPending };
}
