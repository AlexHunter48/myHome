import { useEffect, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import useGetMessages from "./useGetMessages";
import useSendMessage from "./useSendMessages";
import useMessageRealtime from "./useMessagesRealtime";
import useMarkMessagesAsRead from "./useMarkMessagesAsRead";

export default function Messages() {
  const [message, setMessage] = useState("");

  const { conversationId } = useParams();
  useMessageRealtime(conversationId);
  const navigate = useNavigate();

  const { user } = useAuth();

  const { messages, isPending, error } = useGetMessages(conversationId);
  const { markAsRead } = useMarkMessagesAsRead();
  useEffect(() => {
    if (!conversationId || !user?.id) return;

    markAsRead({
      conversationId,
      userId: user.id,
    }).catch((error) => {
      console.error("Failed to mark messages as read:", error);
    });
  }, [conversationId, user?.id, markAsRead]);

  const { sendMessage, isPending: sending } = useSendMessage();

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!message.trim()) return;
    if (!user?.id) return;

    try {
      await sendMessage({
        conversationId,
        senderId: user.id,
        content: message.trim(),
      });

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-18 max-w-4xl items-center gap-4 px-5 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-sm font-semibold text-neutral-900">Messages</h1>

            <p className="text-xs text-neutral-500">Property enquiry</p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex h-[calc(100vh-72px)] max-w-4xl flex-col">
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          {isPending && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-neutral-500">Loading messages...</p>
            </div>
          )}

          {error && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-red-500">Unable to load messages.</p>
            </div>
          )}

          {!isPending && !error && (
            <div className="space-y-4">
              {messages?.length === 0 && (
                <div className="flex h-full min-h-[400px] items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-neutral-900">
                      Start the conversation
                    </h2>

                    <p className="mt-1 max-w-sm text-sm text-neutral-500">
                      Ask the owner about availability, pricing, viewing times,
                      or anything else about the property.
                    </p>
                  </div>
                </div>
              )}

              {messages?.map((message) => {
                const isMine = message.sender_id === user?.id;

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm sm:max-w-[65%] ${
                        isMine
                          ? "rounded-br-md bg-[#1b3b2b] text-white"
                          : "rounded-bl-md bg-white text-neutral-900 shadow-sm ring-1 ring-neutral-200"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {message.content}
                      </p>

                      <p
                        className={`mt-1 text-[10px] ${
                          isMine ? "text-white/60" : "text-neutral-400"
                        }`}
                      >
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 bg-[#f7f5f0] px-5 py-4 sm:px-6">
          <form
            onSubmit={handleSendMessage}
            className="flex items-end gap-3 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm"
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              rows={1}
              className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />

            <button
              type="submit"
              disabled={sending || !message.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1b3b2b] text-white transition hover:bg-[#163225] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={17} />
            </button>
          </form>

          <p className="mt-2 text-center text-[11px] text-neutral-400">
            Press Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </main>
    </div>
  );
}
