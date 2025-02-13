// composables/ObjectManagers/ingredient/ingredientUpdate.js
// ============================
// composables/ObjectManagers/ingredient/ingredientUpdate.js
// ============================

import { useMiseboxFirestore } from "@/composables/Firestore/useMiseboxFirestore";

export function useIngredientUpdate() {
  const { updateDocument } = useMiseboxFirestore();

  // Update a specific ingredient by ID
  async function updateIngredient(id, updates) {
    if (!id || typeof updates !== "object") {
      throw new Error("[updateIngredient] Invalid input: ID and updates are required.");
    }

    try {
      await updateDocument("ingredients", id, updates);
      console.log(`[updateIngredient] Ingredient updated with ID: ${id}`);
    } catch (error) {
      console.error("[updateIngredient] Error updating ingredient:", error.message);
      throw error;
    }
  }

  return {
    updateIngredient,
  };
}
