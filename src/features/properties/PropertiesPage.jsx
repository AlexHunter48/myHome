import {
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  ArrowRight,
} from "lucide-react";

import StickySearch from "../home/StickySearch";

import PropertySection from "./PropertySection";
import { useState } from "react";

const featuredHomes = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    price: "₦85m",
    title: "Modern 4 Bedroom Residence",
    location: "Lekki Phase 1, Lagos",
    type: "For Sale",
    beds: 4,
    baths: 5,
    area: "420 sqm",
    insight: true,
    insightText: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    price: "₦120m",
    title: "Luxury Contemporary Villa",
    location: "Ikoyi, Lagos",
    type: "For Sale",
    beds: 5,
    baths: 6,
    area: "560 sqm",
    insight: true,
    insightText: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
    price: "₦65m",
    title: "Elegant 3 Bedroom Apartment",
    location: "Victoria Island, Lagos",
    type: "For Sale",
    beds: 3,
    baths: 4,
    area: "280 sqm",
    insight: true,
    insightText: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
    price: "₦95m",
    title: "Spacious Family Home",
    location: "Chevron, Lekki",
    type: "For Sale",
    beds: 4,
    baths: 5,
    area: "450 sqm",
    insight: true,
    insightText: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
    price: "₦75m",
    title: "Modern Smart Home",
    location: "Ikate, Lekki",
    type: "For Sale",
    beds: 4,
    baths: 4,
    area: "350 sqm",
    insight: true,
    insightText: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    price: "₦150m",
    title: "Premium Waterfront Residence",
    location: "Ikoyi, Lagos",
    type: "For Sale",
    beds: 5,
    baths: 6,
    area: "620 sqm",
    insight: true,
    insightText: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    price: "₦55m",
    title: "Stylish 3 Bedroom Home",
    location: "Sangotedo, Lagos",
    type: "For Sale",
    beds: 3,
    baths: 4,
    area: "310 sqm",
    insight: true,
    insightText: "",
  },
];

const lekkiHomes = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    price: "₦85m",
    title: "Modern 4 Bedroom Residence",
    location: "Lekki Phase 1, Lagos",
    type: "For Sale",
    beds: 4,
    baths: 5,
    area: "420 sqm",
    insight: true,
    insightText: "Prices rising in this area",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    price: "₦72m",
    title: "Contemporary Family Home",
    location: "Ikate, Lekki",
    type: "For Sale",
    beds: 4,
    baths: 4,
    area: "390 sqm",
    insight: true,
    insightText: "Strong buyer demand",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
    price: "₦95m",
    title: "Spacious Family Home",
    location: "Chevron, Lekki",
    type: "For Sale",
    beds: 4,
    baths: 5,
    area: "450 sqm",
    insight: true,
    insightText: "Low flood risk",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
    price: "₦65m",
    title: "Elegant 3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    type: "For Sale",
    beds: 3,
    baths: 4,
    area: "280 sqm",
    insight: true,
    insightText: "Good value for the area",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
    price: "₦78m",
    title: "Modern Smart Residence",
    location: "Osapa, Lekki",
    type: "For Sale",
    beds: 4,
    baths: 4,
    area: "360 sqm",
    insight: true,
    insightText: "Growing neighbourhood",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    price: "₦105m",
    title: "Luxury Garden Residence",
    location: "Chevron, Lekki",
    type: "For Sale",
    beds: 5,
    baths: 5,
    area: "510 sqm",
    insight: true,
    insightText: "Premium neighbourhood",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    price: "₦55m",
    title: "Stylish 3 Bedroom Home",
    location: "Sangotedo, Lagos",
    type: "For Sale",
    beds: 3,
    baths: 4,
    area: "310 sqm",
    insight: true,
    insightText: "Fast-growing area",
  },
];

const filters = ["For Sale", "For Rent", "Apartments", "Houses", "Land"];

export default function Properties() {
  const [location, setLocation] = useState({
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
  });
  return (
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

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 transition hover:border-[#1b3b2b]/40 hover:bg-neutral-50"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>

          <button
            type="button"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 sm:flex"
          >
            Price
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 sm:flex"
          >
            Bedrooms
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 lg:flex"
          >
            More
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-[1600px] px-6 pb-24 lg:px-10">
        {/* INTRO */}
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
          properties={featuredHomes}
        />

        <PropertySection
          title="Victoria Island"
          description="Modern residences close to business, lifestyle and the waterfront."
          properties={featuredHomes}
        />
      </div>
    </main>
  );
}
