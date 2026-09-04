import {
  BedDouble,
  Bath,
  Ruler,
  Heart,
  Share2,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  House,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useProperty from "../features/properties/useProperty";
import Loader from "../components/ui/Loader";

export default function PropertyDetail() {
  console.log("🔥 PROPERTY DETAIL RENDERING");
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { property, isPending, error } = useProperty(id);

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  function nextImage() {
    setActiveImage((current) =>
      current === property.property_images.length - 1 ? 0 : current + 1,
    );
  }

  function previousImage() {
    setActiveImage((current) =>
      current === 0 ? property.property_images.length - 1 : current - 1,
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-20 pt-10 sm:pt-15">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="group flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#1b3b2b]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white transition group-hover:border-[#1b3b2b]/20 group-hover:bg-[#EAF0EC]">
              <House size={17} strokeWidth={1.8} />
            </span>

            <span className="hidden sm:block">Home</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-100"
              aria-label="Share property"
            >
              <Share2 size={18} strokeWidth={1.7} />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-100"
              aria-label="Save property"
            >
              <Heart size={18} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[34px]">
          <div className="grid h-[420px] grid-cols-1 gap-2 sm:h-[520px] lg:grid-cols-2">
            <div className="relative h-full overflow-hidden lg:rounded-l-[34px]">
              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="group relative h-full w-full cursor-pointer"
              >
                <img
                  src={property.property_images[activeImage].url}
                  alt={property.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.01]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white/95 px-5 py-2.5 text-xs font-semibold text-neutral-800 shadow-lg">
                    View all photos
                  </span>
                </div>
              </button>

              <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-black/45 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
                {activeImage + 1} / {property.property_images.length}
              </div>

              <div className="absolute bottom-5 right-5 flex gap-2">
                <button
                  type="button"
                  onClick={previousImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={19} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight size={19} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <div className="hidden grid-cols-2 gap-2 lg:grid">
              {property.property_images.slice(1, 5).map((image, index) => {
                const imageIndex = index + 1;
                const isActive = activeImage === imageIndex;

                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => {
                      setActiveImage(imageIndex);
                      setIsGalleryOpen(true);
                    }}
                    className={`group relative cursor-pointer overflow-hidden ${
                      isActive ? "ring-2 ring-white ring-inset" : ""
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${property.title} ${index + 2}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-neutral-800 shadow-lg">
                        View photo
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {isGalleryOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 text-white">
            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8">
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <span className="text-2xl leading-none">×</span>
                <span>Close</span>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium tracking-wide text-white/90">
                {activeImage + 1} / {property.property_images.length}
              </div>

              <div className="hidden sm:block">
                <span className="text-sm text-white/60">MyHome</span>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-4 pb-28 pt-20 sm:px-16">
              <img
                src={property.property_images[activeImage].url}
                alt={property.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={previousImage}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/10 sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} strokeWidth={1.6} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/10 sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight size={24} strokeWidth={1.6} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/50 px-4 py-4 backdrop-blur-xl">
              <div className="mx-auto flex max-w-[1400px] gap-2 overflow-x-auto pb-1">
                {property.property_images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition sm:h-20 sm:w-28 ${
                      activeImage === index
                        ? "ring-2 ring-white"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${property.title} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    {activeImage === index && (
                      <div className="absolute inset-0 bg-white/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_390px] lg:gap-16">
          <div>
            <div className="border-b border-neutral-200 pb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#EAF0EC] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1b3b2b]">
                  {property.listing_status}
                </span>

                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-600">
                  {property.type}
                </span>

                {property.verified && (
                  <span className="flex items-center gap-1.5 rounded-full border border-[#1b3b2b]/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#1b3b2b]">
                    <ShieldCheck size={13} strokeWidth={2} />
                    Verified
                  </span>
                )}
              </div>

              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                {property.title}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                <MapPin
                  size={17}
                  strokeWidth={1.7}
                  className="text-[#1b3b2b]"
                />

                <span>{property.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-neutral-200 py-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF0EC] text-[#1b3b2b]">
                  <BedDouble size={19} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {property.beds}
                  </p>
                  <p className="text-xs text-neutral-500">Bedrooms</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-l border-neutral-200 pl-4 sm:pl-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF0EC] text-[#1b3b2b]">
                  <Bath size={19} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {property.bathrooms}
                  </p>
                  <p className="text-xs text-neutral-500">Bathrooms</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-l border-neutral-200 pl-4 sm:pl-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF0EC] text-[#1b3b2b]">
                  <Ruler size={19} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {property.area.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-500">sq ft</p>
                </div>
              </div>
            </div>

            <section className="border-b border-neutral-200 py-8">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                About this property
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600 sm:text-[15px]">
                {property.description}
              </p>
            </section>

            <section className="py-8">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                Location
              </h2>

              <div className="mt-5 flex min-h-[220px] items-center justify-center rounded-3xl border border-neutral-200 bg-[#eeece6]">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1b3b2b] shadow-sm">
                    <MapPin size={21} strokeWidth={1.7} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-neutral-800">
                    {property.location}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Map integration coming soon
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                {property.listing_status}
              </p>

              <div className="mt-2">
                <span className="text-3xl font-semibold tracking-tight text-[var(--color-text)]">
                  ₦{property.price.toLocaleString()}
                </span>
              </div>

              <p className="mt-2 text-sm text-neutral-500">
                Contact the owner directly about this property.
              </p>

              <div className="my-6 border-t border-neutral-200" />

              <button
                type="button"
                className="w-full rounded-full bg-[#1b3b2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#142e21] active:scale-[0.99]"
              >
                Contact owner
              </button>

              <button
                type="button"
                className="mt-3 w-full rounded-full border border-neutral-200 px-5 py-3.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 active:scale-[0.99]"
              >
                Schedule a viewing
              </button>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F7F8F5] p-4">
                <ShieldCheck
                  size={19}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-[#1b3b2b]"
                />

                <div>
                  <p className="text-xs font-semibold text-neutral-800">
                    Verified listing
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    This property has been verified by MyHome.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
