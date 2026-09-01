import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please check your email to verify your account.",
      );
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUp, isPending };
}
