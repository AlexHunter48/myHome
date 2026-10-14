import { useNavigate, useSearchParams } from "react-router-dom";

import useProperties from "../properties/useProperties";
import { ArrowLeft, House, Sparkles } from "lucide-react";
import HomeCard from "../home/HomeCard";
import Footer from "../../components/layout/Footer";
import { useEffect } from "react";

function CategoryListings() {
  const [searchParams] = useSearchParams();
  const newFilters = {
    minimumPrice: searchParams.get("minPrice") || "",
    maximumPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("beds") || "",
    bathrooms: searchParams.get("baths") || "",
    propertyType: searchParams.get("type") || "",
    listingStatus: searchParams.get("status") || "",
    location: searchParams.get("location") || "",
    listingState: searchParams.get("state") || "",
  };
  const category = searchParams.get("location");

  const { properties, isPending, error } = useProperties(newFilters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   const filteredProperties = useMemo(() => {
  //     if (!category) return properties;

  //     return properties.filter(
  //       (property) => property.type?.toLowerCase() === category.toLowerCase(),
  //     );
  //   }, [properties, category]);

  const categoryTitle = category
    ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
    : "All Properties";
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 pb-14 pt-5 sm:py-8 lg:px-8">
        <div className="mb-6 border-b border-neutral-200/60 pb-5 sm:mb-10 sm:pb-6">
          <button
            onClick={() => navigate(-1)}
            className="group -ml-2 mb-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] sm:mb-3"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </button>

          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Curated Collection</span>
          </div>

          <h1 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-3xl">
            {categoryTitle}
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {properties?.length ?? 0}{" "}
            {properties?.length === 1 ? "property" : "properties"} available for
            direct connection
          </p>
        </div>

        {isPending && (
          <section className="pt-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className={`${
                    index > 1 ? "hidden sm:flex" : "flex"
                  } flex-col overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white`}
                >
                  <div className="aspect-[1.35/1] w-full animate-pulse bg-neutral-200/80" />
                  <div className="space-y-3 px-5 pb-5 pt-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-5 w-28 animate-pulse rounded-md bg-neutral-200/80" />
                      <div className="h-6 w-16 animate-pulse rounded-full bg-neutral-200/80" />
                    </div>
                    <div className="h-4 w-3/4 animate-pulse rounded-md bg-neutral-200/80" />
                    <div className="h-4 w-1/2 animate-pulse rounded-md bg-neutral-200/80" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!isPending && error && (
          <div className="my-6 flex min-h-[320px] items-center justify-center rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-sm sm:my-8 sm:min-h-[400px] sm:p-8">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100/80 text-neutral-600">
                <House className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-medium tracking-tight text-[var(--color-text-primary)]">
                Unable to load listings
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                We encountered an issue fetching properties for this category.
                Please check your connection and try again.
              </p>
            </div>
          </div>
        )}

        {!isPending && !error && (
          <>
            {properties?.length > 0 ? (
              // FIX: gap-y-10 became gap-y-6 on phones (40px between cards was a lot)
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
                {properties.map((property) => (
                  <HomeCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="my-6 flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-neutral-200/60 bg-white p-6 text-center shadow-sm sm:my-8 sm:min-h-[400px] sm:p-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100/80 text-neutral-500">
                  <House className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-medium text-[var(--color-text-primary)]">
                  No properties found
                </h2>
                <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
                  There are currently no active listings matching this category
                  or location. Check back soon as new properties are added.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/properties")}
                  className="mt-6 rounded-full bg-[#1b3b2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#142e21]"
                >
                  Explore all homes
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer render at the bottom of the page */}
      {/* <Footer /> */}
    </div>
  );
}

export default CategoryListings;
