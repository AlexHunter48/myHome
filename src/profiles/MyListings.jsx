import { Check, ChevronDown, Clock, Eye, House, Plus } from "lucide-react";
import StickySearch from "../features/home/StickySearch";
import heroplant from "../assets/heroplant.png";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useGetMyProperties from "../features/properties/useGetMyProperties";
import PropertyListings from "../features/properties/PropertyListings";
import Pagination from "../components/ui/Pagination";
export default function MyListings() {
  const [isActive, setIsActive] = useState("published");
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const { user } = useAuth();
  const pageSize = 10;
  const { properties, isPending, error, count } = useGetMyProperties({
    id: user?.id,
    page,
    pageSize,
  });

  const totalPages = Math.ceil((count ?? 0) / pageSize);

  const filteredHomes = properties?.filter((property) => {
    if (isActive === "published") {
      return property.status === "published";
    }
    if (isActive === "drafts") {
      return property.status === "draft";
    }
    if (isActive === "all-listings") {
      return true;
    }
  });

  return (
    <div className="relative overflow-hidden bg-[var(--color-background)]">
      <StickySearch />

      <section className="relative isolate overflow-hidden">
        <img
          src={heroplant}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-1/18 top-8 z-0 hidden h-[270px] w-[340px] object-contain xl:block"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-10 pt-12 sm:px-10 lg:px-14 lg:pb-12 lg:pt-14">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#1b3b2b]">
                Owner space
              </p>

              <h1 className="text-4xl font-medium tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
                My Listings
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
                Manage your properties, edit details, and keep track of their
                performance.
              </p>
            </div>

            <button
              type="button"
              className=" xl:absolute xl: right-1/3 xl:bottom-1/2  group flex w-fit shrink-0 items-center gap-2 rounded-2xl bg-[#1b3b2b] px-5 py-3.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#163225] hover:shadow-md"
            >
              <Plus
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:rotate-90"
              />

              <span>List a new property</span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4 max-w-[900px]">
            {/* Total listings */}
            <div className="flex min-h-[86px] items-center justify-between rounded-2xl border border-neutral-200/70 bg-[var(--color-surface)] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8eee9] text-[#1b3b2b]">
                <House size={17} strokeWidth={1.8} />
              </div>

              <div className="text-right">
                <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  3
                </span>

                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] sm:text-sm">
                  Total Listings
                </p>
              </div>
            </div>

            {/* Published */}
            <div className="flex min-h-[86px] items-center justify-between rounded-2xl border border-neutral-200/70 bg-[var(--color-surface)] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8eee9] text-[#1b3b2b]">
                <Check size={17} strokeWidth={1.8} />
              </div>

              <div className="text-right">
                <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  2
                </span>

                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] sm:text-sm">
                  Published
                </p>
              </div>
            </div>

            {/* Draft */}
            <div className="flex min-h-[86px] items-center justify-between rounded-2xl border border-neutral-200/70 bg-[var(--color-surface)] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2eee5] text-[#806d43]">
                <Clock size={17} strokeWidth={1.8} />
              </div>

              <div className="text-right">
                <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  1
                </span>

                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] sm:text-sm">
                  Draft
                </p>
              </div>
            </div>

            {/* Views */}
            <div className="flex min-h-[86px] items-center justify-between rounded-2xl border border-neutral-200/70 bg-[var(--color-surface)] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9eef2] text-[#526b7a]">
                <Eye size={17} strokeWidth={1.8} />
              </div>

              <div className="text-right">
                <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  1.2k
                </span>

                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] sm:text-sm">
                  Total Views
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* filter bar */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
        <nav className="flex w-full items-center justify-around gap-4 border-b border-neutral-200 text-sm font-medium tracking-tight text-[var(--color-text)] sm:justify-center sm:gap-10 lg:w-1/2 lg:justify-between lg:px-10">
          <button
            onClick={() => setIsActive("published")}
            className={`w-24 border-b-[3px] pb-3 pt-1 transition-colors ${
              isActive === "published"
                ? "border-[#1b3b2b] text-[#1b3b2b]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            Published
          </button>

          <button
            onClick={() => setIsActive("drafts")}
            className={`w-24 border-b-[3px] pb-3 pt-1 transition-colors ${
              isActive === "drafts"
                ? "border-[#1b3b2b] text-[#1b3b2b]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            Drafts
          </button>

          <button
            onClick={() => setIsActive("all-listings")}
            className={`w-24 border-b-[3px] pb-3 pt-1 transition-colors ${
              isActive === "all-listings"
                ? "border-[#1b3b2b] text-[#1b3b2b]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            All Listings
          </button>
        </nav>

        <div className="hidden w-1/2 items-center justify-end lg:flex">
          <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]">
            Newest first
            <ChevronDown size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      <PropertyListings isActive={isActive} featuredHomes={filteredHomes} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
