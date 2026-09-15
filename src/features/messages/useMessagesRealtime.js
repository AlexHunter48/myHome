import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export default function useMessageRealtime(conversationId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`conversation-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log("New realtime message:", payload.new);

          queryClient.setQueryData(
            ["messages", conversationId],
            (oldMessages = []) => {
              return [...oldMessages, payload.new];
            },
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);
}
