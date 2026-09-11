import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import HomeCard from "../features/home/HomeCard";
import Loader from "../components/ui/Loader";
import useGetSavedProperties from "../features/properties/useGetSavedProperties";

export default function Favorites() {
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useAuth();

  const {
    properties = [],
    isPending,
    error,
  } = useGetSavedProperties({
    userId: user?.id,
  });

  // Auth is still initializing
  if (isLoading) {
    return <Loader />;
  }

  // User isn't logged in
  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f0eb]">
            <Heart className="h-7 w-7 text-[#1b3b2b]" strokeWidth={1.5} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Your saved homes
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Sign in to save properties and build your private collection of
            homes you love.
          </p>

          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="mt-7 rounded-full bg-[#1b3b2b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#143022]"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  // Saved properties are loading
  if (isPending) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-900">
            Couldn't load your saved homes
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Something went wrong while loading your favourites.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        {/* Header */}
        <header className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f0eb]">
                <Heart
                  className="h-[21px] w-[21px] text-[#1b3b2b]"
                  strokeWidth={1.6}
                />
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                  Saved homes
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500 sm:text-[15px]">
              Your private collection of properties worth coming back to.
            </p>
          </div>

          {properties.length > 0 && (
            <p className="hidden text-sm text-neutral-500 sm:block">
              {properties.length}{" "}
              {properties.length === 1 ? "property" : "properties"} saved
            </p>
          )}
        </header>

        {/* Empty state */}
        {properties.length === 0 ? (
          <div className="flex min-h-[45vh] items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200/70">
                <Heart className="h-7 w-7 text-neutral-400" strokeWidth={1.5} />
              </div>

              <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                No saved homes yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                When you find a property you love, tap the heart to save it
                here.
              </p>

              <button
                type="button"
                onClick={() => navigate("/properties")}
                className="mt-6 rounded-full bg-[#1b3b2b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#143022]"
              >
                Explore homes
              </button>
            </div>
          </div>
        ) : (
          /* Property grid */
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <HomeCard key={property.id} {...property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
