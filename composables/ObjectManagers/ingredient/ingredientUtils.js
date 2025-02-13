import defaultIngredientImage from "@/assets/images/default-ingredient.jpg";

export const processIngredientPhoto = async (ingredientId, photoUrl) => {
  try {
    if (!ingredientId) throw new Error("[processIngredientPhoto] Missing ingredient ID.");
    
    const storagePath = `ingredients/${ingredientId}/photo.jpg`;
    console.log("[processIngredientPhoto] Received photo URL:", photoUrl);

    let finalImageUrl = null;

    // If no photo is provided, upload the default image to storage
    if (!photoUrl || photoUrl.trim() === "") {
      console.log("[processIngredientPhoto] No photo URL provided; uploading default image to storage.");
      try {
        finalImageUrl = await processAndUploadImage(defaultIngredientImage, storagePath);
      } catch (error) {
        console.warn("[processIngredientPhoto] processAndUploadImage failed for default image:", error.message);
      }
    } else {
      try {
        finalImageUrl = await processAndUploadImage(photoUrl, storagePath);
      } catch (error) {
        console.warn("[processIngredientPhoto] processAndUploadImage failed:", error.message);
      }
      
      if (!finalImageUrl) {
        console.log("[processIngredientPhoto] Falling back to processGooglePhoto.");
        finalImageUrl = await processGooglePhoto(photoUrl, storagePath);
      }
      
      if (!finalImageUrl) {
        console.log("[processIngredientPhoto] Uploading default image to storage as final fallback.");
        finalImageUrl = await processAndUploadImage(defaultIngredientImage, storagePath);
      }
    }

    console.log("[processIngredientPhoto] Final processed image URL:", finalImageUrl);
    return { image_url: finalImageUrl };
  } catch (error) {
    console.error("[processIngredientPhoto] Error:", error.message);
    throw error;
  }
};
