import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileRole } from "../services/apiProfile";
import toast from "react-hot-toast";

export default function useUpdateProfileRole() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateRole,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateProfileRole,

    onSuccess: async (updatedProfile) => {
      queryClient.setQueryData(["profile", updatedProfile.id], updatedProfile);

      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      toast.success("Role updated successfully");
    },

    onError: () => {
      toast.error("Error updating role. Please try again");
    },
  });

  return {
    updateRole,
    isPending,
    error,
  };
}
