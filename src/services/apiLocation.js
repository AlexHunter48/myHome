const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function searchLocations(searchText) {
  if (!searchText.trim()) return [];

  const params = new URLSearchParams({
    text: searchText,
    apiKey: GEOAPIFY_API_KEY,
    limit: "5",
    filter: "countrycode:ng",
  });

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?${params}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  const data = await response.json();

  return data.features;
}
