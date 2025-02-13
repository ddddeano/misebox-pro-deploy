// composables/EntityManagers/supplier/supplierUtils.js
import defaultSupplierImage from "@/assets/images/default-supplier.jpg";

export const processSupplierPhoto = async (supplierId, imageUrl) => {
  try {
    if (!supplierId) throw new Error("[processSupplierPhoto] Missing supplier ID.");
    
    const storagePath = `suppliers/${supplierId}/image-url.jpg`;
    console.log("[processSupplierPhoto] Received image URL:", imageUrl);

    let finalImageUrl = null;

    // If the imageUrl is empty, upload the default image to storage
    if (!imageUrl || imageUrl.trim() === "") {
      console.log("[processSupplierPhoto] No image URL provided; uploading default image to storage.");
      try {
        finalImageUrl = await processAndUploadImage(defaultSupplierImage, storagePath);
      } catch (error) {
        console.warn("[processSupplierPhoto] processAndUploadImage failed for default image:", error.message);
      }
    } else {
      try {
        finalImageUrl = await processAndUploadImage(imageUrl, storagePath);
      } catch (error) {
        console.warn("[processSupplierPhoto] processAndUploadImage failed:", error.message);
      }
      
      if (!finalImageUrl) {
        console.log("[processSupplierPhoto] Falling back to processGooglePhoto.");
        finalImageUrl = await processGooglePhoto(imageUrl, storagePath);
      }
      
      if (!finalImageUrl) {
        console.log("[processSupplierPhoto] Uploading default image to storage as final fallback.");
        finalImageUrl = await processAndUploadImage(defaultSupplierImage, storagePath);
      }
    }

    console.log("[processSupplierPhoto] Final processed image URL:", finalImageUrl);
    return { image_url: finalImageUrl };
  } catch (error) {
    console.error("[processSupplierPhoto] Error:", error.message);
    throw error;
  }
};