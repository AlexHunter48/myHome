import { Check, ChevronDown, Clock, Eye, House, Plus } from "lucide-react";
import StickySearch from "../features/home/StickySearch";
import heroplant from "../assets/heroplant.png";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useGetMyProperties from "../features/properties/useGetMyProperties";
import PropertyListings from "../features/properties/PropertyListings";
import Pagination from "../components/ui/Pagination";
import useGetMyPropertyCounts from "../features/properties/useGetMyPropertyCount";
import ListingLoader from "../components/ui/ListingLoader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function MyListings() {
  const [isActive, setIsActive] = useState("published");
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const status =
    isActive === "published"
      ? "published"
      : isActive === "drafts"
        ? "draft"
        : null;

  const pageSize = 10;
  const { properties, isPending, error } = useGetMyProperties({
    id: user?.id,
    page,
    pageSize,
    status,
  });

  const {
    publishedCount,
    draftCount,
    totalCount,
    isPending: gettingCount,
    error: countError,
  } = useGetMyPropertyCounts({
    id: user?.id,
  });

  useEffect(() => {
    if (error) {
      toast.error("Could not load your listings. Please try again.");
    }
  }, [error]);

  useEffect(() => {
    if (countError) {
      toast.error("Could not load your listing statistics.");
    }
  }, [countError]);

  const activeCount =
    isActive === "published"
      ? publishedCount
      : isActive === "drafts"
        ? draftCount
        : totalCount;

  const totalPages = Math.ceil((activeCount ?? 0) / pageSize);

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
              onClick={() => navigate("/properties/new")}
              className="group flex w-fit shrink-0 items-center gap-2 rounded-2xl bg-[#1b3b2b] px-5 py-3.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#163225] hover:shadow-md xl:absolute xl:bottom-1/2 xl:right-1/3"
            >
              <Plus
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:rotate-90"
              />

              <span>List a new property</span>
            </button>
          </div>

          <div className="mt-10 grid max-w-[900px] grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4">
            <div className="flex min-h-[86px] items-center justify-between rounded-2xl border border-neutral-200/70 bg-[var(--color-surface)] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8eee9] text-[#1b3b2b]">
                <House size={17} strokeWidth={1.8} />
              </div>

              <div className="text-right">
                <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  {gettingCount ? "..." : totalCount}
                </span>

                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] sm:text-sm">
                  Total Listings
                </p>
              </div>
            </div>

            <div className="flex min-h-[86px] items-center justify-between rounded-2xl border border-neutral-200/70 bg-[var(--color-surface)] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8eee9] text-[#1b3b2b]">
                <Check size={17} strokeWidth={1.8} />
              </div>

              <div className="text-right">
                <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  {gettingCount ? "..." : publishedCount}
                </span>

                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] sm:text-sm">
                  Published
                </p>
              </div>
            </div>

            <div className="flex min-h-[86px] items-center justify-between rounded-2xl border border-neutral-200/70 bg-[var(--color-surface)] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2eee5] text-[#806d43]">
                <Clock size={17} strokeWidth={1.8} />
              </div>

              <div className="text-right">
                <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  {gettingCount ? "..." : draftCount}
                </span>

                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] sm:text-sm">
                  Draft
                </p>
              </div>
            </div>

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

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
        <nav className="flex w-full items-center justify-around gap-4 border-b border-neutral-200 text-sm font-medium tracking-tight text-[var(--color-text)] sm:justify-center sm:gap-10 lg:w-1/2 lg:justify-between lg:px-10">
          <button
            onClick={() => {
              setIsActive("published");
              setPage(1);
            }}
            className={`w-24 border-b-[3px] pb-3 pt-1 transition-colors ${
              isActive === "published"
                ? "border-[#1b3b2b] text-[#1b3b2b]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            Published
          </button>

          <button
            onClick={() => {
              setIsActive("drafts");
              setPage(1);
            }}
            className={`w-24 border-b-[3px] pb-3 pt-1 transition-colors ${
              isActive === "drafts"
                ? "border-[#1b3b2b] text-[#1b3b2b]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            Drafts
          </button>

          <button
            onClick={() => {
              setIsActive("all-listings");
              setPage(1);
            }}
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

      {isPending ? (
        <ListingLoader />
      ) : error ? (
        <div className="mx-auto max-w-[1400px] px-6 py-20 text-center sm:px-8 lg:px-14">
          <p className="text-sm text-[var(--color-text-secondary)]">
            We couldn't load your listings.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-[#1b3b2b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163225]"
          >
            Try again
          </button>
        </div>
      ) : properties?.length === 0 ? (
        <div className="mx-auto max-w-[1400px] px-6 py-20 text-center sm:px-8 lg:px-14">
          <div className="mx-auto max-w-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8eee9] text-[#1b3b2b]">
              <House size={24} strokeWidth={1.7} />
            </div>

            <h2 className="mt-5 text-2xl font-medium tracking-tight text-[var(--color-text)]">
              No listings yet
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              You haven't listed any properties yet. Create your first listing
              and start connecting with potential buyers and renters.
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1b3b2b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163225]"
            >
              <Plus size={17} strokeWidth={1.8} />
              List your first property
            </button>
          </div>
        </div>
      ) : (
        <>
          <PropertyListings isActive={isActive} featuredHomes={properties} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          <div className="h-16 lg:h-24" />
        </>
      )}
    </div>
  );
}
