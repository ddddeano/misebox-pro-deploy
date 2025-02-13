// composables/ObjectManagers/ingredient/ingredientDelete.js
// ============================
// composables/ObjectManagers/ingredient/ingredientDelete.js
// ============================


export function useIngredientDelete() {
  const { deleteDocument } = useFirestoreDelete();
  const currentUser = useCurrentUser();

  // Function to delete an ingredient
  async function deleteIngredient(ingredientId) {
    if (!ingredientId) {
      throw new Error("[deleteIngredient] Ingredient ID is required.");
    }

    try {
      if (!currentUser.value) {
        throw new Error("[deleteIngredient] No authenticated user found.");
      }

      await deleteDocument("ingredients", ingredientId);
      console.log(`[deleteIngredient] Ingredient ${ingredientId} deleted successfully.`);
    } catch (error) {
      console.error("[deleteIngredient] Error deleting ingredient:", error.message);
      throw error;
    }
  }

  return { deleteIngredient };
}
