import { ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import useConversations from "../features/messages/useConversation";

export default function MessagesPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { conversations, isPending, error } = useConversations(user?.id);

  function getOtherUser(conversation) {
    return conversation.buyer_id === user?.id
      ? conversation.owner_id
      : conversation.buyer_id;
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-18 max-w-3xl items-center gap-4 px-5 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-neutral-900">
              Messages
            </h1>

            <p className="text-xs text-neutral-500">
              Your property conversations
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
        {isPending && (
          <div className="py-20 text-center">
            <p className="text-sm text-neutral-500">Loading conversations...</p>
          </div>
        )}

        {error && (
          <div className="py-20 text-center">
            <p className="text-sm text-red-500">
              Unable to load your conversations.
            </p>
          </div>
        )}

        {!isPending && !error && conversations?.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
              <MessageCircle size={24} strokeWidth={1.7} />
            </div>

            <h2 className="mt-5 text-lg font-semibold tracking-tight text-neutral-900">
              No messages yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              When you contact a property owner, your conversations will appear
              here.
            </p>

            <button
              onClick={() => navigate("/properties")}
              className="mt-6 rounded-xl bg-[#1b3b2b] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#163225]"
            >
              Explore properties
            </button>
          </div>
        )}

        {!isPending && !error && conversations?.length > 0 && (
          <div>
            <div className="mb-5">
              <h2 className="text-sm font-medium text-neutral-500">
                Conversations
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
              {conversations.map((conversation) => {
                const property = conversation.properties;

                return (
                  <button
                    key={conversation.id}
                    onClick={() => navigate(`/messages/${conversation.id}`)}
                    className="flex w-full items-center gap-4 border-b border-neutral-100 p-5 text-left transition last:border-b-0 hover:bg-neutral-50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1b3b2b]/10 text-[#1b3b2b]">
                      <MessageCircle size={20} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="truncate text-sm font-semibold text-neutral-900">
                          {property?.title || "Property enquiry"}
                        </h3>

                        <span className="shrink-0 text-xs text-neutral-400">
                          {new Date(conversation.created_at).toLocaleDateString(
                            [],
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm text-neutral-500">
                        {property?.location || "Property location"}
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        {conversation.buyer_id === user?.id ? "Owner" : "Buyer"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
