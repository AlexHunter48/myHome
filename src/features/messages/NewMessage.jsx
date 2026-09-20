import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import useProperty from "../properties/useProperty";
import useCreateConversation from "./useCreateConversation";
import useSendMessage from "./useSendMessages";

export default function NewMessage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const propertyId = searchParams.get("propertyId");

  const { user } = useAuth();

  const { property, isPending: loadingProperty } = useProperty(propertyId);

  const { createConversation, isPending: creatingConversation } =
    useCreateConversation();

  const { sendMessage, isPending: sendingMessage } = useSendMessage();

  const [message, setMessage] = useState("");

  const isSending = creatingConversation || sendingMessage;

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!message.trim()) return;
    if (!user?.id || !property) return;

    try {
      const conversation = await createConversation({
        propertyId: property.id,
        buyerId: user.id,
        ownerId: property.owner_id,
      });

      await sendMessage({
        conversationId: conversation.id,
        senderId: user.id,
        content: message.trim(),
      });

      navigate(`/messages/${conversation.id}`);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  if (loadingProperty) {
    return (
      <div className="min-h-screen bg-[#f7f5f0]">
        <div className="mx-auto max-w-2xl px-5 py-10">
          <div className="h-5 w-32 animate-pulse rounded bg-neutral-200" />
          <div className="mt-8 h-32 animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-5">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-neutral-900">
            Property not found
          </h1>

          <button
            onClick={() => navigate("/properties")}
            className="mt-5 rounded-xl bg-[#1b3b2b] px-5 py-2.5 text-sm font-medium text-white"
          >
            Browse properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <header className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex h-[72px] max-w-2xl items-center gap-4 px-5 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
            aria-label="Go back"
          >
            <ArrowLeft size={19} strokeWidth={1.8} />
          </button>

          <div>
            <h1 className="text-lg font-semibold tracking-[-0.02em] text-neutral-900">
              Contact owner
            </h1>

            <p className="mt-0.5 text-xs text-neutral-500">
              Start a conversation about this property
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-8 sm:px-6 sm:py-12">
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Property enquiry
          </p>

          <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-neutral-900">
            {property.title}
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {property.neighbourhood || property.city || property.location}
          </p>
        </div>

        <form onSubmit={handleSendMessage} className="mt-8">
          <div className="mb-3">
            <h2 className="text-base font-semibold tracking-[-0.015em] text-neutral-900">
              Your message
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Introduce yourself and let the owner know what you'd like to know.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition focus-within:border-[#1b3b2b]/30 focus-within:shadow-[0_8px_30px_rgba(27,59,43,0.06)]">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in this property..."
              rows={6}
              disabled={isSending}
              className="w-full resize-none bg-transparent text-sm leading-6 text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed"
            />

            <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
              <span className="text-xs text-neutral-400">
                Your message will be sent directly to the owner.
              </span>

              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-[#1b3b2b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#163225] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span> {isSending ? "Sending..." : "Send"} </span>

                {!isSending && <Send size={15} strokeWidth={1.8} />}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
