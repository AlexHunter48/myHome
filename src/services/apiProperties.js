import supabase from "./supabase";

export async function getProperties() {
  const { data, error } = await supabase.from("properties").select("*");

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }

  return data;
}
