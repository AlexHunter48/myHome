import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import useChangePassword from "../../profiles/useChangePassword";
import toast from "react-hot-toast";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { changePassword, isPending } = useChangePassword();

  const { user } = useAuth();

  if (!isOpen) return null;

  function handleChangePassword() {
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    changePassword({
      email: user.email,
      currentPassword,
      newPassword,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-neutral-900">
              Change password
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Choose a strong password to keep your MyHome account secure.
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
          <label
            htmlFor="current-password"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Current password
          </label>

          <div className="relative">
            <input
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-700"
              aria-label={
                showCurrentPassword
                  ? "Hide current password"
                  : "Show current password"
              }
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="new-password"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            New password
          </label>

          <div className="relative">
            <input
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-700"
              aria-label={
                showNewPassword ? "Hide new password" : "Show new password"
              }
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="mt-2 text-xs leading-5 text-neutral-500">
            Use at least 8 characters with a mix of letters and numbers.
          </p>
        </div>

        <div className="mt-5">
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Confirm new password
          </label>

          <div className="relative">
            <input
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-700"
              aria-label={
                showConfirmPassword
                  ? "Hide password confirmation"
                  : "Show password confirmation"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              ((onClose(), setConfirmPassword("")),
                setCurrentPassword(""),
                setNewPassword(""));
            }}
            className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleChangePassword}
            className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            {isPending ? "Creating new password..." : "Change"}
          </button>
        </div>
      </div>
    </div>
  );
}
