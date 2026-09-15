import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiMessages";

export default function useGetMessages(conversationId) {
  const {
    data: messages,
    isPending,
    error,
  } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
  });

  return {
    messages,
    isPending,
    error,
  };
}
