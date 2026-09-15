import { SlidersHorizontal, MapPin, X, House, ArrowRight } from "lucide-react";
import StickySearch from "../home/StickySearch";
import PropertySection from "./PropertySection";
import { useState } from "react";
import useProperties from "./useProperties";
import FilterModal, { useFilter } from "../../components/ui/FilterModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropertyEmptyState from "./PropertyEmptyState";
import formatPriceInput from "../../utils/formatInputCurrency";

const filters = ["All", "For Sale", "For Rent"];

function FilterContent({ filters, setFilters }) {
  const { close } = useFilter();
  const navigate = useNavigate();

  function showHomes() {
    const params = new URLSearchParams();

    if (filters.minimumPrice) {
      params.set("minPrice", filters.minimumPrice);
    }

    if (filters.maximumPrice) {
      params.set("maxPrice", filters.maximumPrice);
    }

    if (filters.bedrooms && filters.bedrooms !== "Any") {
      params.set("beds", filters.bedrooms.replace("+", ""));
    }

    if (filters.bathrooms && filters.bathrooms !== "Any") {
      params.set("baths", filters.bathrooms.replace("+", ""));
    }

    if (filters.propertyType) {
      params.set("type", filters.propertyType);
    }

    if (filters.listingStatus) {
      params.set("status", filters.listingStatus);
    }

    navigate(`/properties?${params.toString()}`);

    close();
  }

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 sm:px-7">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
            Filters
          </h2>

          <p className="mt-1 text-xs text-neutral-500">
            Refine your search to find the right home.
          </p>
        </div>

        <button
          type="button"
          aria-label="Close filters"
          onClick={close}
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
        >
          <X className="h-5 w-5" strokeWidth={1.7} />
        </button>
      </div>

      <div className="max-h-[65vh] overflow-y-auto px-6 py-6 sm:px-7">
        <div className="space-y-8">
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-neutral-900">
                Price range
              </h3>

              <p className="mt-1 text-xs text-neutral-500">
                Set the price you're comfortable with.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-neutral-500">
                  Minimum price
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-400">
                    ₦
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatPriceInput(filters.minimumPrice)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      setFilters((current) => ({
                        ...current,
                        minimumPrice: value,
                      }));
                    }}
                    placeholder="0"
                    className="w-full rounded-2xl border border-neutral-200 py-3 pl-9 pr-4 text-sm font-medium text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-neutral-500">
                  Maximum price
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-400">
                    ₦
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatPriceInput(filters.maximumPrice)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFilters((current) => ({
                        ...current,
                        maximumPrice: value,
                      }));
                    }}
                    placeholder="No limit"
                    className="w-full rounded-2xl border border-neutral-200 py-3 pl-9 pr-4 text-sm font-medium text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">
              Bedrooms
            </h3>

            <div className="flex flex-wrap gap-2">
              {["Any", "1+", "2+", "3+", "4+", "5+"].map((bed) => (
                <button
                  key={bed}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setFilters((current) => ({
                      ...current,
                      bedrooms: bed,
                    }));

                    console.log(bed);
                  }}
                  className={`${
                    filters.bedrooms === bed
                      ? "border-[#1b3b2b] bg-[#EAF0EC] text-[#1b3b2b]"
                      : "border-neutral-200 text-neutral-700 hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]"
                  }  rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium  transition  hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]`}
                >
                  {bed}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">
              Bathrooms
            </h3>

            <div className="flex flex-wrap gap-2">
              {["Any", "1+", "2+", "3+", "4+"].map((bath) => (
                <button
                  key={bath}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilters((current) => ({
                      ...current,
                      bathrooms: bath,
                    }));
                  }}
                  className={`${
                    filters.bathrooms === bath
                      ? "border-[#1b3b2b] bg-[#EAF0EC] text-[#1b3b2b]"
                      : "border-neutral-200 text-neutral-700 hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]"
                  }  rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium  transition  hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]`}
                >
                  {bath}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">
              Property type
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "House",
                "Apartment",
                "Duplex",
                "Land",
                "Studio",
                "Townhouse",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setFilters((current) => ({
                      ...current,
                      propertyType: type,
                    }));
                  }}
                  className={` ${
                    filters.propertyType === type
                      ? "border-[#1b3b2b] bg-[#EAF0EC] text-[#1b3b2b]"
                      : "border-neutral-200 text-neutral-700 hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]"
                  }rounded-2xl border border-neutral-200 px-4 py-3 text-left text-sm font-medium  transition hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">
              Listing type
            </h3>

            <div className="flex gap-2">
              {["Buy", "Rent"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilters((current) => ({
                      ...current,
                      listingStatus: option === "Buy" ? "For Sale" : "For Rent",
                    }));
                  }}
                  className={` ${
                    filters.listingStatus ===
                    (option === "Buy" ? "For Sale" : "For Rent")
                      ? "border-[#1b3b2b] bg-[#EAF0EC] text-[#1b3b2b]"
                      : "border-neutral-200 text-neutral-700 hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]"
                  }flex-1 rounded-full border border-neutral-200 px-5 py-3 text-sm font-medium  transition hover:border-[#1b3b2b]/40 hover:bg-[#EAF0EC] hover:text-[#1b3b2b]`}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-6 py-4 sm:px-7">
        <button
          type="button"
          className="text-sm font-medium text-neutral-500 underline-offset-4 transition hover:text-neutral-900 hover:underline"
          onClick={() => {
            setFilters((current) => ({
              ...current,
              bedrooms: null,
              bathrooms: null,
              listingStatus: null,
              propertyType: null,
              maximumPrice: "",
              minimumPrice: "",
            }));
          }}
        >
          Clear all
        </button>

        <button
          type="button"
          onClick={showHomes}
          className="rounded-full bg-[#1b3b2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#142e21] active:scale-[0.99]"
        >
          Show homes
        </button>
      </div>
    </div>
  );
}

