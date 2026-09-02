import { useNavigate } from "react-router-dom";
import useLogOut from "../../features/auth/useLogout";

export default function MenuContent({ isAuthenticated }) {
  const navigate = useNavigate();
  const { logOut, isPending } = useLogOut();
  function handleLogout() {
    logOut(
      {},
      {
        onSuccess: () => navigate("/"),
      },
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              My profile
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              My properties
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Saved homes
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Messages
            </button>
          </div>

          <hr className="my-2 border-neutral-100" />

          <div className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              List your property
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              MyHome Insights
            </button>
          </div>

          <hr className="my-2 border-neutral-100" />

          <div className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Help & Support
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Settings
            </button>
          </div>

          <hr className="my-2 border-neutral-100" />

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            {isPending ? "Signing out" : "Sign out"}
          </button>
        </>
      ) : (
        <>
          <div className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Properties
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Saved homes
            </button>
          </div>

          <hr className="my-2 border-neutral-100" />

          <div className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              List your property
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              MyHome Insights
            </button>
          </div>

          <hr className="my-2 border-neutral-100" />

          <div className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Help & Support
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              About MyHome
            </button>
          </div>

          <hr className="my-2 border-neutral-100" />

          <button
            type="button"
            className="flex w-full items-center rounded-2xl px-3 py-3 text-left text-sm font-semibold text-[#1b3b2b] transition hover:bg-[#eaf0ec]"
          >
            Sign in
          </button>
        </>
      )}
    </>
  );
}
