import { ArrowRight, Home as HomeIcon } from "lucide-react";
import HomeCard from "./HomeCard";
import useProperties from "../properties/useProperties";
import { useNavigate } from "react-router-dom";

export default function FeaturedHomes() {
  const { properties, isPending, error } = useProperties();

  const homes = properties?.slice(0, 4);
  const navigate = useNavigate();
  return (
    <section className="bg-[#F7F5F0] px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]  text-[var(--color-primary)]">
              <span>Featured homes</span>

              <HomeIcon className="h-3.5 w-3.5" strokeWidth={2} />
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-950 md:text-5xl lg:text-[3.5rem]">
              Handpicked homes
              <br />
              from{" "}
              <span className=" text-[var(--color-primary)]">
                verified owners.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-neutral-600 md:text-base">
              Explore trusted properties across Nigeria. No agents, no hidden
              fees — just genuine homes.
            </p>
          </div>
          {/* 
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:justify-end">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${
                  index === 0
                    ? "border-[#1b3b2b] bg-[var(--color-primary)] text-white"
                    : "border-neutral-200 bg-white/60 text-neutral-700 hover:border-[#1b3b2b] hover:text-[#1b3b2b]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div> */}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="group flex items-center gap-2 text-sm font-semibold text-[#1b3b2b]"
          >
            Explore properties
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </button>
        </div>

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

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {homes?.map((home) => (
            <HomeCard key={home.id} {...home} />
          ))}
        </div>

        <div className="mt-12 lg:mt-20 grid overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/60 md:grid-cols-3 gap-x-6">
          <TrustItem
            si
            icon="✓"
            title="Verified owners"
            description="Every property is listed by verified owners."
          />

          <TrustItem
            icon="↗"
            title="MyHome Insights"
            description="Understand local pricing and market trends."
          />

          <TrustItem
            icon="⌁"
            title="Direct & transparent"
            description="Connect directly with owners. No hidden fees."
          />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 border-neutral-200/70 p-6 md:border-r md:last:border-r-0 lg:px-8">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1b3b2b] text-xl text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>

        <p className="mt-1 max-w-xs text-xs leading-5 text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  );
}
