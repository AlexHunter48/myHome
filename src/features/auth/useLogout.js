import { useMutation } from "@tanstack/react-query";
import { logOut as logOutApi } from "../../services/apiAuth";

export default function useLogOut() {
  const { mutate: logOut, isPending } = useMutation({
    mutationFn: logOutApi,
  });

  return { logOut, isPending };
}
