export default function ListingLoader() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 px-6 sm:px-8 lg:px-14">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-3xl border border-neutral-200/70 bg-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)_260px]">
            <div className="h-56 bg-neutral-200 lg:h-[400px]" />

            <div className="space-y-5 p-5 sm:p-6 lg:p-8">
              <div className="h-3 w-20 rounded-full bg-neutral-200" />
              <div className="h-7 w-3/4 rounded-lg bg-neutral-200" />
              <div className="h-4 w-1/2 rounded-full bg-neutral-200" />
              <div className="h-6 w-32 rounded-lg bg-neutral-200" />

              <div className="flex gap-5">
                <div className="h-4 w-12 rounded-full bg-neutral-200" />
                <div className="h-4 w-12 rounded-full bg-neutral-200" />
                <div className="h-4 w-16 rounded-full bg-neutral-200" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-neutral-200" />
                <div className="h-3 w-5/6 rounded-full bg-neutral-200" />
              </div>
            </div>

            <div className="hidden flex-col justify-between border-l border-neutral-200/70 p-6 lg:flex">
              <div className="flex gap-5">
                <div className="h-4 w-20 rounded-full bg-neutral-200" />
                <div className="h-4 w-24 rounded-full bg-neutral-200" />
              </div>

              <div className="space-y-3">
                <div className="h-10 rounded-xl bg-neutral-200" />
                <div className="h-10 rounded-xl bg-neutral-200" />
                <div className="h-10 rounded-xl bg-neutral-200" />
                <div className="h-10 rounded-xl bg-neutral-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
