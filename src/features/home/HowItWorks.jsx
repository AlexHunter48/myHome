import {
  Search,
  SlidersHorizontal,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    text: "Search homes across Lagos by location, property type, and budget.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Explore",
    text: "Compare properties, view details, and use insights to understand what you're looking at.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Connect",
    text: "Found the right home? Connect directly with the owner and take the next step.",
  },
];
export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <section className="bg-white px-6 pt-14 pb-0 md:px-10 md:pt-20 lg:px-16 lg:pt-28 mb-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1b3b2b] md:mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1b3b2b]" />
            Simple by design
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-950 md:text-5xl lg:text-[3.7rem]">
            Finding a home
            <br />
            shouldn't be
            <br />
            <span className="text-[#1b3b2b]">complicated.</span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-6 text-neutral-600 md:mt-6 md:text-base">
            MyHome brings the essential parts of property searching together in
            one simple experience.
          </p>
        </div>

        <div className="mt-10 grid gap-0 md:mt-16 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`relative border-neutral-200 py-6 md:px-8 md:py-4 md:first:pl-0 ${
                  index !== 0 ? "border-t md:border-l md:border-t-0" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl tracking-tight text-neutral-200 md:text-5xl">
                    {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF0EC] text-[#1b3b2b] md:h-12 md:w-12">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                </div>

                <div className="mt-5 max-w-xs md:mt-10">
                  <h3 className="font-serif text-2xl tracking-tight text-neutral-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    {step.text}
                  </p>
                </div>

                {index !== steps.length - 1 && (
                  <ArrowRight
                    className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 bg-white p-1 text-neutral-400 md:block"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA card now straddles the white section and the footer below */}
        <div className="relative z-10 mt-10 -mb-12 flex flex-col gap-5 rounded-3xl bg-[#1b3b2b] p-6 text-white shadow-xl ring-1 ring-white/10 md:mt-16 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <p className="font-serif text-2xl tracking-tight md:text-3xl">
              Your next home could be closer than you think.
            </p>

            <p className="mt-2 text-sm text-white/60">
              Start exploring properties across Lagos.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1b3b2b] transition hover:bg-neutral-100"
          >
            Explore homes
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
