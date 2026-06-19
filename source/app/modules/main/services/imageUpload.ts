import axios from "axios";

// Subida de imágenes gratuita vía Cloudinary (unsigned upload preset). No requiere backend
// ni tarjeta. El cloud name y el preset son públicos (el preset es "unsigned" a propósito).
const CLOUD_NAME = import.meta.env.ENV_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.ENV_CLOUDINARY_UPLOAD_PRESET;

export const isImageUploadConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

export async function uploadImage(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("image-upload-not-configured");
  }
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);
  const res = await axios.post<{ secure_url: string }>(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    form
  );
  return res.data.secure_url;
}
