import {
  ArrowLeft,
  Bath,
  BedDouble,
  ChevronDown,
  Eye,
  EyeDashed,
  Image,
  MessageCircleCheck,
  Pencil,
  Pin,
  Ruler,
  Tag,
  KeyRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useGetProperty from "../properties/useGetProperty";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ManageListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { property, isPending: isLoading, error } = useGetProperty(id);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Loading listing...
        </p>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6">
        <div className="text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            We couldn't load this listing.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 rounded-xl bg-[#1b3b2b] px-5 py-3 text-sm font-medium text-white"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group mb-6 flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#1b3b2b]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white transition group-hover:border-[#1b3b2b]/20 group-hover:bg-[#EAF0EC]">
              <ArrowLeft size={17} strokeWidth={1.8} />
            </span>
            Back to listings
          </button>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b3b2b]">
            Listing management
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Manage your listing
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
            Manage your property, monitor its activity, and keep your listing up
            to date.
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="h-56 lg:h-full lg:min-h-[280px]">
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.title || "Property"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#eef1ed]">
                  <div className="text-center">
                    <Image
                      size={24}
                      className="mx-auto text-neutral-400"
                      strokeWidth={1.6}
                    />

                    <p className="mt-2 text-sm text-neutral-500">
                      No photos yet
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center gap-2">
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

                  <span className="rounded-full bg-[#EAF0EC] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1b3b2b]">
                    {property.status}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text)]">
                  {property.title}
                </h2>

                <p className="mt-2 flex items-start gap-1.5 text-sm text-[var(--color-text-secondary)]">
                  <Pin
                    size={15}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0"
                  />
                  {property.location}
                </p>

                <p className="mt-5 text-xl font-medium tracking-[-0.02em] text-[var(--color-text)]">
                  {formatCurrency(property.price)}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <BedDouble size={16} strokeWidth={1.7} />
                    {property.beds}{" "}
                    {property.beds === 1 ? "bedroom" : "bedrooms"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Bath size={16} strokeWidth={1.7} />
                    {property.bathrooms}{" "}
                    {property.bathrooms === 1 ? "bathroom" : "bathrooms"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Ruler size={16} strokeWidth={1.7} />
                    {property.area} sqm
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/properties/${property.id}`)}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b3b2b] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#163225] hover:shadow-md"
              >
                <Eye size={16} strokeWidth={1.8} />
                View listing
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
              Listing activity
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              See how your listing is performing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0EC] text-[#1b3b2b]">
                  <Eye size={19} strokeWidth={1.8} />
                </div>

                <span className="text-xs text-neutral-400">Total</span>
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                {property.views ?? 0}
              </p>

              <p className="mt-1 text-sm text-neutral-500">Listing views</p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0EC] text-[#1b3b2b]">
                  <MessageCircleCheck size={19} strokeWidth={1.8} />
                </div>

                <span className="text-xs text-neutral-400">Total</span>
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                {property.enquiries ?? 0}
              </p>

              <p className="mt-1 text-sm text-neutral-500">Enquiries</p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
              Manage listing
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Make changes to your property or manage how it appears.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white">
            <button
              type="button"
              onClick={() => navigate(`/listings/${property.id}/edit`)}
              className="flex w-full items-center justify-between border-b border-neutral-200/70 p-5 text-left transition hover:bg-neutral-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                  <Pencil size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Edit listing
                  </p>

                  <p className="mt-0.5 text-xs text-neutral-500">
                    Update your property details
                  </p>
                </div>
              </div>

              <ChevronDown
                size={18}
                strokeWidth={1.7}
                className="-rotate-90 text-neutral-400"
              />
            </button>

            <button
              type="button"
              onClick={() => navigate(`/listings/${property.id}/edit/photos`)}
              className="flex w-full items-center justify-between border-b border-neutral-200/70 p-5 text-left transition hover:bg-neutral-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                  <Image size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Manage photos
                  </p>

                  <p className="mt-0.5 text-xs text-neutral-500">
                    Add, remove, reorder, or change your cover photo
                  </p>
                </div>
              </div>

              <ChevronDown
                size={18}
                strokeWidth={1.7}
                className="-rotate-90 text-neutral-400"
              />
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between border-b border-neutral-200/70 p-5 text-left transition hover:bg-neutral-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                  <EyeDashed size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Unpublish
                  </p>

                  <p className="mt-0.5 text-xs text-neutral-500">
                    Remove this listing from the marketplace
                  </p>
                </div>
              </div>

              <ChevronDown
                size={18}
                strokeWidth={1.7}
                className="-rotate-90 text-neutral-400"
              />
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between p-5 text-left transition hover:bg-neutral-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                  <ChevronDown size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-900">More</p>

                  <p className="mt-0.5 text-xs text-neutral-500">
                    Additional listing actions
                  </p>
                </div>
              </div>

              <ChevronDown
                size={18}
                strokeWidth={1.7}
                className="text-neutral-400"
              />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
