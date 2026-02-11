import axios from "axios";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB matching backend limit
const ALLOWED_TYPES = [
  "image/png",
  "image/x-png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const uploadImage = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error("Only JPG, PNG, and WEBP images are allowed");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image must be less than 5MB");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post("/api/builder/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data || !response.data.url) {
      throw new Error("Failed to get upload URL from server");
    }

    return response.data.url;
  } catch (error) {
    console.error("Upload service error:", error);
    const message = error.response?.data?.message || error.message || "Error uploading image";
    toast.error(message);
    throw error;
  }
};
