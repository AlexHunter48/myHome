import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar } from "../services/apiAvatar";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
