import { useMutation } from "@tanstack/react-query";
import { logIn as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogIn() {
  const { mutate: logIn, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logIn, isPending };
}
