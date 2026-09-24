import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import useGetMessages from "./useGetMessages";
import useSendMessage from "./useSendMessages";
import useMessageRealtime from "./useMessagesRealtime";
import useMarkMessagesAsRead from "./useMarkMessagesAsRead";
import useGetOwnerDetails from "../listings/useGetOwnerDetails";
export default function Messages() {
  const [message, setMessage] = useState("");

  const { conversationId } = useParams();
  useMessageRealtime(conversationId);
  const navigate = useNavigate();

  const { user } = useAuth();

  const { messages, isPending, error } = useGetMessages(conversationId);
  const {
    ownerDetails,
    isPending: loadingOwner,
    error: ownerError,
  } = useGetOwnerDetails({ conversationId });

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
    <div className="flex min-h-screen flex-col bg-[#f7f5f0]">
      <header className="sticky top-0 z-50 shrink-0 border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex h-[72px] max-w-4xl items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 active:scale-95"
          >
            <ArrowLeft size={19} strokeWidth={1.8} />
          </button>

          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-100">
            {/* Avatar will go here */}
          </div>

          <div className="min-w-0">
            {loadingOwner ? (
              <>
                <div className="h-4 w-28 animate-pulse rounded-md bg-neutral-200" />

                <div className="mt-1.5 h-3 w-20 animate-pulse rounded-md bg-neutral-100" />
              </>
            ) : ownerError ? (
              <>
                <h1 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-neutral-900 sm:text-base">
                  Property owner
                </h1>

                <p className="mt-0.5 text-[11px] font-medium text-neutral-500 sm:text-xs">
                  Property enquiry
                </p>
              </>
            ) : (
              <>
                <h1 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-neutral-900 sm:text-base">
                  {ownerDetails?.owner?.name || "Property owner"}
                </h1>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1b3b2b]" />

                  <p className="text-[11px] font-medium text-neutral-500 sm:text-xs">
                    Property enquiry
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col ">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          {isPending && (
            <div className="flex min-h-full items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <div className="h-8 w-8 animate-pulse rounded-full bg-[#1b3b2b]/10" />

                <p className="mt-4 text-sm font-medium text-neutral-600">
                  Loading conversation...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex min-h-full items-center justify-center">
              <div className="max-w-sm text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                  <span className="text-sm font-semibold text-red-500">!</span>
                </div>

                <h2 className="mt-4 text-sm font-semibold text-neutral-900">
                  Unable to load messages
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-neutral-500">
                  Something went wrong while loading this conversation. Please
                  try again.
                </p>
              </div>
            </div>
          )}

          {!isPending && !error && (
            <>
              {messages?.length === 0 ? (
                <div className="flex min-h-full items-center justify-center">
                  <div className="max-w-sm px-4 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1b3b2b]/8">
                      <MessageCircle
                        size={22}
                        strokeWidth={1.7}
                        className="text-[#1b3b2b]"
                      />
                    </div>

                    <h2 className="mt-5 text-base font-semibold tracking-[-0.02em] text-neutral-900">
                      Start the conversation
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      Ask the owner about availability, pricing, viewing times,
                      or anything else about the property.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => {
                    const isMine = message.sender_id === user?.id;

                    return (
                      <div
                        key={message.id}
                        className={`flex ${
                          isMine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[84%] sm:max-w-[65%] ${
                            isMine ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`rounded-[20px] px-4 py-3 shadow-sm ${
                              isMine
                                ? "rounded-br-[6px] bg-[#1b3b2b] text-white shadow-[#1b3b2b]/10"
                                : "rounded-bl-[6px] border border-neutral-200/80 bg-white text-neutral-900"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words text-[13px] leading-[1.65] sm:text-sm">
                              {message.content}
                            </p>
                          </div>

                          <p
                            className={`mt-1.5 px-1 text-[10px] font-medium ${
                              isMine
                                ? "text-right text-neutral-400"
                                : "text-left text-neutral-400"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString(
                              [],
                              {
                                hour: "numeric",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        <div className="shrink-0 border-t border-neutral-200/70 bg-[#f7f5f0]/95 px-4 pb-4 pt-3 backdrop-blur-sm sm:px-6 sm:pb-5">
          <form
            onSubmit={handleSendMessage}
            className="mx-auto flex max-w-3xl items-end gap-2 rounded-[20px] border border-neutral-200/90 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-200 focus-within:shadow-[0_10px_35px_rgba(27,59,43,0.08)]"
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              rows={1}
              disabled={sending}
              className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-[13px] leading-5 text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed sm:text-sm"
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
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#1b3b2b] text-white transition-all duration-200 hover:bg-[#163225] hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
            >
              <Send size={16} strokeWidth={1.9} />
            </button>
          </form>

          <p className="mt-2 hidden text-center text-[10px] font-medium text-neutral-400 sm:block">
            Press Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </main>
    </div>
  );
}
