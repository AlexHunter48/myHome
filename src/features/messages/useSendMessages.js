import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../services/apiMessages";

export default function useSendMessage() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: sendMessageMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: sendMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });

  return {
    sendMessage: sendMessageMutation,
    isPending,
    error,
  };
}
