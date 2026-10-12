import { useEffect, useRef } from "react";
import { AlertTriangle, X, LoaderCircle } from "lucide-react";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "Please confirm that you want to continue.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isPending = false,
}) {
  const dialogRef = useRef(null);

  const isDestructive = variant === "danger";

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleCancel(event) {
    event.preventDefault();

    if (!isPending) {
      onClose();
    }
  }

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current && !isPending) {
      onClose();
    }
  }

  function handleConfirm() {
    if (!isPending) {
      onConfirm();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
      className="
        fixed inset-0 m-auto
        w-[calc(100%-2rem)] max-w-[440px]
        overflow-hidden rounded-2xl
        border border-[#E8E5DC]
        bg-[#F7F5F0] p-0
        text-[#252922]
        
        backdrop:bg-[#111811]/45
        backdrop:backdrop-blur-[3px]
        backdrop:opacity-30
        
        open:animate-in
        open:fade-in
        open:zoom-in-95
        duration-200
      "
    >
      <div className="p-6 sm:p-7">
        <div className="mb-6 flex items-start justify-between">
          <div
            className={`
              flex h-12 w-12 items-center justify-center
              rounded-xl border
              ${
                isDestructive
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-[#D8E4D8] bg-[#EAF0E8] text-[#1B3B2B]"
              }
            `}
          >
            <AlertTriangle size={22} strokeWidth={1.8} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close dialog"
            className="
              rounded-lg p-2 text-[#73766F]
              transition-colors
              hover:bg-black/5 hover:text-[#252922]
              disabled:cursor-not-allowed disabled:opacity-40
            "
          >
            <X size={19} />
          </button>
        </div>

        <div className="mb-7">
          <h2
            id="confirm-modal-title"
            className="
              mb-2 text-xl font-semibold tracking-tight
              text-[#1B3B2B]
              sm:text-2xl
            "
          >
            {title}
          </h2>

          <p
            id="confirm-modal-description"
            className="
              text-sm leading-6 text-[#6B7068]
              sm:text-[15px]
            "
          >
            {description}
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="
              inline-flex min-h-11 items-center justify-center
              rounded-xl border border-[#DDDAD1]
              bg-white/70 px-5 py-3
              text-sm font-medium text-[#42473F]
              transition-colors
              hover:bg-white
              disabled:cursor-not-allowed disabled:opacity-50
              sm:min-w-[110px]
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className={`
              inline-flex min-h-11 items-center justify-center
              gap-2 rounded-xl px-5 py-3
              text-sm font-medium text-white
              transition-all
              disabled:cursor-not-allowed disabled:opacity-60
              ${
                isDestructive
                  ? "bg-[#B42318] hover:bg-[#912018]"
                  : "bg-[#1B3B2B] hover:bg-[#254D38]"
              }
              sm:min-w-[145px]
            `}
          >
            {isPending && <LoaderCircle size={16} className="animate-spin" />}

            {isPending ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmModal;
