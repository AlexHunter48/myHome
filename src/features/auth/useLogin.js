import { useMutation } from "@tanstack/react-query";
import { logIn as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import useClaimVisitorPropertyViews from "../properties/useClaimPropertiesViews";

export default function useLogIn() {
  const { claimViews } = useClaimVisitorPropertyViews();
  const { mutate: logIn, isPending } = useMutation({
    mutationFn: loginApi,

    onSuccess: async (data) => {
      const visitorId = localStorage.getItem("myhome_visitor_id");

      if (visitorId && data.user?.id) {
        await claimViews({
          visitorId,
          userId: data.user.id,
        });

        localStorage.removeItem("myhome_visitor_id");
      }
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logIn, isPending };
}
