import {
  LockKeyhole,
  Mail,
  ShieldCheck,
  Smartphone,
  Monitor,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginSecurity() {
  const { user } = useAuth();

  return (
    <div className="min-h-full bg-[var(--color-background)] px-8 py-12 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[#17221D]">
            Login & security
          </h1>

          <p className="mt-2 text-[16px] text-neutral-500">
            Manage how you access your MyHome account and keep it secure.
          </p>
        </div>

        <section className="overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white">
          <div className="px-8 pt-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#17221D]">
              Login information
            </h2>

            <p className="mt-1 text-[15px] text-neutral-500">
              Manage the information you use to access your account.
            </p>
          </div>

          <div className="mt-7">
            <div className="flex items-center gap-4 border-t border-neutral-200 px-8 py-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F4F0] text-[#1B3B2B]">
                <Mail size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-medium text-neutral-900">
                  Email address
                </h3>

                <p className="mt-1 truncate text-sm text-neutral-500">
                  {user?.email || "No email address"}
                </p>
              </div>

              <span className="hidden rounded-full bg-[#F1F4F0] px-3 py-1 text-xs font-medium text-[#1B3B2B] sm:block">
                Primary
              </span>

              <button
                type="button"
                className="text-sm font-medium text-[#1B3B2B] transition hover:text-[#143021]"
              >
                Change
              </button>
            </div>

            <div className="flex items-center gap-4 border-t border-neutral-200 px-8 py-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F4F0] text-[#1B3B2B]">
                <LockKeyhole size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-medium text-neutral-900">
                  Password
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  Keep your password strong and up to date.
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-[#1B3B2B] transition hover:text-[#143021]"
              >
                Change
              </button>
            </div>
          </div>
        </section>

        {/* Two-factor authentication */}
        <section className="mt-6 overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white">
          <div className="px-8 pt-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#17221D]">
              Two-factor authentication
            </h2>

            <p className="mt-1 text-[15px] text-neutral-500">
              Add an extra layer of security when signing in to your account.
            </p>
          </div>

          <div className="mt-7 flex items-center gap-4 border-t border-neutral-200 px-8 py-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F4F0] text-[#1B3B2B]">
              <ShieldCheck size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-medium text-neutral-900">
                Two-factor authentication
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Protect your account with an additional verification step.
              </p>
            </div>

            <span className="hidden rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 sm:block">
              Not enabled
            </span>

            <button
              type="button"
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Set up
            </button>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white">
          <div className="px-8 pt-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#17221D]">
              Where you're logged in
            </h2>

            <p className="mt-1 text-[15px] text-neutral-500">
              Review the devices that are currently signed in to your account.
            </p>
          </div>

          <div className="mt-7 border-t border-neutral-200">
            <div className="flex items-center gap-4 px-8 py-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F4F0] text-[#1B3B2B]">
                <Monitor size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-medium text-neutral-900">
                    Current device
                  </h3>

                  <span className="h-2 w-2 rounded-full bg-[#3B8C5A]" />
                </div>

                <p className="mt-1 text-sm text-neutral-500">
                  This device · Active now
                </p>
              </div>

              <span className="text-xs font-medium text-[#1B3B2B]">
                This device
              </span>
            </div>

            <div className="flex items-center gap-4 border-t border-neutral-200 px-8 py-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                <Smartphone size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-medium text-neutral-900">
                  Mobile device
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  Last active recently
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-neutral-600 transition hover:text-red-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 mb-10 rounded-[22px] border border-red-100 bg-white px-8 py-7">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <LogOut size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold text-neutral-900">
                Sign out of all devices
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Sign out of your MyHome account everywhere except this device.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Sign out all
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
