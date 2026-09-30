import { useMutation } from "@tanstack/react-query";
import { changeEmail as changeEmailApi } from "../services/apiProfile";
import toast from "react-hot-toast";

export default function useChangeEmail() {
  const { mutate: changeEmail, isPending } = useMutation({
    mutationFn: changeEmailApi,

    onSuccess: () => {
      toast.success("Verification email sent. Please check your inbox.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { changeEmail, isPending };
}
