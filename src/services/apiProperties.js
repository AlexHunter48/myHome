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

export async function getMyProperties({ id, page, pageSize, status }) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

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
      { count: "exact" },
    )
    .eq("owner_id", id);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const formattedProperties = data.map((property) => {
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

  return {
    properties: formattedProperties,
    count,
  };
}

export async function getMyPropertyCounts({ id }) {
  const { count: publishedCount, error: publishedError } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("owner_id", id)
    .eq("status", "published");

  const { count: draftCount, error: draftError } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("owner_id", id)
    .eq("status", "draft");

  if (publishedError) {
    throw new Error(publishedError.message);
  }

  if (draftError) {
    throw new Error(draftError.message);
  }

  return {
    publishedCount,
    draftCount,
    totalCount: (publishedCount ?? 0) + (draftCount ?? 0),
  };
}

export async function getProperty(id) {
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
    .eq("id", id)
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

  return {
    ...property,
    property_images: images,
    images: images.map((image) => image.url),
    image: images[0]?.url || "",
  };
}

export async function updateProperty({ id, data }) {
  const { data: property, error } = await supabase
    .from("properties")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return property;
}

export async function getPropertyImages(propertyId) {
  const { data, error } = await supabase
    .from("property_images")
    .select("id, image_path, display_order")
    .eq("property_id", propertyId)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const images = data.map((image) => {
    const { data } = supabase.storage
      .from("properties-image")
      .getPublicUrl(image.image_path);

    return {
      ...image,
      imageUrl: data.publicUrl,
    };
  });

  return images;
}

export async function editPropertyImages({
  propertyId,
  originalImages,
  finalImages,
}) {
  const finalExistingIds = new Set(
    finalImages.filter((image) => !image.isNew).map((image) => image.id),
  );

  const deletedImages = originalImages.filter(
    (image) => !finalExistingIds.has(image.id),
  );

  if (deletedImages.length > 0) {
    const pathsToDelete = deletedImages.map((image) => image.image_path);

    const { error: storageError } = await supabase.storage
      .from("properties-image")
      .remove(pathsToDelete);

    if (storageError) {
      throw new Error(storageError.message);
    }

    const deletedIds = deletedImages.map((image) => image.id);

    const { error: deleteError } = await supabase
      .from("property_images")
      .delete()
      .in("id", deletedIds);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  }

  const newImages = finalImages.filter((image) => image.isNew);

  const uploadedImages = [];

  for (const image of newImages) {
    const fileName = `${crypto.randomUUID()}-${image.file.name}`;
    const filePath = `${propertyId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("properties-image")
      .upload(filePath, image.file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    uploadedImages.push({
      property_id: propertyId,
      image_path: filePath,
    });
  }

  let insertedImages = [];

  if (uploadedImages.length > 0) {
    const { data, error: insertError } = await supabase
      .from("property_images")
      .insert(uploadedImages)
      .select("id, image_path");

    if (insertError) {
      throw new Error(insertError.message);
    }

    insertedImages = data;
  }

  const { data: currentImages, error: fetchError } = await supabase
    .from("property_images")
    .select("id, image_path")
    .eq("property_id", propertyId);

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const orderedImages = finalImages
    .map((localImage) => {
      if (!localImage.isNew) {
        return currentImages.find((image) => image.id === localImage.id);
      }

      return insertedImages.find((image) =>
        image.image_path.endsWith(`-${localImage.file.name}`),
      );
    })
    .filter(Boolean);

  for (let index = 0; index < orderedImages.length; index++) {
    const image = orderedImages[index];

    const { error: updateError } = await supabase
      .from("property_images")
      .update({
        display_order: index,
      })
      .eq("id", image.id);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  return orderedImages;
}

export async function recordPropertyView({ propertyId, visitorId }) {
  const { error } = await supabase.rpc("increment_property_views", {
    property_id: propertyId,
    visitor_id: visitorId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function claimVisitorPropertyViews({ visitorId, userId }) {
  const { error } = await supabase.rpc("claim_visitor_property_views", {
    visitor_id: visitorId,
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getTotalViewCount() {
  const { data, error } = await supabase.from("properties").select("views");

  if (error) {
    throw new Error(error.message);
  }

  const views = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.views;
  }, 0);

  return views;
}

export async function getPropertyEnquiries({ propertyId }) {
  const { count, error } = await supabase
    .from("conversations")
    .select("*", { count: "exact" })
    .eq("property_id", propertyId);

  if (error) {
    throw new Error(error.message);
  }

  return count;
}

export async function getOwnerDetails({ conversationId }) {
  const { data, error } = await supabase
    .from("conversations")
    .select(
      `
      owner_id,
      owner:profiles!conversations_owner_id_fkey (
        name,
        avatar_url
      )
    `,
    )
    .eq("id", conversationId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
