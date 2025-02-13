import { doc, setDoc, deleteDoc, collection } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export function useKitchenIngredients() {
  const db = useFirestore();

  // **Real-time reactive kitchen ingredients collection**
  const useKitchenIngredientsCollection = (kitchenId) => {
    if (!kitchenId) {
      console.error("[useKitchenIngredientsCollection] Missing kitchenId.");
      return null;
    }
    return useCollection(collection(db, `kitchens/${kitchenId}/ingredients`));
  };

  // **Add an ingredient to the kitchen's inventory subcollection**
  // Now saving additional info from the ingredient object to avoid extra API calls.
  const addKitchenIngredient = async ({ kitchenId, ingredient }) => {
    if (!kitchenId || !ingredient || !ingredient.id) {
      console.error("[addKitchenIngredient] Missing kitchenId or ingredient id.");
      return;
    }

    try {
      const ingredientRef = doc(collection(db, `kitchens/${kitchenId}/ingredients`), ingredient.id);
      await setDoc(
        ingredientRef,
        {
          globalIngredientId: ingredient.id,
          name: ingredient.name || null,
          image_url: ingredient.image_url || null,
          category: ingredient.category || null, // Save category info for the cell
          updatedAt: new Date().toISOString(), // Timestamp for tracking changes
        },
        { merge: true }
      );

      console.log(`[addKitchenIngredient] Ingredient ${ingredient.id} added to kitchen ${kitchenId}`);
    } catch (error) {
      console.error("[addKitchenIngredient] Error:", error.message);
      throw error;
    }
  };

  // **Remove an ingredient from the kitchen's inventory subcollection**
  const removeKitchenIngredient = async (kitchenId, globalIngredientId) => {
    if (!kitchenId || !globalIngredientId) {
      console.error("[removeKitchenIngredient] Missing kitchenId or globalIngredientId.");
      return;
    }

    try {
      const ingredientRef = doc(collection(db, `kitchens/${kitchenId}/ingredients`), globalIngredientId);
      await deleteDoc(ingredientRef);
      console.log(`[removeKitchenIngredient] Ingredient ${globalIngredientId} removed from kitchen ${kitchenId}`);
    } catch (error) {
      console.error("[removeKitchenIngredient] Error:", error.message);
      throw error;
    }
  };

  return { useKitchenIngredientsCollection, addKitchenIngredient, removeKitchenIngredient };
}
