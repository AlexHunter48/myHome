import { Camera, LockKeyhole, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useUploadAvatar } from "../../profiles/useUploadAvatar";
import { useEffect, useRef, useState } from "react";
import { useUpdateProfile } from "../../profiles/useUploadProfile";
import toast from "react-hot-toast";
export default function PersonalInformation() {
  const { profile, user } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [userName, setUserName] = useState("");

  const photoRef = useRef(null);

  useEffect(() => {
    if (profile?.name) {
      setUserName(profile.name);
    }
  }, [profile?.name]);
  const { mutateAsync: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  const isLoading = isUpdatingProfile || isUploadingAvatar;
  async function upload() {
    if (isLoading) return;

    const nameChanged = profile?.name !== userName;

    if (!nameChanged && !selectedAvatar) {
      return;
    }

    try {
      if (nameChanged) {
        await updateProfile({
          userId: profile?.id,
          name: userName,
        });
      }

      if (selectedAvatar) {
        await uploadAvatar({
          userId: profile?.id,
          file: selectedAvatar,
        });
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  }

  return (
    <div className="min-h-full bg-[var(--color-background)] px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[#17221D]">
            Settings
          </h1>

          <p className="mt-2 text-[16px] text-neutral-500">
            Manage your account, preferences and MyHome experience.
          </p>
        </div>

        <section className="overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white">
          <div className="flex items-start justify-between px-8 pt-8">
            <div>
              <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#17221D]">
                Personal information
              </h2>

              <p className="mt-1 text-[15px] text-neutral-500">
                Keep your profile details up to date. This information may be
                visible to other users.
              </p>
            </div>

            {/* <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 sm:flex"
            >
              <Camera size={17} />
              Change photo
            </button> */}
          </div>

          <div className="px-8 pb-8">
            <div className="mt-7 flex items-center gap-5">
              <div className="relative">
                {profile?.avatar_url || avatarPreview ? (
                  <img
                    src={avatarPreview || profile.avatar_url}
                    alt={profile?.name || "Profile"}
                    className="h-20 w-20 rounded-full object-cover object-[center_35%] "
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E9EEE9] text-xl font-semibold text-[#1B3B2B]">
                    {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <input
                  type="file"
                  ref={photoRef}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => photoRef.current?.click()}
                  aria-label="Change profile photo"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-neutral-900">
                  Profile photo
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  JPG, PNG or WEBP. Max 5MB.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-900">
                  Full name
                </label>

                <input
                  type="text"
                  value={userName}
                  defaultValue={profile?.name || ""}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your full name"
                  className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-900">
                  Email address
                </label>

                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 pr-11 text-[15px] text-neutral-500 outline-none"
                  />

                  <LockKeyhole
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                </div>
              </div>

              {/* <div>
                <label className="mb-2 block text-sm font-medium text-neutral-900">
                  Phone number
                </label>

                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
                />
              </div> */}

              {/* <div>
                <label className="mb-2 block text-sm font-medium text-neutral-900">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    type="text"
                    placeholder="Lagos, Nigeria"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-white pl-11 pr-4 text-[15px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
                  />
                </div>
              </div> */}

              {/* <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="mb-2 block text-sm font-medium text-neutral-900">
                    Bio{" "}
                    <span className="font-normal text-neutral-400">
                      (optional)
                    </span>
                  </label>

                  <span className="text-xs text-neutral-400">0/160</span>
                </div>

                <textarea
                  rows={4}
                  maxLength={160}
                  placeholder="Tell people a little about yourself..."
                  className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[15px] leading-6 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/10"
                />
              </div> */}
            </div>

            <div className="mt-7 flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => {
                  setAvatarPreview(null);
                  setSelectedAvatar(null);
                  setUserName(profile?.name);
                }}
                className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium   text-neutral-700 transition hover:bg-neutral-50"
              >
                Discard changes
              </button>

              <button
                type="button"
                onClick={upload}
                disabled={isLoading}
                className="rounded-xl   bg-[var(--color-primary)]  px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
              >
                {isLoading ? "Saving" : "Save changes"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[22px] border border-neutral-200/80 bg-white px-8 py-8">
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#17221D]">
              Profile visibility
            </h2>

            <p className="mt-1 text-[15px] text-neutral-500">
              Control what other users can see on your profile.
            </p>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-neutral-200 pt-6">
            <div className="pr-8">
              <h3 className="text-[15px] font-medium text-neutral-900">
                Show my email address
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Other users won't be able to see your email address.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked="false"
              className="relative h-7 w-12 shrink-0 rounded-full bg-neutral-300 transition"
            >
              <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition" />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-6">
            <div className="pr-8">
              <h3 className="text-[15px] font-medium text-neutral-900">
                Show my phone number
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Choose whether your phone number can be displayed to other
                users.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked="false"
              className="relative h-7 w-12 shrink-0 rounded-full bg-neutral-300"
            >
              <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
