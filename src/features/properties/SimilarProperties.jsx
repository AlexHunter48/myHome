import { ArrowRight, Sparkles } from "lucide-react";

import useProperties from "./useProperties";
import HomeCard from "../home/HomeCard";
import { useNavigate } from "react-router-dom";
export default function SimilarProperties({ neighbourhood, propertyId }) {
  const { properties, isPending, error } = useProperties({
    location: neighbourhood,
  });
  const navigate = useNavigate();

  const filteredProperties = properties?.filter(
    (property) => property.id !== propertyId,
  );
  if (
    isPending ||
    error ||
    !properties?.length ||
    !neighbourhood ||
    filteredProperties.length === 0
  )
    return null;

  return (
    <section className="mt-16 border-t border-neutral-200/60 pt-12">
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-9">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1b3b2b]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Similar Properties</span>
          </div>

          <h2 className="text-2xl font-light tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl">
            You might also like
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Explore more homes similar to this one in{" "}
            <span className="font-medium text-[var(--color-text-primary)]">
              {neighbourhood}
            </span>{" "}
            and nearby areas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/properties")}
          className="group hidden shrink-0 items-center gap-2 text-sm font-medium text-[#1b3b2b] transition-colors hover:text-[#143022] sm:flex"
        >
          <span>View all properties</span>
          <ArrowRight
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      <div className="mt-7 -mx-6 px-6 flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
        {filteredProperties &&
          filteredProperties.slice(0, 4).map((property) => (
            <div
              key={property.id}
              className="snap-start shrink-0 w-[85%] sm:w-auto"
            >
              <HomeCard {...property} />
            </div>
          ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <button
          type="button"
          onClick={() => navigate("/properties")}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1b3b2b]"
        >
          <span>View all properties</span>
          <ArrowRight size={16} strokeWidth={1.8} />
        </button>
      </div>
    </section>
  );
}
