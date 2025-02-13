// composables/EntityManagers/recruiter/recruiterUtils.js
import defaultRecruiterImage from "@/assets/images/default-recruiter.jpg";

export const processRecruiterPhoto = async (recruiterId, photoUrl) => {
  try {
    if (!recruiterId) throw new Error("[processRecruiterPhoto] Missing recruiter ID.");
    
    const storagePath = `recruiters/${recruiterId}/profile-image.jpg`;
    console.log("[processRecruiterPhoto] Received photo URL:", photoUrl);

    let finalImageUrl = null;

    // If no photo is provided, upload the default image to storage
    if (!photoUrl || photoUrl.trim() === "") {
      console.log("[processRecruiterPhoto] No photo URL provided; uploading default image to storage.");
      try {
        finalImageUrl = await processAndUploadImage(defaultRecruiterImage, storagePath);
      } catch (error) {
        console.warn("[processRecruiterPhoto] processAndUploadImage failed for default image:", error.message);
      }
    } else {
      try {
        finalImageUrl = await processAndUploadImage(photoUrl, storagePath);
      } catch (error) {
        console.warn("[processRecruiterPhoto] processAndUploadImage failed:", error.message);
      }
      
      if (!finalImageUrl) {
        console.log("[processRecruiterPhoto] Falling back to processGooglePhoto.");
        finalImageUrl = await processGooglePhoto(photoUrl, storagePath);
      }
      
      if (!finalImageUrl) {
        console.log("[processRecruiterPhoto] Uploading default image to storage as final fallback.");
        finalImageUrl = await processAndUploadImage(defaultRecruiterImage, storagePath);
      }
    }

    console.log("[processRecruiterPhoto] Final processed image URL:", finalImageUrl);
    return { image_url: finalImageUrl };
  } catch (error) {
    console.error("[processRecruiterPhoto] Error:", error.message);
    throw error;
  }
};
