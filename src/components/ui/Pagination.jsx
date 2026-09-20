import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-[var(--color-text-secondary)] transition-all hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Previous page"
      >
        <ChevronLeft size={17} strokeWidth={1.8} />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-all ${
                page === pageNumber
                  ? "bg-[#1b3b2b] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-neutral-100 hover:text-[var(--color-text)]"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-[var(--color-text-secondary)] transition-all hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Next page"
      >
        <ChevronRight size={17} strokeWidth={1.8} />
      </button>
    </div>
  );
}
