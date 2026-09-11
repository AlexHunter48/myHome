import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OWNER_ID = process.env.MYHOME_SEED_OWNER_ID;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !OWNER_ID) {
  throw new Error(
    "Missing VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or MYHOME_SEED_OWNER_ID in .env"
  );
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const imageDir = path.resolve("./myhome-seed-images");

const { data: properties, error: propertyError } = await supabase
  .from("properties")
  .select("id, title, created_at")
  .eq("owner_id", OWNER_ID)
  .eq("status", "published")
  .order("created_at", { ascending: true });

if (propertyError) throw new Error(propertyError.message);

if (properties.length !== 30) {
  throw new Error(
    `Expected exactly 30 published properties for this owner, but found ${properties.length}. ` +
    `Set MYHOME_SEED_OWNER_ID to the owner UUID used for the 30-property seed.`
  );
}

for (let i = 0; i < properties.length; i++) {
  const property = properties[i];
  const propertyNumber = String(i + 1).padStart(2, "0");

  console.log(`\n[${i + 1}/30] ${property.title}`);

  const { data: existing, error: existingError } = await supabase
    .from("property_images")
    .select("id")
    .eq("property_id", property.id);

  if (existingError) throw new Error(existingError.message);

  if (existing.length > 0) {
    console.log(`  Skipping: ${existing.length} image record(s) already exist.`);
    continue;
  }

  const imageRows = [];

  for (let j = 1; j <= 4; j++) {
    const suffix = j === 1 ? "01-exterior" : `${String(j).padStart(2, "0")}-interior`;
    const localFile = path.join(imageDir, `${propertyNumber}-${suffix}.jpg`);
    const fileBuffer = await fs.readFile(localFile);

    const fileName = `${crypto.randomUUID()}.jpg`;
    const filePath = `${property.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("properties-image")
      .upload(filePath, fileBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (uploadError) throw new Error(uploadError.message);

    imageRows.push({
      property_id: property.id,
      image_path: filePath,
      display_order: j - 1,
    });

    console.log(`  Uploaded image ${j}/4`);
  }

  const { error: insertError } = await supabase
    .from("property_images")
    .insert(imageRows);

  if (insertError) throw new Error(insertError.message);

  console.log("  ✓ Image records created");
}

console.log("\nDone. 30 properties have been processed.");
