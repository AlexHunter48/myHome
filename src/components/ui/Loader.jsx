export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
      <div className="flex w-52 flex-col items-center">
        {/* Brand */}
        <div className="mb-7 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#1b3b2b] animate-pulse" />

          <span className="text-xl font-semibold tracking-[-0.03em] text-[#1b3b2b]">
            MyHome
          </span>
        </div>

        {/* Loading line */}
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#e5e3dd]">
          <div className="h-full w-1/2 animate-[loader_1.4s_ease-in-out_infinite] rounded-full bg-[#1b3b2b]" />
        </div>

        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
          Finding your home
        </p>
      </div>
    </div>
  );
}
