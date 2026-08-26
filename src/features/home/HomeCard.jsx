import { useState } from "react";
import {
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Ruler,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HomeCard({
  image,
  images = [],
  price,
  period,
  title,
  location,
  type = "For Sale",
  beds,
  baths,
  area,
  insight,
  insightText,
  verified = true,
}) {
  const propertyImages = image.length > 0 ? image : [images];

  console.log(images.length);

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();

    setCurrentImage((current) =>
      current === propertyImages.length - 1 ? 0 : current + 1,
    );
  };

  const previousImage = (e) => {
    e.stopPropagation();

    setCurrentImage((current) =>
      current === 0 ? propertyImages.length - 1 : current - 1,
    );
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={propertyImages[currentImage]}
          alt={`${title} - image ${currentImage + 1}`}
          className="h-full w-full object-cover transition duration-500"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />

        {verified && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1b3b2b] shadow-sm backdrop-blur">
            <CheckCircle2 className="h-3.5 w-3.5 fill-[#1b3b2b]  text-[var(--color-primary)]" />
            Verified owner
          </div>
        )}

        <button
          type="button"
          aria-label="Save property"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="h-[19px] w-[19px]" strokeWidth={1.8} />
        </button>

        {propertyImages.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 opacity-0 shadow-md backdrop-blur transition-all duration-200 hover:bg-white group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {propertyImages.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 opacity-0 shadow-md backdrop-blur transition-all duration-200 hover:bg-white group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {propertyImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {propertyImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentImage === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}

        {propertyImages.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {currentImage + 1} / {propertyImages.length}
          </div>
        )}

        {insight && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-[#51458a]/95 px-3 py-2 text-white shadow-lg backdrop-blur">
            <TrendingUp className="h-4 w-4" />

            <div className="leading-tight">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
                Market insight
              </p>

              <p className="text-xs font-medium">{insightText}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold tracking-tight text-neutral-950">
              {price}

              {period && (
                <span className="ml-1 text-sm font-normal text-neutral-500">
                  / {period}
                </span>
              )}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[#eaf0ec] px-3 py-1 text-xs font-semibold text-[#1b3b2b]">
            {type}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-1 text-[15px] font-semibold text-neutral-900">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.8} />
          <span>{location}</span>
        </div>

        <div className="mt-5 flex items-center border-t border-neutral-100 pt-4 text-xs text-neutral-600">
          <div className="flex flex-1 items-center gap-2">
            <BedDouble className="h-4 w-4" strokeWidth={1.7} />
            <span>{beds} Beds</span>
          </div>

          <div className="flex flex-1 items-center gap-2 border-l border-neutral-200 pl-4">
            <Bath className="h-4 w-4" strokeWidth={1.7} />
            <span>{baths} Baths</span>
          </div>

          <div className="flex flex-1 items-center gap-2 border-l border-neutral-200 pl-4">
            <Ruler className="h-4 w-4" strokeWidth={1.7} />
            <span>{area}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
