import HomeCard from "../home/HomeCard";

import property1 from "../../assets/exterior1.png";
import property2 from "../../assets/exterior2.png";
import property3 from "../../assets/exterior3.png";
import property4 from "../../assets/exterior4.png";
import { ArrowRight } from "lucide-react";

export default function PropertySection({ title, description, properties }) {
  return (
    <section className="mt-16">
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
            {title}
          </h2>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-[15px]">
            {description}
          </p>
        </div>

        <button
          type="button"
          className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#1b3b2b] transition hover:gap-3 sm:flex"
        >
          See all
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="hidden gap-5 xl:grid xl:grid-cols-4">
        {properties.map((property, index) => (
          <HomeCard key={index} {...property} />
        ))}
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-3 xl:hidden">
        {properties.slice(0, 6).map((property, index) => (
          <HomeCard key={index} {...property} />
        ))}
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 pr-6 scrollbar-hide md:hidden">
        {properties.map((property, index) => (
          <div key={index} className="w-[76vw] shrink-0 snap-start">
            <HomeCard {...property} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#1b3b2b] sm:hidden"
      >
        See all
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
