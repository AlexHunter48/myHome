import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../services/apiMessages";

export default function useConversations(userId) {
  const {
    data: conversations,
    isPending,
    error,
  } = useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => getConversations(userId),
    enabled: !!userId,
  });

  return {
    conversations,
    isPending,
    error,
  };
}
