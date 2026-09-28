import supabase from "./supabase";

export async function uploadAvatar({ userId, file }) {
  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  if (!file) {
    throw new Error("Please select an image.");
  }

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  console.log("AUTH USER:", currentUser?.id);
  console.log("PASSED USER:", userId);

  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar.${fileExt}`;

  console.log("BUCKET:", "avatars");
  console.log("FILE PATH:", filePath);

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: false,
      cacheControl: "3600",
    });

  if (uploadError) {
    console.error("UPLOAD ERROR:", uploadError);
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  console.log("PUBLIC AVATAR URL:", publicUrl);

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl,
    })
    .eq("id", userId);

  if (profileError) {
    throw new Error(profileError.message);
  }

  return publicUrl;
}
