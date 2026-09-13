import { SearchX } from "lucide-react";

function PropertyEmptyState({ onClear }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-neutral-200 bg-white px-6 py-16 text-center mt-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3ef]">
        <SearchX className="h-6 w-6 text-[#1b3b2b]" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
        No homes found
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        We couldn't find any properties matching your current search. Try
        adjusting your filters or exploring more options.
      </p>

      <button
        onClick={onClear}
        className="mt-6 rounded-full bg-[#1b3b2b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#143022]"
      >
        Clear filters
      </button>
    </div>
  );
}

export default PropertyEmptyState;