export default function Properties() {
  const [searchFilters, setSearchFilters] = useState({
    minimumPrice: "",
    maximumPrice: "",
    bedrooms: null,
    bathrooms: null,
    propertyType: "",
    listingStatus: null,
  });

  const navigate = useNavigate();

  const [location, setLocation] = useState({
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const activeType = searchParams.get("type");
  const activeStatus = searchParams.get("status");

  const newFilters = {
    minimumPrice: searchParams.get("minPrice") || "",
    maximumPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("beds") || "",
    bathrooms: searchParams.get("baths") || "",
    propertyType: searchParams.get("type") || "",
    listingStatus: searchParams.get("status") || "",
    location: searchParams.get("location") || "",
  };

  const { properties, isPending, error } = useProperties(newFilters);

  const featuredHomes = properties?.slice(0, 7) || [];

  const locationGroups = {};

  properties?.forEach((property) => {
    const location = property.neighbourhood?.trim();

    if (!location) return;

    if (!locationGroups[location]) {
      locationGroups[location] = [];
    }

    locationGroups[location].push(property);
  });

  function handleClearFilters() {
    setSearchParams({});
  }

  const hasFilters = searchParams.toString().length > 0;

  const isActive = (filter) =>
    filter === "All"
      ? !activeStatus && !activeType
      : filter === activeStatus || filter === activeType;
  return (
    <FilterModal>
      <main className="min-h-screen bg-[var(--color-background)] lg:py-8">
        <StickySearch location={location} setLocation={setLocation} />

        <div className="h-[86px] lg:h-[98px]" />

        {/* Quick Filters */}
        <section className="border-b border-neutral-200/70 sm:border-b-0">
          <div className="mx-auto flex max-w-[1600px] items-center gap-2 overflow-x-auto px-6 py-3 scrollbar-hide lg:px-10">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams();

                  if (filter === "All") {
                    setSearchParams({});
                    return;
                  }

                  if (filter === "For Sale" || filter === "For Rent") {
                    params.set("status", filter);
                  } else {
                    params.set("type", filter);
                  }

                  navigate(`/properties?${params.toString()}`);
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition ${
                  isActive(filter)
                    ? "border-[#1b3b2b] bg-[#1b3b2b] text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-[#1b3b2b]/40 hover:bg-neutral-50"
                }`}
              >
                {filter}
              </button>
            ))}

            <FilterModal.Open opens="filter">
              <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 transition hover:border-[#1b3b2b]/40 hover:bg-neutral-50"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>
            </FilterModal.Open>

            <FilterModal.Window name="filter">
              <FilterContent
                filters={searchFilters}
                setFilters={setSearchFilters}
              />
            </FilterModal.Window>
          </div>
        </section>

        <div className="mx-auto max-w-[1600px] px-6 pb-24 lg:px-10">
          {/* Page Intro */}
          <section className="pb-7 pt-9 sm:pb-8 sm:pt-12 lg:pb-9 lg:pt-14">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />

              <span>
                {location.city}, {location.country}
              </span>
            </div>

            <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              Find somewhere
              <span className="block text-[#1b3b2b]">
                you'll love to call home.
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
              Explore verified properties from trusted owners across Lagos and
              beyond, curated for the way you want to live.
            </p>
          </section>

          {/* Loading */}
          {isPending && (
            <section className="pt-2">
              <div className="mb-4">
                <div className="h-7 w-48 animate-pulse rounded-lg bg-neutral-200" />
                <div className="mt-2 h-4 w-64 animate-pulse rounded-lg bg-neutral-200" />
              </div>

              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index}>
                    <div className="aspect-[4/3] animate-pulse rounded-[24px] bg-neutral-200" />

                    <div className="space-y-2 px-1 pt-3">
                      <div className="h-5 w-3/4 animate-pulse rounded-lg bg-neutral-200" />
                      <div className="h-4 w-1/2 animate-pulse rounded-lg bg-neutral-200" />
                      <div className="h-4 w-2/3 animate-pulse rounded-lg bg-neutral-200" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Error */}
          {!isPending && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                  <House
                    className="h-5 w-5 text-neutral-500"
                    strokeWidth={1.7}
                  />
                </div>

                <h2 className="mt-4 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                  Something went wrong
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  We couldn't load the properties right now. Please try again.
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {!isPending &&
            !error &&
            (hasFilters && Object.entries(locationGroups).length === 0 ? (
              <PropertyEmptyState onClear={handleClearFilters} />
            ) : (
              <div className="space-y-14 lg:space-y-16">
                {/* Featured Homes */}
                {!hasFilters && (
                  <section>
                    <div className="mb-3 flex items-end justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-3xl">
                            Featured homes
                          </h2>

                          <span className="rounded-full bg-[#e8eee9] px-2.5 py-1 text-[11px] font-semibold text-[#1b3b2b]">
                            {featuredHomes.length}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                          Handpicked properties worth a closer look.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="hidden shrink-0 items-center gap-2 text-sm font-medium text-[#1b3b2b] transition hover:gap-3 sm:flex"
                      >
                        See all
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    <PropertySection
                      title=""
                      description=""
                      properties={featuredHomes}
                    />
                  </section>
                )}

                {Object.entries(locationGroups).map(
                  ([location, locationProperties]) => (
                    <section key={location}>
                      <div className="mb-3 flex items-end justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-3xl">
                              Homes in {location}
                            </h2>

                            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-600">
                              {locationProperties.length}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            Properties available in {location}.
                          </p>
                        </div>

                        <button
                          type="button"
                          className="hidden shrink-0 items-center gap-2 text-sm font-medium text-[#1b3b2b] transition hover:gap-3 sm:flex"
                        >
                          See all
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      <PropertySection
                        title=""
                        description=""
                        properties={locationProperties}
                      />
                    </section>
                  ),
                )}
              </div>
            ))}
        </div>
      </main>
    </FilterModal>
  );
}
