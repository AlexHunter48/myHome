import { ArrowUpRight, MapPin } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "Lagos",
    properties: "1,240 homes",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "Abuja",
    properties: "680 homes",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Port Harcourt",
    properties: "420 homes",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Ibadan",
    properties: "310 homes",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ExploreLocations() {
  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1b3b2b]">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
              Explore locations
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-950 md:text-5xl lg:text-[3.5rem]">
              Find your place
              <br />
              across <span className="text-[#1b3b2b]">Nigeria.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-neutral-600 md:text-base">
              Explore homes in some of Nigeria's most sought-after cities and
              discover the neighbourhood that's right for you.
            </p>
          </div>

          <button
            type="button"
            className="group flex w-fit items-center gap-2 text-sm font-semibold text-[#1b3b2b]"
          >
            Explore all locations
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <LocationCard location={locations[0]} featured />

          <div className="grid grid-cols-1 gap-5">
            <LocationCard location={locations[1]} />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <LocationCard location={locations[2]} />
              <LocationCard location={locations[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location, featured = false }) {
  return (
    <button
      type="button"
      className={`group relative w-full overflow-hidden rounded-3xl text-left ${
        featured ? "min-h-[520px] md:min-h-[610px]" : "min-h-[290px]"
      }`}
    >
      <img
        src={location.image}
        alt={location.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-white/75"></p>

            <h3
              className={`font-serif tracking-tight text-white ${
                featured ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
              }`}
            >
              {location.name}
            </h3>

            <p className="mt-2 text-sm text-white/80">{location.properties}</p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/95 text-[#1b3b2b] shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </button>
  );
}
