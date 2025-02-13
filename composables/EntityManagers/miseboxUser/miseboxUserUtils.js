// composables/EntityManagers/miseboxUser/miseboxUserUtils.js
import defaultUserAvatar from "@/assets/images/default-avatar.jpg";

export const generateUserHandle = (email, displayName, miseCode) => {
  if (email) return email.split("@")[0];
  if (displayName) return displayName.replace(/\s+/g, "-").toLowerCase();
  if (miseCode) return miseCode;
  throw new Error("Missing email, displayName, and miseCode for handle generation.");
};

export const generateMiseCode = () =>
  `MISO${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export const processMiseboxUserAvatarFile = async (userId, file) => {
  if (!userId) throw new Error("[processMiseboxUserAvatar] Missing user ID.");
  if (!file) throw new Error("[processMiseboxUserAvatar] No file provided for upload.");

  const storagePath = `misebox-users/${userId}/avatar.jpg`;
  console.log(`[processMiseboxUserAvatar] Uploading avatar to ${storagePath}`);

  return { avatar: await processAndUploadImageFromFile(file, storagePath) };
};

export const processMiseboxUserAvatarUrl = async (userId, imageUrl) => {
  try {
    if (!userId) throw new Error("[processMiseboxUserPhoto] Missing user ID.");

    const storagePath = `misebox-users/${userId}/avatar.jpg`;
    console.log("[processMiseboxUserPhoto] Received image URL:", imageUrl);

    let finalImageUrl = null;

    // If no image URL is provided, upload the default avatar
    if (!imageUrl || imageUrl.trim() === "") {
      console.log("[processMiseboxUserPhoto] No image URL provided; uploading default avatar to storage.");
      try {
        finalImageUrl = await processAndUploadImage(defaultUserAvatar, storagePath);
      } catch (error) {
        console.warn("[processMiseboxUserPhoto] processAndUploadImage failed for default avatar:", error.message);
      }
    } else {
      try {
        finalImageUrl = await processAndUploadImage(imageUrl, storagePath);
      } catch (error) {
        console.warn("[processMiseboxUserPhoto] processAndUploadImage failed:", error.message);
      }

      if (!finalImageUrl) {
        console.log("[processMiseboxUserPhoto] Falling back to processGooglePhoto.");
        finalImageUrl = await processGooglePhoto(imageUrl, storagePath);
      }

      if (!finalImageUrl) {
        console.log("[processMiseboxUserPhoto] Uploading default avatar to storage as final fallback.");
        finalImageUrl = await processAndUploadImage(defaultUserAvatar, storagePath);
      }
    }

    console.log("[processMiseboxUserPhoto] Final processed avatar URL:", finalImageUrl);
    return { avatar: finalImageUrl };
  } catch (error) {
    console.error("[processMiseboxUserPhoto] Error:", error.message);
    throw error;
  }
};
