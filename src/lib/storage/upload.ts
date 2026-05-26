import type { SupabaseClient } from "@supabase/supabase-js";

const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_PDF_BYTES = 10 * 1024 * 1024;

export async function uploadToBucket(
  supabase: SupabaseClient,
  bucket: "videos" | "thumbnails" | "certificates",
  file: File
): Promise<string> {
  if (bucket === "videos") {
    if (!file.type.includes("mp4") && !file.name.endsWith(".mp4")) {
      throw new Error("Only MP4 videos are allowed.");
    }
    if (file.size > MAX_VIDEO_BYTES) throw new Error("Video must be under 100MB.");
  }

  if (bucket === "thumbnails") {
    const ok =
      file.type.startsWith("image/") &&
      (file.type.includes("jpeg") ||
        file.type.includes("png") ||
        file.type.includes("webp") ||
        file.name.match(/\.(jpg|jpeg|png|webp)$/i));
    if (!ok) throw new Error("Thumbnail must be JPG, PNG, or WEBP.");
    if (file.size > MAX_IMAGE_BYTES) throw new Error("Image must be under 5MB.");
  }

  if (bucket === "certificates") {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      throw new Error("Only PDF certificates are allowed.");
    }
    if (file.size > MAX_PDF_BYTES) throw new Error("PDF must be under 10MB.");
  }

  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
