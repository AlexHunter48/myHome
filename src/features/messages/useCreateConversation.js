import { useMutation } from "@tanstack/react-query";
import { createConversation } from "../../services/apiMessages";

export default function useCreateConversation() {
  const {
    mutateAsync: createConversationMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: createConversation,
  });

  return {
    createConversation: createConversationMutation,
    isPending,
    error,
  };
}
