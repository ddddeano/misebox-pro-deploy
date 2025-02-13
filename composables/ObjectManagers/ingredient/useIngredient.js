// composables/ObjectManagers/ingredient/useIngredient.js
// ============================
// composables/ObjectManagers/ingredient/useIngredient.js
// ============================

import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useIngredient() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Fetch a specific ingredient by ID
  function fetchIngredient(id) {
    const ingredientRef = computed(() =>
      currentUser.value && id ? doc(db, "ingredients", id) : null
    );
    const { data: ingredient } = useDocument(ingredientRef);
    return ingredient;
  }

  // Fetch all ingredients
  function ingredientsCollection() {
    const ingredientsRef = computed(() =>
      currentUser.value ? collection(db, "ingredients") : null
    );
    const { data: ingredients } = useCollection(ingredientsRef);
    return ingredients;
  }

  // Expose the functionalities
  return {
    ...useIngredientCreate(),
    ...useIngredientUpdate(),
    ...useIngredientDelete(), // Added back after implementation
    ...useIngredientSearch(),
    fetchIngredient,
    ingredientsCollection,
  };
}
