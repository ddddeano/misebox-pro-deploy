// composables/EntityManagers/recruiter/recruiterCreate.js
import { arrayUnion } from "firebase/firestore";

export function useRecruiterCreate() {
  const processRecruiter = async (recruiter) => {
  const { updateMiseboxUser } = useMiseboxUser();

    try {
      if (!recruiter || typeof recruiter !== "object") {
        throw new Error("[processRecruiter] Invalid input.");
      }
      if (recruiter.source === "firestore" && recruiter.id) {
        return recruiter.id;
      }
      const config = {
        source: "firestore",
        search_terms: `${recruiter.name || ""} ${recruiter.formatted_address || ""}`
          .toLowerCase()
          .trim(),
      };
      const processedRecruiter = {
        ...recruiter,
        ...config,
      };

      let recruiterId;
      try {
        const { createEntity } = useMiseboxFirestore();
        recruiterId = await createEntity("recruiters", processedRecruiter);
      } catch (createError) {
        console.error("[processRecruiter] Error creating recruiter entity:", createError.message);
        throw createError;
      }

      try {
        await updateMiseboxUser({ user_apps: arrayUnion("recruiters") });
      } catch (miseboxError) {
        console.error("[processRecruiter] Error updating misebox user:", miseboxError.message);
        throw miseboxError;
      }

      let imageData;
      try {
        imageData = await processRecruiterPhoto(recruiterId, recruiter.image_url);
      } catch (photoError) {
        console.error("[processRecruiter] Error processing recruiter photo:", photoError.message);
        throw photoError;
      }

      try {
        const { updateRecruiter } = useRecruiter();
        await updateRecruiter({ image_url: imageData.image_url });
      } catch (updateError) {
        console.error("[processRecruiter] Error updating recruiter:", updateError.message);
        throw updateError;
      }

      return recruiterId;
    } catch (error) {
      console.error("[processRecruiter] Error:", error.message);
      throw error;
    }
  };

  return { processRecruiter };
}
