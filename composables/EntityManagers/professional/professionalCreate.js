// composables/EntityManagers/professional/professionalCreate.js
import { arrayUnion } from "firebase/firestore";

export function useProfessionalCreate() {
  const createProfessional = async (professional) => {
    const { updateMiseboxUser } = useMiseboxUser();

    try {
      if (!professional || typeof professional !== "object") {
        throw new Error("[createProfessional] Invalid input.");
      }

      const config = {
        // Add any configuration properties here for future development.
      };

      const processedProfessional = { 
        ...professional, 
        ...config 
      };

      try {
        const { createEntity } = useMiseboxFirestore();
        await createEntity("professionals", processedProfessional);
      } catch (createError) {
        console.error("[createProfessional] Error creating professional entity:", createError.message);
        throw createError;
      }

      try {
        await updateMiseboxUser({user_apps: arrayUnion("professionals")});
      } catch (updateError) {
        console.error("[createProfessional] Error updating misebox user with professional app:", updateError.message);
        throw updateError;
      }

      console.log("[createProfessional] Professional profile created.");
    } catch (error) {
      console.error("[createProfessional] Error:", error.message);
      throw error;
    }
  };

  return { createProfessional };
}
