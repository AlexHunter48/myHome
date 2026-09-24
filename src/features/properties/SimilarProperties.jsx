import { ArrowRight } from "lucide-react";
import PropertySection from "./PropertySection";
import useProperties from "./useProperties";
export default function SimilarProperties({ neighbourhood }) {
  const { properties, isPending, error } = useProperties({
    location: neighbourhood,
  });

  if (isPending || error || !properties?.length || !neighbourhood) return null;

  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-9">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1b3b2b]">
            Similar properties
          </p>

          <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-[var(--color-text)] sm:text-[38px]">
            You might also like
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500 sm:text-[15px]">
            Explore more homes similar to this one in{" "}
            <span className="font-medium text-neutral-700">
              {neighbourhood}
            </span>{" "}
            and nearby areas.
          </p>
        </div>

        <button
          type="button"
          className="group hidden shrink-0 items-center gap-2 text-sm font-medium text-[#1b3b2b] sm:flex"
        >
          View all properties
          <ArrowRight
            size={17}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      <PropertySection
        properties={properties}
        title=""
        description=""
        variant=""
      />
    </section>
  );
}
