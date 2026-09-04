import supabase from "./supabase";

export async function uploadPropertyImages({ propertyId, images }) {
  const uploadedImages = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const fileName = `${crypto.randomUUID()}-${image.name}`;

    const filePath = `${propertyId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("properties-image")
      .upload(filePath, image);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    uploadedImages.push({
      property_id: propertyId,
      image_path: filePath,
      display_order: i,
    });
  }

  const { data, error } = await supabase
    .from("property_images")
    .insert(uploadedImages)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
