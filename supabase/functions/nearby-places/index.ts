import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const categories = [
  {
    key: "schools",
    label: "Schools",
    category: "education.school",
  },
  {
    key: "banks",
    label: "Banks",
    category: "service.financial.bank",
  },
  {
    key: "healthcare",
    label: "Healthcare",
    category: "healthcare.hospital",
  },
  {
    key: "shopping",
    label: "Shopping",
    category:
      "commercial.shopping_mall,commercial.supermarket,commercial.marketplace",
  },
  {
    key: "gyms",
    label: "Gyms",
    category: "sport.fitness",
  },
  {
    key: "worship",
    label: "Places of worship",
    category: "religion",
  },
];

function isValidPlace(properties: any) {
  const name = properties.name?.trim();

  if (!name) return false;

  const nameLower = name.toLowerCase();

  const invalidWords = [
    "road",
    "street",
    "avenue",
    "close",
    "drive",
    "crescent",
    "lane",
    "way",
    "expressway",
    "roundabout",
  ];

  return !invalidWords.some(
    (word) =>
      nameLower === word ||
      nameLower.endsWith(` ${word}`) ||
      nameLower.includes(` ${word},`),
  );
}

async function fetchPlaces({
  latitude,
  longitude,
  category,
  radius,
  apiKey,
}: {
  latitude: number;
  longitude: number;
  category: string;
  radius: number;
  apiKey: string;
}) {
  const params = new URLSearchParams({
    categories: category,
    filter: `circle:${longitude},${latitude},${radius}`,
    bias: `proximity:${longitude},${latitude}`,
    limit: "10",
    apiKey,
  });

  const response = await fetch(
    `https://api.geoapify.com/v2/places?${params}`,
  );

  if (!response.ok) {
    console.error(
      `Geoapify failed for ${category}:`,
      await response.text(),
    );

    return [];
  }

  const data = await response.json();

  return (data.features ?? [])
    .filter((place: any) => isValidPlace(place.properties))
    .map((place: any) => {
      const properties = place.properties;

      return {
        name: properties.name,
        address:
          properties.address_line2 ||
          properties.address_line1 ||
          null,
        distance: properties.distance ?? null,
        latitude: properties.lat ?? null,
        longitude: properties.lon ?? null,
      };
    });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { latitude, longitude } = await req.json();

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return new Response(
        JSON.stringify({
          error: "Latitude and longitude are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const GEOAPIFY_API_KEY = Deno.env.get("GEOAPIFY_API_KEY");

    if (!GEOAPIFY_API_KEY) {
      throw new Error("GEOAPIFY_API_KEY is not configured");
    }

    const results: Record<string, unknown[]> = {};

    for (const item of categories) {
      
      let places = await fetchPlaces({
        latitude,
        longitude,
        category: item.category,
        radius: 5000,
        apiKey: GEOAPIFY_API_KEY,
      });

     
      if (places.length === 0) {
        places = await fetchPlaces({
          latitude,
          longitude,
          category: item.category,
          radius: 15000,
          apiKey: GEOAPIFY_API_KEY,
        });
      }

      results[item.key] = places;
    }

    return new Response(
      JSON.stringify({
        results,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});