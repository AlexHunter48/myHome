import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import HomeCard from "../features/home/HomeCard";
import Loader from "../components/ui/Loader";
import useGetSavedProperties from "../features/properties/useGetSavedProperties";
import { useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[1600px] items-center justify-center px-6 bg-[var(--color-background)]">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f0eb] shadow-sm">
            <Heart className="h-7 w-7 text-[#1b3b2b]" strokeWidth={1.5} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Your saved homes
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Sign in to save properties and build your private collection of
            homes you love.
          </p>

          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="mt-7 rounded-full bg-[#1b3b2b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#143022] shadow-sm"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 bg-[var(--color-background)]">
        <div className="rounded-3xl border border-neutral-200/60 bg-white p-8 text-center shadow-sm max-w-md w-full">
          <h2 className="text-xl font-medium text-[var(--color-text-primary)]">
            Couldn't load your saved homes
          </h2>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Something went wrong while loading your favourites. Please try
            again.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200/60 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f0eb] shadow-sm">
                <Heart
                  className="h-[21px] w-[21px] text-[#1b3b2b]"
                  strokeWidth={1.6}
                />
              </div>

              <div>
                <h1 className="text-3xl font-light tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
                  Saved homes
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-[15px]">
              Your private collection of properties worth coming back to.
            </p>
          </div>

          {properties.length > 0 && (
            <p className="hidden text-sm text-[var(--color-text-secondary)] sm:block font-medium">
              <span className="text-[var(--color-text-primary)] font-semibold">
                {properties.length}
              </span>{" "}
              {properties.length === 1 ? "property" : "properties"} saved
            </p>
          )}
        </header>

        {properties.length === 0 ? (
          <div className="flex min-h-dvh items-center justify-center">
            <div className=" text-center rounded-3xl border border-neutral-200/60 bg-white p-10 shadow-sm w-full">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100/80 text-neutral-400">
                <Heart className="h-7 w-7" strokeWidth={1.5} />
              </div>

              <h2 className="text-xl font-medium tracking-tight text-[var(--color-text-primary)]">
                No saved homes yet
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                When you find a property you love, tap the heart icon to save it
                here for quick access.
              </p>

              <button
                type="button"
                onClick={() => navigate("/properties")}
                className="mt-7 rounded-full bg-[#1b3b2b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#143022] shadow-sm"
              >
                Explore homes
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <HomeCard key={property.id} {...property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
