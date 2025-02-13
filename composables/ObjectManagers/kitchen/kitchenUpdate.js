// composables/ObjectManagers/kitchen/kitchenUpdate.js
// File: composables/ObjectManagers/kitchen/kitchenUpdate.js
export function useKitchenUpdate() {
  const { updateDocument } = useMiseboxFirestore();

  const updateKitchen = async (kitchenId, updates) => {
    try {
      if (!kitchenId || !updates || typeof updates !== "object") {
        throw new Error("[updateKitchen] invalid intput.");
      }
      // Update the main kitchen document.
      await updateDocument("kitchens", kitchenId, updates);
    } catch (error) {
      console.error("[updateKitchen] Error updating kitchen:", error.message);
      throw error;  // Rethrow error for handling in the caller.
    }
  };

  return { updateKitchen };
}
