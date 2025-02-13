
export function useIngredientCreate() {

  const processIngredient = async (ingredient) => {
    const { updateIngredient } = useIngredient();
    
    try {
      if (!ingredient || typeof ingredient !== "object") {
        throw new Error("[processIngredient] Invalid input. Must be an object.");
      }
      
      let ingredientId = ingredient.id;
      
      if (ingredient.source === "firestore") {
        console.log(`[processIngredient] Ingredient already exists in Firestore: ${ingredientId}`);
        return ingredientId;
      }

      const config = {
        source: "firestore",
      };

      const processedIngredient = {
        ...ingredient,
        ...config,
      };

      try {
        const { createObject } = useMiseboxFirestore();
        ingredientId = await createObject("ingredients", processedIngredient);
        console.log(`[processIngredient] Created new ingredient with ID: ${ingredientId}`);
      } catch (createError) {
        console.error("[processIngredient] Error creating ingredient object:", createError.message);
        throw createError;
      }

      let imageData;
      try {
        imageData = await processIngredientPhoto(ingredientId, ingredient.image_url);
        console.log("[processIngredient] Ingredient photo processing returned:", imageData);
      } catch (photoError) {
        console.error("[processIngredient] Error processing ingredient photo:", photoError.message);
        throw photoError;
      }

      try {
        // Update the ingredient document with the processed image URL.
        await updateIngredient(ingredientId, { image_url: imageData.image_url });
      } catch (updateError) {
        console.error("[processIngredient] Error updating ingredient document:", updateError.message);
        throw updateError;
      }

      return ingredientId;
    } catch (error) {
      console.error("[processIngredient] Error:", error.message);
      throw error;
    }
  };

  return { processIngredient };
}
