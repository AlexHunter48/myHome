import { useState } from "react";
import { ImagePlus, X, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import useUploadPropertyImages from "./useUploadPropertyImages";
import usePublishProperty from "./usePublishProperty";

export default function PropertyImages() {
  const { id: propertyId } = useParams();
  console.log(propertyId);
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);

  const { uploadImages, isPending: isUploading } = useUploadPropertyImages();

  const { publish, isPending: isPublishing } = usePublishProperty();

  function handleImageChange(e) {
    const newImages = Array.from(e.target.files || []);

    setSelectedImages((current) => [...current, ...newImages]);

    e.target.value = "";
  }

  function removeImage(index) {
    setSelectedImages((current) => current.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    if (selectedImages.length === 0) {
      toast.error("Please add at least one property photo");
      return;
    }
    console.log(propertyId);

    uploadImages(
      {
        propertyId,

        images: selectedImages,
      },
      {
        onSuccess: () => {
          publish(propertyId, {
            onSuccess: () => {
              toast.success("Property listed successfully");
              navigate(`/properties/${propertyId}`);
            },

            onError: (error) => {
              toast.error(error.message);
            },
          });
        },

        onError: () => {
          toast.error("Failed to upload property photos. Please try again.");
        },
      },
    );
  }

  const isSubmitting = isUploading || isPublishing;

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
            Almost there
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Add your property photos
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            Good photos help people understand your property and make your
            listing stand out.
          </p>
        </div>

        <section className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              Property photos
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Upload multiple photos. You can remove any photo before
              publishing.
            </p>
          </div>

          <input
            type="file"
            id="property-images"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />

          {selectedImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {selectedImages.map((image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="relative aspect-square overflow-hidden rounded-2xl"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Property preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
                  >
                    <X size={15} strokeWidth={2} />
                  </button>
                </div>
              ))}

              <label
                htmlFor="property-images"
                className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 text-neutral-500 transition hover:border-[#1b3b2b] hover:bg-[#EAF0EC]/30"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF0EC] text-[#1b3b2b]">
                  <ImagePlus size={20} strokeWidth={1.8} />
                </div>

                <span className="text-xs font-semibold">Add more</span>
              </label>
            </div>
          ) : (
            <label
              htmlFor="property-images"
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 px-6 py-14 text-center transition hover:border-[#1b3b2b] hover:bg-[#EAF0EC]/30"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF0EC] text-[#1b3b2b]">
                <ImagePlus size={21} strokeWidth={1.8} />
              </div>

              <span className="text-sm font-semibold text-neutral-800">
                Add property photos
              </span>

              <span className="mt-1 text-xs text-neutral-500">
                You can upload multiple images
              </span>
            </label>
          )}
        </section>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="rounded-full px-6 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-50"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-full bg-[#1b3b2b] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#142e21] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading
              ? "Uploading photos..."
              : isPublishing
                ? "Publishing..."
                : "Publish listing"}
          </button>
        </div>
      </div>
    </main>
  );
}
