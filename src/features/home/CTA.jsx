import { ArrowRight, Home, ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#1b3b2b] px-7 py-14 text-white md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-20 h-64 w-64 rounded-full border border-white/5" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              <Home className="h-3.5 w-3.5" strokeWidth={1.8} />
              Your next home
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Ready to find a place
              <br />
              that feels like <span className="text-[#dce8df]">home?</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-6 text-white/60 md:text-base">
              Explore homes, discover new areas, and connect directly with
              property owners across Nigeria.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1b3b2b] transition hover:bg-neutral-100"
              >
                Explore homes
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                List your property
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-2 border-t border-white/10 pt-6 text-xs text-white/45">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.7} />

            <span>
              Built to make property searching simpler and more transparent.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
