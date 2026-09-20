import supabase from "./supabase";

export async function getProfile(id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateProfileRole({ userId }) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      role: "owner",
    })
    .eq("id", userId)

    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
