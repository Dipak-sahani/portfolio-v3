import { supabase } from "../lib/supabase";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // ✅ 1MB
const ALLOWED_TYPES = [
  "image/png",
  "image/x-png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const uploadImage = async (file, userId) => {
  if (!file) throw new Error("No file provided");

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image must be less than 1MB");
  }

  const ext = file.name.split(".").pop();
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("user-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("user-images")
    .getPublicUrl(path);

  return data.publicUrl;
};
