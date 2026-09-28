import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "../services/apiProfile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
