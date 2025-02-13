// composables/ObjectManagers/kitchen/kitchenUtils.js
import defaultKitchenImage from "@/assets/images/default-kitchen.jpg";

export const processKitchenPhoto = async (kitchenId, photoUrl) => {
  try {
    if (!kitchenId) throw new Error("[processKitchenPhoto] Missing kitchen ID.");
    
    const storagePath = `kitchens/${kitchenId}/profile-image.jpg`;
    console.log("[processKitchenPhoto] Received photo URL:", photoUrl);

    let finalImageUrl = null;

    // If no photo is provided, upload the default image to storage
    if (!photoUrl || photoUrl.trim() === "") {
      console.log("[processKitchenPhoto] No photo URL provided; uploading default image to storage.");
      try {
        finalImageUrl = await processAndUploadImage(defaultKitchenImage, storagePath);
      } catch (error) {
        console.warn("[processKitchenPhoto] processAndUploadImage failed for default image:", error.message);
      }
    } else {
      try {
        finalImageUrl = await processAndUploadImage(photoUrl, storagePath);
      } catch (error) {
        console.warn("[processKitchenPhoto] processAndUploadImage failed:", error.message);
      }
      
      if (!finalImageUrl) {
        console.log("[processKitchenPhoto] Falling back to processGooglePhoto.");
        finalImageUrl = await processGooglePhoto(photoUrl, storagePath);
      }
      
      if (!finalImageUrl) {
        console.log("[processKitchenPhoto] Uploading default image to storage as final fallback.");
        finalImageUrl = await processAndUploadImage(defaultKitchenImage, storagePath);
      }
    }

    console.log("[processKitchenPhoto] Final processed image URL:", finalImageUrl);
    return { image_url: finalImageUrl };
  } catch (error) {
    console.error("[processKitchenPhoto] Error:", error.message);
    throw error;
  }
};
