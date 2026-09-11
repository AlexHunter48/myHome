import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabase";

export default function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logOut, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error(error.message);
    },

    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
  });

  return { logOut, isPending };
}
