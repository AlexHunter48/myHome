import "@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { address } = await req.json();

    if (!address?.trim()) {
      return new Response(
        JSON.stringify({ error: "Address is required" }),
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

    const params = new URLSearchParams({
      text: address,
      apiKey: GEOAPIFY_API_KEY,
      limit: "1",
      filter: "countrycode:ng",
    });

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?${params}`,
    );

    if (!response.ok) {
      throw new Error("Failed to geocode address");
    }

    const data = await response.json();

    if (!data.features?.length) {
      return new Response(
        JSON.stringify({
          error: "Could not find coordinates for this address",
        }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const properties = data.features[0].properties;

    return new Response(
      JSON.stringify({
        latitude: properties.lat,
        longitude: properties.lon,
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
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
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