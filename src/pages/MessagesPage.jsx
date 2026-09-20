import { ArrowLeft, MessageCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import useConversations from "../features/messages/useConversation";
import useConversationRealtime from "../features/messages/useConversationRealtime";
import { useMemo, useState } from "react";

export default function MessagesPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  useConversationRealtime(user?.id);

  const { conversations, isPending, error } = useConversations(user?.id);

  const [filter, setFilter] = useState("all");

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];

    if (filter === "unread") {
      return conversations.filter((conversation) => {
        const unreadCount = (conversation.messages ?? []).filter(
          (message) =>
            message.sender_id !== user?.id && message.read_at === null,
        ).length;

        return unreadCount > 0;
      });
    }

    return conversations;
  }, [conversations, filter, user?.id]);

  const unreadTotal = useMemo(() => {
    return (conversations ?? []).reduce((total, conversation) => {
      return (
        total +
        (conversation.messages ?? []).filter(
          (message) =>
            message.sender_id !== user?.id && message.read_at === null,
        ).length
      );
    }, 0);
  }, [conversations, user?.id]);

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <header className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex h-[76px] max-w-4xl items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
              aria-label="Go back"
            >
              <ArrowLeft size={19} strokeWidth={1.8} />
            </button>

            <div>
              <h1 className="text-xl font-semibold tracking-[-0.03em] text-neutral-950">
                Messages
              </h1>

              <p className="mt-0.5 text-xs text-neutral-500">
                Your property conversations
              </p>
            </div>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            aria-label="Search messages"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-6 sm:py-10">
        <div className="mb-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-neutral-950">
                Conversations
              </h2>

              {!isPending && !error && conversations?.length > 0 && (
                <p className="mt-1 text-sm text-neutral-500">
                  Stay connected with property owners.
                </p>
              )}
            </div>
          </div>

          {!isPending && !error && conversations?.length > 0 && (
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  filter === "all"
                    ? "bg-[#1b3b2b] text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("unread")}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  filter === "unread"
                    ? "bg-[#1b3b2b] text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                Unread
                {unreadTotal > 0 && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${
                      filter === "unread"
                        ? "bg-white text-[#1b3b2b]"
                        : "bg-[#1b3b2b] text-white"
                    }`}
                  >
                    {unreadTotal}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {isPending && (
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-neutral-200/70 py-5"
              >
                <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-neutral-200" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex min-h-[400px] items-center justify-center text-center">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm ring-1 ring-neutral-200">
                <MessageCircle size={23} strokeWidth={1.7} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-neutral-900">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Unable to load your conversations.
              </p>
            </div>
          </div>
        )}

        {!isPending && !error && conversations?.length === 0 && (
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
              <MessageCircle
                size={25}
                strokeWidth={1.6}
                className="text-[#1b3b2b]"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-neutral-900">
              You don’t have any messages
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              When you contact a property owner, your conversations will appear
              here.
            </p>

            <button
              onClick={() => navigate("/properties")}
              className="mt-7 rounded-xl bg-[#1b3b2b] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#163225] active:scale-[0.98]"
            >
              Explore properties
            </button>
          </div>
        )}

        {!isPending &&
          !error &&
          conversations?.length > 0 &&
          filteredConversations.length === 0 && (
            <div className="rounded-3xl border border-neutral-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b3b2b]/10 text-[#1b3b2b]">
                <MessageCircle size={21} strokeWidth={1.7} />
              </div>

              <h3 className="mt-4 text-base font-semibold text-neutral-900">
                You're all caught up
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                You have no unread conversations.
              </p>
            </div>
          )}

        {!isPending && !error && filteredConversations.length > 0 && (
          <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white">
            {filteredConversations.map((conversation, index) => {
              const property = conversation.properties;

              const latestMessage = [...(conversation.messages ?? [])].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at),
              )[0];

              const unreadCount = (conversation.messages ?? []).filter(
                (message) =>
                  message.sender_id !== user?.id && message.read_at === null,
              ).length;

              const isUnread = unreadCount > 0;

              return (
                <button
                  key={conversation.id}
                  onClick={() => navigate(`/messages/${conversation.id}`)}
                  className={`group flex w-full items-center gap-4 px-5 py-5 text-left transition sm:px-6 ${
                    index !== filteredConversations.length - 1
                      ? "border-b border-neutral-100"
                      : ""
                  } ${
                    isUnread
                      ? "bg-[#fbfcfa]"
                      : "bg-white hover:bg-neutral-50/70"
                  }`}
                >
                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition ${
                      isUnread
                        ? "bg-[#1b3b2b] text-white"
                        : "bg-[#e9eee9] text-[#1b3b2b]"
                    }`}
                  >
                    <MessageCircle size={21} strokeWidth={1.7} />

                    {isUnread && (
                      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#c46b4f]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className={`truncate text-[15px] tracking-[-0.015em] ${
                          isUnread
                            ? "font-semibold text-neutral-950"
                            : "font-medium text-neutral-900"
                        }`}
                      >
                        {property?.title || "Property enquiry"}
                      </h3>

                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={`text-xs ${
                            isUnread
                              ? "font-medium text-neutral-500"
                              : "text-neutral-400"
                          }`}
                        >
                          {new Date(
                            latestMessage?.created_at ||
                              conversation.created_at,
                          ).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>

                        {isUnread && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1b3b2b] px-1.5 text-[10px] font-semibold text-white">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 truncate text-xs text-neutral-400">
                      {property?.location || "Property location"}
                    </p>

                    <p
                      className={`mt-2 truncate text-sm ${
                        isUnread
                          ? "font-medium text-neutral-700"
                          : "text-neutral-500"
                      }`}
                    >
                      {latestMessage?.content || "No messages yet"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
