import {
  ArrowUpRight,
  TrendingUp,
  Waves,
  MapPin,
  BarChart3,
} from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Know the market",
    text: "See how property prices are moving in the areas you're considering.",
  },
  {
    icon: BarChart3,
    title: "Compare prices",
    text: "Understand how a property's asking price compares with similar homes nearby.",
  },
  {
    icon: Waves,
    title: "Understand the area",
    text: "Get useful location information before making an important property decision.",
  },
];
export default function Insights() {
  return (
    <section className="bg-[#f7f5f0] px-6 py-14 md:px-10 md:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-12">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1b3b2b] md:mb-5">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
              MyHome Insights
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-950 md:text-5xl lg:text-[3.8rem]">
              More than a listing.
              <br />
              <span className="text-[#1b3b2b]">Know what you're buying.</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-md text-sm leading-6 text-neutral-600 md:text-base">
              Buying or renting a home is about more than four walls. MyHome
              brings useful market and location information together so you can
              make decisions with more confidence.
            </p>

            <button
              type="button"
              className="group mt-5 flex items-center gap-2 text-sm font-semibold text-[#1b3b2b] md:mt-6"
            >
              Learn about MyHome Insights
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] bg-[#1b3b2b] text-white md:mt-14">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Example market snapshot
              </p>

              <div className="mt-6 md:mt-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/60">
                      Average property price
                    </p>

                    <p className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
                      ₦85.4m
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                    <TrendingUp className="h-3.5 w-3.5" />
                    6.8%
                  </div>
                </div>

                <div className="mt-6 flex h-28 items-end gap-2 border-b border-white/10 md:mt-10 md:h-32">
                  {[35, 48, 43, 62, 57, 76, 69, 88, 82, 100].map(
                    (height, index, bars) => (
                      <div
                        key={index}
                        className={`flex-1 rounded-t-sm transition ${
                          index === bars.length - 1
                            ? "bg-white/60 hover:bg-white/80"
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>

                <div className="mt-3 flex justify-between text-[10px] text-white/40">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-6 md:p-10 lg:border-l lg:border-t-0 lg:p-14">
              <p className="text-sm font-medium text-white/60">
                What you could know
              </p>

              <div className="mt-5 grid gap-5 md:mt-7 md:grid-cols-3 md:gap-6 lg:grid-cols-1 lg:gap-7">
                {insights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 md:flex-col md:gap-3 lg:flex-row lg:gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-white/55">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between md:mt-7">
          <p>Figures shown are for illustration only.</p>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1b3b2b]" />
            Built for the Nigerian property market
          </div>
        </div>
      </div>
    </section>
  );
}
