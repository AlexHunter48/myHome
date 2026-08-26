import { ArrowRight, Home as HomeIcon } from "lucide-react";
import HomeCard from "./HomeCard";

import home1bathroom from "../../assets/bathroom1.png";
import home1Exterior from "../../assets/exterior1.png";
import home1Kitchen from "../../assets/kitchen1.png";
import home1Living from "../../assets/living-room1.png";
import home1bedroom from "../../assets/bedroom1.png";
import home2bathroom from "../../assets/bathroom2.png";
import home2Exterior from "../../assets/exterior2.png";
import home2Kitchen from "../../assets/kitchen2.png";
import home2Living from "../../assets/living-room2.png";
import home2bedroom from "../../assets/bedroom2.png";

import home3bathroom from "../../assets/bathroom3.png";
import home3Exterior from "../../assets/exterior3.png";
import home3Kitchen from "../../assets/kitchen3.png";
import home3Living from "../../assets/living-room3.png";
import home3bedroom from "../../assets/bedroom3.png";

import home4bathroom from "../../assets/bathroom4.png";
import home4Exterior from "../../assets/exterior4.png";
import home4Kitchen from "../../assets/kitchen4.png";
import home4Living from "../../assets/living-room4.png";
import home4bedroom from "../../assets/bedroom4.png";

const homes = [
  {
    id: 1,
    image: [
      home1Exterior,
      home1Living,
      home1Kitchen,
      home1bathroom,
      home1bedroom,
    ],
    price: "₦120,000,000",
    title: "4 Bedroom Duplex with Pool",
    location: "Lekki Phase 1, Lagos",
    type: "For Sale",
    beds: 4,
    baths: 4,
    area: "350 sqm",
    verified: true,
    insight: true,
    insightText: "8% above area average",
  },

  {
    id: 2,
    image: [
      home2Exterior,
      home2Living,
      home2Kitchen,
      home2bathroom,
      home2bedroom,
    ],
    price: "₦85,000,000",
    title: "5 Bedroom Fully Detached Duplex",
    location: "Maitama, Abuja",
    type: "For Sale",
    beds: 5,
    baths: 6,
    area: "500 sqm",
    verified: true,
    insight: true,
    insightText: "Great value for its size",
  },

  {
    id: 3,
    image: [
      home3Exterior,
      home3Living,
      home3Kitchen,
      home3bathroom,
      home3bedroom,
    ],
    price: "₦4,500,000",
    period: "year",
    title: "3 Bedroom Apartment",
    location: "Victoria Island, Lagos",
    type: "For Rent",
    beds: 3,
    baths: 3,
    area: "150 sqm",
    verified: true,
    insight: true,
    insightText: "Prices rising in this area",
  },

  {
    id: 4,
    image: [
      home4Exterior,
      home4Living,
      home4Kitchen,
      home4bathroom,
      home4bedroom,
    ],
    price: "₦65,000,000",
    title: "3 Bedroom Bungalow",
    location: "GRA, Port Harcourt",
    type: "For Sale",
    beds: 3,
    baths: 3,
    area: "220 sqm",
    verified: true,
    insight: true,
    insightText: "High demand in this area",
  },
];

const filters = [
  "All",
  "For Rent",
  "For Sale",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
];

export default function FeaturedHomes() {
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
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="group flex items-center gap-2 text-sm font-semibold text-[#1b3b2b]"
          >
            View all homes
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {homes.map((home) => (
            <HomeCard key={home.id} {...home} />
          ))}
        </div>

        <div className="mt-12 grid overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/60 md:grid-cols-3 gap-x-6">
          <TrustItem
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1b3b2b] text-lg text-white">
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
