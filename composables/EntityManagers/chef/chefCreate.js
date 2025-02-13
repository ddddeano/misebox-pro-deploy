// composables/EntityManagers/chef/chefCreate.js
import { arrayUnion } from "firebase/firestore";

export function useChefCreate() {
  const processChef = async (chef) => {
  const { updateMiseboxUser } = useMiseboxUser();

    try {
      if (!chef || typeof chef !== "object") {
        throw new Error("[processChef] Invalid input.");
      }
      
      const config = {
      };

      const processedChef = { 
        ...chef, 
        ...config,
      };

      let chefId;
      try {
        const { createEntity } = useMiseboxFirestore();
        chefId = await createEntity("chefs", processedChef);
      } catch (createError) {
        console.error("[processChef] Error creating chef entity:", createError.message);
        throw createError;
      }

      try {
        await updateMiseboxUser( {user_apps: arrayUnion("chefs") });
      } catch (updateError) {
        console.error("[processChef] Error updating misebox user with chef app:", updateError.message);
        throw updateError;
      }

      console.log(`[processChef] Created chef with ID: ${chefId}`);
      return chefId;
    } catch (error) {
      console.error("[processChef] Error:", error.message);
      throw error;
    }
  };

  return { processChef };
}
