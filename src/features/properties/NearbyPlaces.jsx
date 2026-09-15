import {
  School,
  Landmark,
  Hospital,
  ShoppingBag,
  Dumbbell,
  Church,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNearbyPlaces } from "../../services/apiNearbyPlaces";

const categories = [
  {
    key: "schools",
    label: "Schools",
    icon: School,
  },
  {
    key: "banks",
    label: "Banks",
    icon: Landmark,
  },
  {
    key: "healthcare",
    label: "Healthcare",
    icon: Hospital,
  },
  {
    key: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
  },
  {
    key: "gyms",
    label: "Gyms",
    icon: Dumbbell,
  },
  {
    key: "worship",
    label: "Places of worship",
    icon: Church,
  },
];

export default function NearbyPlaces({ latitude, longitude }) {
  const {
    data: nearbyPlaces,
    isPending,
    error,
  } = useQuery({
    queryKey: ["nearby-places", latitude, longitude],
    queryFn: () =>
      getNearbyPlaces({
        latitude,
        longitude,
      }),
    enabled: !!latitude && !!longitude,
  });

  if (isPending) {
    return <div>Loading nearby places...</div>;
  }

  if (error) {
    return <div>Unable to load nearby places.</div>;
  }

  return (
    <section className="border-b border-neutral-200 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">What's nearby</h2>

        <p className="mt-1 text-sm text-neutral-500">
          Important places around this home.
        </p>
      </div>

      <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
        {categories.map((category) => {
          const Icon = category.icon;
          const places = nearbyPlaces?.[category.key] ?? [];

          const place = places[0];

          if (!place) return null;

          return (
            <div key={category.key} className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                <Icon size={19} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  {category.label}
                </p>

                <p className="mt-1 truncate text-sm font-medium text-neutral-900">
                  {place.name}
                </p>

                {place.address && (
                  <p className="mt-0.5 truncate text-xs text-neutral-500">
                    {place.address}
                  </p>
                )}
              </div>

              {place.distance != null && (
                <span className="shrink-0 text-sm font-medium text-neutral-500">
                  {place.distance < 1000
                    ? `${Math.round(place.distance)} m`
                    : `${(place.distance / 1000).toFixed(1)} km`}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
