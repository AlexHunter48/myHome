import { X } from "lucide-react";
import useChangeEmail from "../../profiles/useChangeEmail";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangeEmailModal({ isOpen, onClose, currentEmail }) {
  const { changeEmail } = useChangeEmail();

  const [newEmail, setNewEmail] = useState("");

  if (!isOpen) return null;

  function handleChangeEmail() {
    const email = newEmail.trim();

    if (!email) {
      toast.error("Please enter your new email address.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (email.toLowerCase() === currentEmail?.toLowerCase()) {
      toast.error("This is already your current email address.");
      return;
    }

    changeEmail({ newEmail: email });
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-neutral-900">
              Change email address
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Update the email address you use to sign in to MyHome.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-7">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
            Current email
          </p>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
            {currentEmail}
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="new-email"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            New email address
          </label>

          <input
            id="new-email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter your new email"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
          />

          <p className="mt-2 text-xs leading-5 text-neutral-500">
            We'll send a verification link to your new email address.
          </p>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleChangeEmail}
            className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
