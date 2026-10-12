import { Bell } from "lucide-react";

export default function Notifications() {
  return (
    <div className="min-h-full bg-[var(--color-background)] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-900">
            Notifications
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Stay up to date with messages, enquiries, and activity on MyHome.
          </p>
        </div>

        <div className="mt-8 flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EEE9] text-[#1B3B2B]">
            <Bell size={24} strokeWidth={1.7} />
          </div>

          <h2 className="mt-5 text-lg font-medium tracking-[-0.02em] text-neutral-900">
            Notification preferences
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
            Notification controls are coming soon. You'll be able to choose
            which updates you receive from MyHome.
          </p>
        </div>
      </div>
    </div>
  );
}
