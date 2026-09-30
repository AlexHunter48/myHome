import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePasswordApi } from "../services/apiProfile";

export default function useChangePassword() {
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: changePasswordApi,

    onSuccess: () => {
      toast.success("Password changed successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    changePassword,
    isPending,
  };
}
