import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export default function useConversationRealtime(userId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`user-conversations-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log("New inbox message:", payload.new);

          queryClient.invalidateQueries({
            queryKey: ["conversations", userId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
}
