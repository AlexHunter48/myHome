import { SlidersHorizontal, MapPin, X } from "lucide-react";
import StickySearch from "../home/StickySearch";
import PropertySection from "./PropertySection";
import { useState } from "react";
import useProperties from "./useProperties";
import FilterModal, { useFilter } from "../../components/ui/FilterModal";
import { useNavigate, useSearchParams } from "react-router-dom";

const filters = ["For Sale", "For Rent", "Apartments", "Houses", "Land"];

function FilterContent({ filters, setFilters }) {
  const { close } = useFilter();
  const navigate = useNavigate();
  function formatPriceInput(value) {
    if (!value) return "";

    const number = value.replace(/\D/g, "");

    return new Intl.NumberFormat("en-NG").format(number);
  }
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
                      listingStatus: option === "Buy" ? "Sale" : "Rent",
                    }));
                  }}
                  className={` ${
                    filters.listingStatus === option
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
            setBathrooms(null);
            setBedrooms(null);
            setListingStatus(null);
            setPropertyType(null);
            setMaximumPrice("");
            setMinimumPrice("");
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

  const [location, setLocation] = useState({
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
  });
  const [searchParams] = useSearchParams();

  const newFilters = {
    minimumPrice: searchParams.get("minPrice") || "",
    maximumPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("beds") || "",
    bathrooms: searchParams.get("baths") || "",
    propertyType: searchParams.get("type") || "",
    listingStatus: searchParams.get("status") || "",
  };

  const { properties, isPending, error } = useProperties(newFilters);

  const featuredHomes = properties?.slice(0, 7) || [];

  const lekkiHomes =
    properties?.filter((property) =>
      property.location.toLowerCase().includes("lekki"),
    ) || [];

  const ikoyiHomes =
    properties?.filter((property) =>
      property.location.toLowerCase().includes("ikoyi"),
    ) || [];

  const victoriaIslandHomes =
    properties?.filter((property) =>
      property.location.toLowerCase().includes("victoria island"),
    ) || [];

  return (
    <FilterModal>
      <main className="min-h-screen bg-[var(--color-background)] lg:py-8">
        <StickySearch location={location} setLocation={setLocation} />

        <div className="h-[86px] lg:h-[98px]" />

        <section className="border-b border-neutral-200/70 bg-[var(--color-background)]">
          <div className="mx-auto flex max-w-[1600px] items-center gap-2 overflow-x-auto px-6 py-3 lg:px-10 scrollbar-hide">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition ${
                  index === 0
                    ? "border-[#1b3b2b] bg-[#1b3b2b] text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-[#1b3b2b]/40 hover:bg-neutral-50"
                }`}
              >
                {filter}
              </button>
            ))}

            <div className="mx-1 h-6 w-px shrink-0 bg-neutral-200" />

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
          <section className="pt-12 lg:pt-16">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
              <MapPin className="h-4 w-4" strokeWidth={1.8} />
              {`${location.city}, ${location.country}`}
            </div>

            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
              Find a home you'll love
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
              Explore verified properties from trusted owners across Lagos and
              beyond.
            </p>
          </section>

          {isPending && <p className="py-12">Loading properties...</p>}

          {error && (
            <p className="py-12">
              Something went wrong while loading properties.
            </p>
          )}

          {!isPending && !error && (
            <>
              <PropertySection
                title="Featured homes"
                description="Handpicked properties worth taking a closer look at."
                properties={featuredHomes}
              />

              <PropertySection
                title="Popular in Lekki"
                description="Explore homes in one of Lagos' most sought-after areas."
                properties={lekkiHomes}
              />

              <PropertySection
                title="Homes in Ikoyi"
                description="Discover refined homes in one of Lagos' most prestigious neighbourhoods."
                properties={ikoyiHomes}
              />

              <PropertySection
                title="Victoria Island"
                description="Modern residences close to business, lifestyle and the waterfront."
                properties={victoriaIslandHomes}
              />
            </>
          )}
        </div>
      </main>
    </FilterModal>
  );
}
