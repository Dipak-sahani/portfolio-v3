import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = [
  "image/png",
  "image/x-png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

// safer uuid fallback
const generateUUID = () =>
  crypto?.randomUUID?.() || Date.now().toString();

export const uploadImage = async (file, userId) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error("Only JPG, PNG, and WEBP images are allowed");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image must be less than 1MB");
    }

    const ext = file.name.split(".").pop();
    const fileName = `${generateUUID()}.${ext}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("user-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("user-images")
      .getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error("Failed to get public URL");
    }

    return data.publicUrl;
  } catch (error) {
    toast.error(error.message || "Error uploading image");
    throw error; // ✅ IMPORTANT: propagate error
  }
};
