import supabase from "./supabase";

export async function getNearbyPlaces({ latitude, longitude }) {
  const { data, error } = await supabase.functions.invoke("nearby-places", {
    body: {
      latitude,
      longitude,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data.results;
}
