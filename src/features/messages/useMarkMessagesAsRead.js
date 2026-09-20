import { useMutation } from "@tanstack/react-query";

import { markMessagesAsRead } from "../../services/apiMessages";

export default function useMarkMessagesAsRead() {
  const {
    mutateAsync: markAsRead,
    isPending,
    error,
  } = useMutation({
    mutationFn: markMessagesAsRead,
  });

  return {
    markAsRead,
    isPending,
    error,
  };
}
