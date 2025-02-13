// composables/ObjectManagers/kitchen/kitchenCreate.js
import { arrayUnion } from "firebase/firestore";
import { useCurrentUser } from "vuefire";

export function useKitchenCreate() {
  const currentUser = useCurrentUser();

  const processKitchen = async (kitchen) => {
    const { currentMiseboxUser: miseboxUser, updateMiseboxUser } = useMiseboxUser();
    const { updateKitchen, addTeamMember } = useKitchen();

    try {
      if (!kitchen || typeof kitchen !== "object") {
        throw new Error("[processKitchen] Invalid input. Must be an object.");
      }

      let kitchenId = kitchen.id;

      if (kitchen.source === "firestore") {
        // Existing kitchen: Only append the user to the `team` subcollection
        await addTeamMember(kitchenId, {
          id: currentUser.value.uid,
          avatar: miseboxUser.value.avatar,
        });

        console.log(`[processKitchen] Updated team for existing kitchen: ${kitchenId}`);
        return kitchenId;
      }

      // New kitchen: Define configuration
      const config = {
        source: "firestore",
        search_terms: `${kitchen.name || ""} ${kitchen.formatted_address || ""}`
          .toLowerCase()
          .trim(),
      };

      const processedKitchen = {
        ...kitchen,
        ...config,
      };

      try {
        const { createObject } = useMiseboxFirestore();
        kitchenId = await createObject("kitchens", processedKitchen);
        console.log(`[processKitchen] Created new kitchen with ID: ${kitchenId}`);
      } catch (createError) {
        console.error("[processKitchen] Error creating kitchen object:", createError.message);
        throw createError;
      }

      // Add the first team member using `addTeamMember`
      await addTeamMember(kitchenId, {
        id: currentUser.value.uid,
        avatar: miseboxUser.value.avatar,
        ...(kitchen.source === "google" && { admin: true }), // Set admin only for Google sources
      });

      let imageData;
      try {
        imageData = await processKitchenPhoto(kitchenId, kitchen.image_url);
        console.log("[processKitchen] Kitchen photo processing returned:", imageData);
      } catch (photoError) {
        console.error("[processKitchen] Error processing kitchen photo:", photoError.message);
        throw photoError;
      }

      try {
        // Update the kitchen document with the processed image URL.
        await updateKitchen(kitchenId, { image_url: imageData.image_url });

        // Append kitchen ID to user profile
        await updateMiseboxUser({ kitchens: arrayUnion(kitchenId) });
      } catch (updateError) {
        console.error("[processKitchen] Error updating associated entities:", updateError.message);
        throw updateError;
      }

      return kitchenId; // Return kitchen ID after processing.
    } catch (error) {
      console.error("[processKitchen] Error:", error.message);
      throw error;
    }
  };

  return { processKitchen };
}
