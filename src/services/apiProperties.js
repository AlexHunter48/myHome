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
