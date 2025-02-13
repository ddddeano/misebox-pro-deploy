export function useChefUpdate() {
  const { addItem, updateItem, removeItem, updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const addChefArrayItem = async (fieldName, item) => {
    const chefId = currentUser.value?.uid;
    if (!chefId) throw new Error("No authenticated user found.");
    return await addItem("chefs", chefId, fieldName, item);
  };

  const updateChefArrayItem = async (fieldName, index, updatedItem) => {
    const chefId = currentUser.value?.uid;
    if (!chefId) throw new Error("No authenticated user found.");
    return await updateItem("chefs", chefId, fieldName, index, updatedItem);
  };

  const removeChefArrayItem = async (fieldName, index) => {
    const chefId = currentUser.value?.uid;
    if (!chefId) throw new Error("No authenticated user found.");
    return await removeItem("chefs", chefId, fieldName, index);
  };

  // Update the chef document with a flat update object.
  const updateChef = async (updates) => {
    try {
      if (!updates || typeof updates !== "object") {
        throw new Error("[updateChef] Updates must be a valid object.");
      }
      await updateEntity("chefs", updates);
      console.log("[updateChef] Chef updated.");
    } catch (error) {
      console.error("[updateChef] Error updating chef:", error.message);
      throw error;
    }
  };

  return {
    addChefArrayItem,
    updateChefArrayItem,
    removeChefArrayItem,
    updateChef,
  };
}