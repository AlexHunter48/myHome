import { AlertCircle } from "lucide-react";

function PropertyError({ onRetry }) {
  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center">
        <div className="w-full text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EDEA] text-[#8B4A3C]">
            <AlertCircle size={26} strokeWidth={1.6} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b3b2b]/60">
            MyHome
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Something went wrong
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500 sm:text-[15px]">
            We couldn't load this property right now. Please try again in a
            moment.
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1b3b2b] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#142e21] hover:shadow-md active:translate-y-0"
          >
            Try again
          </button>

          <p className="mt-8 text-xs text-neutral-400">
            Find a place that feels like home.
          </p>
        </div>
      </div>
    </main>
  );
}

export default PropertyError;
