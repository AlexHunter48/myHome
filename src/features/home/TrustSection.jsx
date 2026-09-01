import {
  BadgeCheck,
  ShieldCheck,
  UserCheck,
  SearchCheck,
  ArrowUpRight,
} from "lucide-react";

const trustPoints = [
  {
    icon: BadgeCheck,
    title: "Verified owners",
    text: "We verify property owners before their listings can appear on MyHome.",
  },
  {
    icon: SearchCheck,
    title: "More transparency",
    text: "Get useful information about a property and its area before making a decision.",
  },
  {
    icon: ShieldCheck,
    title: "Built with trust in mind",
    text: "Clear property information and a platform designed to reduce unnecessary uncertainty.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1b3b2b]">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
              Built around trust
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight  md:text-5xl lg:text-[3.7rem] text-(--color-primary)">
              Find a home
              <br />
              with more
              <br />
              <span>confidence.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-neutral-600 md:text-base">
              Property searching shouldn't feel like a guessing game. MyHome is
              designed to give you better information and more confidence
              throughout the process.
            </p>

            <button
              type="button"
              className="group mt-7 flex items-center gap-2 text-sm font-semibold text-[#1b3b2b]"
            >
              Learn how MyHome works
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </button>
          </div>

          <div className="rounded-[2rem] bg-[#f7f5f0] p-6 md:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  The MyHome standard
                </p>

                <p className="mt-2 text-sm font-medium text-neutral-900">
                  Designed for a better property search
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1b3b2b] text-white">
                <UserCheck className="h-5 w-5" strokeWidth={1.7} />
              </div>
            </div>

            <div className="divide-y divide-neutral-200/80">
              {trustPoints.map((point, index) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.title}
                    className="flex gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1b3b2b] shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-neutral-950">
                          {point.title}
                        </h3>

                        {index === 0 && (
                          <span className="rounded-full bg-[#eaf0ec] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#1b3b2b]">
                            Core feature
                          </span>
                        )}
                      </div>

                      <p className="mt-1.5 max-w-md text-xs leading-5 text-neutral-500 md:text-sm">
                        {point.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 border-y border-neutral-200 py-7 md:grid-cols-4">
          <div className="px-4 py-2 text-center md:border-r md:border-neutral-200">
            <p className="font-serif text-2xl text-neutral-950">Verified</p>
            <p className="mt-1 text-xs text-neutral-500">property owners</p>
          </div>

          <div className="border-l border-neutral-200 px-4 py-2 text-center md:border-r">
            <p className="font-serif text-2xl text-neutral-950">Clear</p>
            <p className="mt-1 text-xs text-neutral-500">
              property information
            </p>
          </div>

          <div className="border-t border-neutral-200 px-4 py-2 text-center md:border-r md:border-t-0">
            <p className="font-serif text-2xl text-neutral-950">Useful</p>
            <p className="mt-1 text-xs text-neutral-500">market insights</p>
          </div>

          <div className="border-l border-neutral-200 border-t px-4 py-2 text-center md:border-t-0">
            <p className="font-serif text-2xl text-neutral-950">Nigeria</p>
            <p className="mt-1 text-xs text-neutral-500">
              built for the local market
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
