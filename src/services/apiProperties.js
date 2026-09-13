import supabase from "./supabase";

export async function getProperties(filters = {}) {
  let query = supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        id,
        image_path,
        display_order
      )
    `,
    )
    .eq("status", "published");

  console.log(filters?.listingStatus);

  if (filters.minimumPrice) {
    query = query.gte("price", Number(filters.minimumPrice));
  }

  if (filters.maximumPrice) {
    query = query.lte("price", Number(filters.maximumPrice));
  }

  if (filters.bedrooms && filters.bedrooms !== "Any") {
    query = query.gte("beds", Number(filters.bedrooms.replace("+", "")));
  }

  if (filters.bathrooms && filters.bathrooms !== "Any") {
    query = query.gte("bathrooms", Number(filters.bathrooms.replace("+", "")));
  }

  if (filters.propertyType) {
    query = query.eq("type", filters.propertyType);
  }

  if (filters.listingStatus) {
    query = query.eq("listing_status", filters.listingStatus);
  }

  if (filters.location) {
    query = query.ilike("neighbourhood", `%${filters.location}%`);
  }

  const { data: properties, error } = await query;
  console.log("FILTER:", filters.listingStatus);
  console.log("RESULT:", properties);
  console.log("ERROR:", error);

  if (error) throw new Error(error.message);

  const formattedProperties = properties.map((property) => {
    const images = property.property_images
      .sort((a, b) => a.display_order - b.display_order)
      .map((image) => {
        const { data } = supabase.storage
          .from("properties-image")
          .getPublicUrl(image.image_path);

        return data.publicUrl;
      });

    return {
      ...property,
      images,
      image: images[0] || "",
    };
  });
  console.log(formattedProperties);
  return formattedProperties;
}

export async function createProperty({ data, ownerId }) {
  const { data: property, error } = await supabase
    .from("properties")
    .insert([
      {
        ...data,
        owner_id: ownerId,
        status: "draft",
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return property;
}

export async function publishProperty(propertyId) {
  const { data: property, error } = await supabase
    .from("properties")
    .update({ status: "published" })
    .eq("id", propertyId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return property;
}

export async function getPropertyById(propertyId) {
  const { data: property, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        id,
        image_path,
        display_order
      )
    `,
    )
    .eq("id", propertyId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const images = property.property_images
    .sort((a, b) => a.display_order - b.display_order)
    .map((image) => {
      const { data } = supabase.storage
        .from("properties-image")
        .getPublicUrl(image.image_path);

      return {
        ...image,
        url: data.publicUrl,
      };
    });

  const result = {
    ...property,
    property_images: images,
  };

  return result;
}

export async function updatePropertyCoordinates({ propertyId, coordinates }) {
  const { data, error } = await supabase
    .from("properties")
    .update({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      neighbourhood: coordinates.neighbourhood,
      city: coordinates.city,
    })
    .eq("id", propertyId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function saveProperty({ userId, propertyId }) {
  const { data: property, error } = await supabase
    .from("saved_properties")
    .insert([
      {
        user_id: userId,
        property_id: propertyId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return property;
}

export async function getSavedProperties({ userId }) {
  const { data, error } = await supabase
    .from("saved_properties")
    .select(
      `
      id,
      property_id,
      properties (
        *,
        property_images (
          id,
          image_path,
          display_order
        )
      )
    `,
    )
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((saved) => {
    const property = saved.properties;

    const images = property.property_images
      .sort((a, b) => a.display_order - b.display_order)
      .map((image) => {
        const { data } = supabase.storage
          .from("properties-image")
          .getPublicUrl(image.image_path);

        return data.publicUrl;
      });

    return {
      ...property,
      images,
      image: images[0] || "",
    };
  });
}

export async function checkSavedProperty({ userId, propertyId }) {
  const { data, error } = await supabase
    .from("saved_properties")
    .select("id")
    .eq("user_id", userId)
    .eq("property_id", propertyId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return !!data;
}

export async function removeSavedProperty({ userId, propertyId }) {
  const { error } = await supabase
    .from("saved_properties")
    .delete()
    .eq("user_id", userId)
    .eq("property_id", propertyId);

  if (error) {
    throw new Error(error.message);
  }
}
