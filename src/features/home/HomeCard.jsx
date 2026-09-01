import { useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomeCard({
  image = "",
  images = [],
  price,
  period,
  title,
  location,
  type = "For Sale",
  verified = true,
}) {
  const navigate = useNavigate();
  const propertyImages = images.length > 0 ? images : image ? [image] : [];

  const [currentImage, setCurrentImage] = useState(0);

  const { isAuthenticated } = useAuth();

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

  const goToImage = (e, index) => {
    e.stopPropagation();
    setCurrentImage(index);
  };

  return (
    <article className="group w-full overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
      <div className="relative aspect-[1.35/1] overflow-hidden bg-neutral-100">
        {propertyImages.length > 0 ? (
          <img
            src={propertyImages[currentImage]}
            alt={`${title} - image ${currentImage + 1}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No image available
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

        {verified && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#1b3b2b] shadow-sm backdrop-blur-md">
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />

            <span>Verified owner</span>
          </div>
        )}

        <button
          type="button"
          aria-label="Save property"
          onClick={(e) => {
            e.stopPropagation();
            if (!isAuthenticated) navigate("/auth");
          }}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white"
        >
          <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        {propertyImages.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={previousImage}
            className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
        )}

        {propertyImages.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={nextImage}
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        )}

        {propertyImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {propertyImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={(e) => goToImage(e, index)}
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
          <div className="absolute bottom-4 right-4 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
            {currentImage + 1} / {propertyImages.length}
          </div>
        )}
      </div>

      <div className="px-5 pb-5 pt-4.5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[19px] font-semibold tracking-[-0.02em] text-neutral-950">
              {price}

              {period && (
                <span className="ml-1 text-sm font-normal text-neutral-500">
                  / {period}
                </span>
              )}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[#eaf0ec] px-3 py-1 text-[11px] font-semibold text-[#1b3b2b]">
            {type}
          </span>
        </div>

        <h3 className="mt-2.5 truncate text-[15px] font-semibold tracking-[-0.01em] text-neutral-900">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.7} />

          <span className="truncate">{location}</span>
        </div>
      </div>
    </article>
  );
}
