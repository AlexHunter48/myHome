import supabase from "./supabase";

export async function geocodeAddress(address) {
  const { data, error } = await supabase.functions.invoke("geocode-address", {
    body: {
      address,
    },
  });

  if (error) throw new Error(error.message);
  console.log(data);

  return data;
}
