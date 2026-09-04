import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import useCreateProperty from "../properties/useCreateProperties";

import toast from "react-hot-toast";

export default function PropertyForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createProperty, isPending: isCreating } = useCreateProperty();

  function onSubmit(data) {
    createProperty(
      {
        data,
        ownerId: user.id,
      },
      {
        onSuccess: (property) => {
          navigate(`/properties/${property.id}/images`);
        },

        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  const isSubmitting = isCreating;

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 pb-16 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#1b3b2b]"
          >
            <ArrowLeft size={17} strokeWidth={1.8} />
            Back
          </button>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b3b2b]">
            List your property
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Tell us about your property
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            Add the details below to create your listing. You can add photos and
            publish your property afterwards.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                Basic information
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Give your property a clear and useful description.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Property title
                </label>

                <input
                  id="title"
                  type="text"
                  placeholder="Modern 4-bedroom duplex in Lekki"
                  {...register("title", {
                    required: "A property title is required",
                  })}
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                />

                {errors.title && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  rows={5}
                  placeholder="Describe the property, its condition, surroundings, and anything that makes it special..."
                  {...register("description", {
                    required: "A description is required",
                    minLength: {
                      value: 20,
                      message: "Description should be at least 20 characters",
                    },
                  })}
                  className="w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                />

                {errors.description && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                Listing details
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Tell buyers or renters what you're offering.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="listing_type"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Listing type
                </label>

                <select
                  id="listing_status"
                  {...register("listing_status", {
                    required: "Choose a listing type",
                  })}
                  className="w-full appearance-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                >
                  <option value="">Select one</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>

                {errors.listing_status && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.listing_status.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Property type
                </label>

                <select
                  id="type"
                  {...register("type", {
                    required: "Choose a property type",
                  })}
                  className="w-full appearance-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                >
                  <option value="">Select one</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Terrace">Terrace</option>
                  <option value="Penthouse">Penthouse</option>
                </select>

                {errors.type && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-500">
                    ₦
                  </span>

                  <input
                    id="price"
                    type="number"
                    placeholder="85000000"
                    {...register("price", {
                      required: "A price is required",
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    })}
                    className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-9 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                  />
                </div>

                {errors.price && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  placeholder="Lekki Phase 1, Lagos"
                  {...register("location", {
                    required: "A location is required",
                  })}
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                />

                {errors.location && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                Property features
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Add the basic specifications of the property.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="beds"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Bedrooms
                </label>

                <input
                  id="beds"
                  type="number"
                  min="0"
                  placeholder="4"
                  {...register("beds", {
                    required: "Required",
                    min: {
                      value: 0,
                      message: "Invalid number",
                    },
                  })}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                />

                {errors.beds && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.beds.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="baths"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Bathrooms
                </label>

                <input
                  id="baths"
                  type="number"
                  min="0"
                  placeholder="4"
                  {...register("bathrooms", {
                    required: "Required",
                    min: {
                      value: 0,
                      message: "Invalid number",
                    },
                  })}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                />

                {errors.bathrooms && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.baths.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Area (sq ft)
                </label>

                <input
                  id="area"
                  type="number"
                  min="0"
                  placeholder="2400"
                  {...register("area", {
                    required: "Required",
                    min: {
                      value: 1,
                      message: "Invalid area",
                    },
                  })}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[#1b3b2b] focus:ring-2 focus:ring-[#1b3b2b]/10"
                />

                {errors.area && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.area.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full px-6 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#1b3b2b] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#142e21] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating listing..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
