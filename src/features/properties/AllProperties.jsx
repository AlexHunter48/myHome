import { ArrowLeft, Home, Sparkles } from "lucide-react";
import HomeCard from "../home/HomeCard";
import useProperties from "./useProperties";
import { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
export default function AllProperties() {
  const navigate = useNavigate();
  const { properties, isPending: loading, error } = useProperties();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8 bg-[var(--color-background)] min-h-screen">
        <div className="mb-10 border-b border-neutral-200/60 pb-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(-1)}
              className="group mb-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </button>

            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase  text-[var(--color-primary)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Global Directory</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-3xl">
                Explore all homes
              </h1>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                Browse our complete collection of verified properties across
                premium locations.
              </p>
            </div>

            {!loading && !error && (
              <p className="text-sm text-[var(--color-text-secondary)]">
                <span className="font-medium text-[var(--color-text-primary)]">
                  {properties?.length ?? 0}
                </span>{" "}
                {properties?.length === 1 ? "property" : "properties"} available
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="group flex flex-col">
                <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-neutral-200/80 shadow-sm" />
                <div className="space-y-2.5 px-1 pt-4">
                  <div className="h-4 w-3/4 animate-pulse rounded-md bg-neutral-200/80" />
                  <div className="h-3.5 w-1/2 animate-pulse rounded-md bg-neutral-200/80" />
                  <div className="h-4 w-1/3 animate-pulse rounded-md bg-neutral-200/80 pt-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="my-8 flex min-h-[400px] items-center justify-center rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-sm">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100/80 text-neutral-600">
                <Home className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-medium tracking-tight text-[var(--color-text-primary)]">
                Couldn't load properties
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Something went wrong while loading the properties. Please check
                your connection and try again.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && properties?.length === 0 && (
          <div className="my-8 flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-neutral-200/60 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100/80 text-neutral-500">
              <Home className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-medium text-[var(--color-text-primary)]">
              No properties found
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
              There are no properties to display right now. Check back soon for
              new listings.
            </p>
          </div>
        )}

        {!loading && !error && properties?.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <HomeCard key={property.id} {...property} variant="default" />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
