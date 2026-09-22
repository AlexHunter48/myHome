import {
  Bath,
  Bed,
  BedDouble,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeDashed,
  KeyRound,
  MessageCircleCheck,
  Pencil,
  Pin,
  Ruler,
  Tag,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import useGetPropertyEnquiries from "../listings/useGetPropertyEnquiries";
import PropertyStats from "./PropertyStats";

export default function PropertyListings({ featuredHomes, isActive }) {
  const navigate = useNavigate();
  return (
    <div className="pb-16">
      <div className="mx-auto max-w-[1400px] px-6 pb-6 pt-8 sm:px-8 lg:px-14">
        <h2 className="text-[18px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
          {isActive === "published"
            ? "Published Listings"
            : isActive === "drafts"
              ? "Drafts"
              : "All Listings"}

          <span className="ml-1 text-[14px] font-normal text-[var(--color-text-secondary)]"></span>
        </h2>

        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          {isActive === "published"
            ? "Properties that are live and visible to potential buyers and renters"
            : isActive === "drafts"
              ? "Finish editing and publish these properties when you are ready"
              : "All properties you have listed on MyHome"}
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] space-y-6 px-6 sm:px-8 lg:px-14">
        {featuredHomes?.map((property) => (
          <div
            key={property.id}
            className="overflow-hidden rounded-3xl border border-neutral-200/70 bg-[var(--color-surface)] shadow-[0_8px_35px_rgba(0,0,0,0.025)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)_260px]">
              <div className="h-56 overflow-hidden lg:h-[400px]">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#eef1ed]">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      No photos yet
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8">
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[#1b3b2b]">
                    {property.listing_status === "For Sale" ? (
                      <>
                        <Tag size={14} strokeWidth={1.8} />
                        For Sale
                      </>
                    ) : (
                      <>
                        <KeyRound size={14} strokeWidth={1.8} />
                        For Rent
                      </>
                    )}
                  </span>

                  <h1 className="mt-4 text-2xl font-medium tracking-[-0.035em] text-[var(--color-text)] sm:text-[26px]">
                    {property.title}
                  </h1>

                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                    <Pin size={15} strokeWidth={1.8} />
                    {property.location}
                  </p>

                  <p className="mt-6 text-xl font-medium tracking-[-0.02em] text-[var(--color-text)]">
                    {formatCurrency(property.price)}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={16} strokeWidth={1.7} />
                      {property.beds}{" "}
                      {property.beds > 1
                        ? "bedrooms"
                        : property.beds === 1
                          ? "bedroom"
                          : ""}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Bath size={16} strokeWidth={1.7} />
                      {property.bathrooms}{" "}
                      {property.bathrooms > 1
                        ? "bathrooms"
                        : property.bathrooms === 1
                          ? "bathroom"
                          : ""}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Ruler size={16} strokeWidth={1.7} />
                      {property.area} sqm
                    </span>
                  </div>

                  <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
                    {property.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`${property.id}/manage`)}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b3b2b] px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#163225] hover:shadow-md lg:hidden"
                >
                  Manage listing
                  <ChevronRight size={16} strokeWidth={1.8} />
                </button>
              </div>

              <div className="hidden flex-col justify-between border-l border-neutral-200/70 p-6 lg:flex">
                <PropertyStats key={property.id} property={property} />

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/properties/${property.id}`);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b3b2b] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#163225] hover:shadow-sm"
                  >
                    <Eye size={16} strokeWidth={1.8} />
                    View listing
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`${property.id}/edit`)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                  >
                    <Pencil size={16} strokeWidth={1.8} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/listings/${property.id}/edit/photos`)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                  >
                    Manage photos
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                  >
                    <EyeDashed size={16} strokeWidth={1.8} />
                    Unpublish
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                  >
                    More
                    <ChevronDown size={15} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
