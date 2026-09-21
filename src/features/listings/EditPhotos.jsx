import {
  ArrowLeft,
  Check,
  GripVertical,
  ImagePlus,
  Star,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import useGetPropertyImages from "../properties/useGetPropertyImages";
import { useEffect, useRef, useState } from "react";
import useEditPropertyImages from "../properties/useEditPropertyImages";

export default function EditPhotos() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const draggedIndex = useRef(null);

  const { images, isPending, error } = useGetPropertyImages(id);

  const { editImages, isPending: isSaving } = useEditPropertyImages();

  const [localImages, setLocalImages] = useState([]);

  useEffect(() => {
    if (images) {
      setLocalImages(images);
    }
  }, [images]);

  // Add photos locally
  function handleUpload(event) {
    const files = Array.from(event.target.files);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      imageUrl: URL.createObjectURL(file),
      isNew: true,
    }));

    setLocalImages((current) => [...current, ...newImages]);

    event.target.value = "";
  }

  // Delete photo locally
  function handleDelete(imageId) {
    setLocalImages((current) =>
      current.filter((image) => image.id !== imageId),
    );
  }

  // Start dragging
  function handleDragStart(index) {
    draggedIndex.current = index;
  }

  // Allow dropping
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Reorder photos
  function handleDrop(dropIndex) {
    const dragIndex = draggedIndex.current;

    if (dragIndex === null || dragIndex === dropIndex) {
      draggedIndex.current = null;
      return;
    }

    setLocalImages((current) => {
      const updatedImages = [...current];

      const [draggedImage] = updatedImages.splice(dragIndex, 1);

      updatedImages.splice(dropIndex, 0, draggedImage);

      return updatedImages;
    });

    draggedIndex.current = null;
  }

  function handleDragEnd() {
    draggedIndex.current = null;
  }

  // Save changes
  function handleSave() {
    editImages(
      {
        propertyId: id,
        originalImages: images || [],
        finalImages: localImages,
      },
      {
        onSuccess: () => {
          navigate(`/listings`);
        },
      },
    );
  }

  if (isPending) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] px-6 pb-16 pt-28">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-4 w-16 rounded bg-neutral-200" />

          <div className="mt-6 h-10 w-64 rounded bg-neutral-200" />

          <div className="mt-3 h-4 w-96 max-w-full rounded bg-neutral-200" />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-2xl bg-neutral-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6">
        <div className="text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            We couldn't load your property photos.
          </p>

          <button
            type="button"
            onClick={() => navigate("/listings")}
            className="mt-5 rounded-xl bg-[#1b3b2b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163225]"
          >
            Back to listings
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 pb-20 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => navigate(`/listings`)}
            className="mb-7 flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#1b3b2b]"
          >
            <ArrowLeft size={17} strokeWidth={1.8} />
            Back to listing
          </button>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b3b2b]">
                Property photos
              </p>

              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-4xl">
                Manage your photos
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
                Choose your best photos, set a cover image, and arrange them in
                the order you want visitors to see them.
              </p>
            </div>

            {/* File input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleUpload}
            />

            {/* Add photos */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-fit items-center gap-2 rounded-xl bg-[#1b3b2b] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#163225] hover:shadow-md"
            >
              <ImagePlus size={17} strokeWidth={1.8} />
              Add photos
            </button>
          </div>
        </div>

        {/* Photos section */}
        <section className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-[0_8px_35px_rgba(0,0,0,0.025)] sm:p-7">
          <div className="mb-6 flex flex-col gap-3 border-b border-neutral-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
                Your photos
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {localImages.length}{" "}
                {localImages.length === 1 ? "photo" : "photos"} · Drag to
                reorder
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <Star size={14} strokeWidth={1.8} />
              <span>First photo is your cover</span>
            </div>
          </div>

          {localImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {localImages.map((image, index) => (
                <div
                  key={image.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={handleDragEnd}
                  className="group relative cursor-grab overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 transition active:cursor-grabbing"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={`Property photo ${index + 1}`}
                      draggable={false}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Top controls */}
                  <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
                    {index === 0 ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-[#1b3b2b] shadow-sm backdrop-blur">
                        <Star
                          size={13}
                          strokeWidth={1.8}
                          className="fill-current"
                        />
                        Cover photo
                      </span>
                    ) : (
                      <span className="rounded-full bg-black/45 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                        Photo {index + 1}
                      </span>
                    )}

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(image.id);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-600 shadow-md transition hover:bg-red-50"
                      aria-label="Remove photo"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  </div>

                  {/* Bottom controls */}
                  <div className="flex items-center justify-between border-t border-neutral-200/80 bg-white px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <GripVertical size={15} strokeWidth={1.8} />
                      Drag to move
                    </div>

                    {index === 0 && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-[#1b3b2b]">
                        <Check size={14} strokeWidth={2} />
                        Main photo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-[#faf9f6] px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8eee9] text-[#1b3b2b]">
                <ImagePlus size={24} strokeWidth={1.7} />
              </div>

              <h3 className="mt-5 text-lg font-medium text-[var(--color-text)]">
                No photos yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-text-secondary)]">
                Add high-quality photos to help potential buyers or renters get
                a better feel for your property.
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 flex items-center gap-2 rounded-xl bg-[#1b3b2b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163225]"
              >
                <ImagePlus size={17} strokeWidth={1.8} />
                Add your first photo
              </button>
            </div>
          )}
        </section>

        {/* Save bar */}
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="text-sm font-medium text-[var(--color-text)]">
              Ready to save your changes?
            </p>

            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Your photo changes won't be published until you save them.
            </p>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1b3b2b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#163225] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Check size={17} strokeWidth={1.8} />
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>

        {/* Note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#dfe7e1] bg-[#f4f7f4] p-4">
          <Star
            size={17}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-[#1b3b2b]"
          />

          <p className="text-sm leading-6 text-[#526157]">
            Your first photo will be displayed as the cover image throughout
            MyHome. Use a clear, well-lit image that best represents the
            property.
          </p>
        </div>
      </div>
    </main>
  );
}
