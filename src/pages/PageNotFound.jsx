import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <span className="inline-block mb-6 text-xs font-semibold tracking-[0.25em] uppercase text-primary/70">
          MyHome
        </span>

        <h1 className="text-[clamp(7rem,20vw,12rem)] leading-none font-semibold tracking-[-0.07em] text-primary">
          404
        </h1>

        <div className="mx-auto mt-2 mb-8 h-px w-16 bg-primary/20" />

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
          This place doesn't exist.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm sm:text-base leading-7 text-gray-500">
          The page you're looking for may have been moved, removed, or perhaps
          never existed in the first place.
        </p>

        <Link
          to="/properties"
          className="inline-flex items-center justify-center mt-8 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Explore properties
        </Link>

        <p className="mt-10 text-xs tracking-wide text-gray-400">
          Find a place that feels like home.
        </p>
      </div>
    </main>
  );
}

export default PageNotFound;
