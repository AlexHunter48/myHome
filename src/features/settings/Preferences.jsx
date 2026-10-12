import { Globe, MapPin, Wallet } from "lucide-react";

export default function Preferences() {
  return (
    <div className="min-h-full bg-[var(--color-background)] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-900">
            Account preferences
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Manage how you experience MyHome, including your language, currency,
            and location preferences.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="flex items-center justify-between gap-6 border-b border-neutral-200 px-6 py-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EEE9] text-[#1B3B2B]">
                <Globe size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-sm font-medium text-neutral-900">
                  Language
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Choose the language used throughout MyHome.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 text-sm font-medium text-[#1B3B2B] transition hover:text-[#123D24]"
            >
              English
            </button>
          </div>

          <div className="flex items-center justify-between gap-6 border-b border-neutral-200 px-6 py-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EEE9] text-[#1B3B2B]">
                <Wallet size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-sm font-medium text-neutral-900">
                  Currency
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Choose the currency used when displaying property prices.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 text-sm font-medium text-[#1B3B2B] transition hover:text-[#123D24]"
            >
              ₦ Nigerian Naira
            </button>
          </div>

          <div className="flex items-center justify-between gap-6 px-6 py-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EEE9] text-[#1B3B2B]">
                <MapPin size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-sm font-medium text-neutral-900">
                  Location
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Set your preferred country and location for property
                  discovery.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 text-sm font-medium text-[#1B3B2B] transition hover:text-[#123D24]"
            >
              Nigeria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
