
// Professional Update Functions
export function useProfessionalUpdate() {
  const { addItem, updateItem, removeItem, updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const addProfessionalArrayItem = async (fieldName, item) => {
    const professionalId = currentUser.value?.uid;
    if (!professionalId) throw new Error("No authenticated user found.");
    return await addItem("professionals", professionalId, fieldName, item);
  };

  const updateProfessionalArrayItem = async (fieldName, index, updatedItem) => {
    const professionalId = currentUser.value?.uid;
    if (!professionalId) throw new Error("No authenticated user found.");
    return await updateItem("professionals", professionalId, fieldName, index, updatedItem);
  };

  const removeProfessionalArrayItem = async (fieldName, index) => {
    const professionalId = currentUser.value?.uid;
    if (!professionalId) throw new Error("No authenticated user found.");
    return await removeItem("professionals", professionalId, fieldName, index);
  };

  const updateProfessional = async (updates) => {
    try {
      if (!updates || typeof updates !== "object") {
        throw new Error("[updateProfessional] Updates must be a valid object.");
      }
      await updateEntity("professionals", updates);
      console.log("[updateProfessional] Professional updated.");
    } catch (error) {
      console.error("[updateProfessional] Error updating professional:", error.message);
      throw error;
    }
  };

  return {
    addProfessionalArrayItem,
    updateProfessionalArrayItem,
    removeProfessionalArrayItem,
    updateProfessional,
  };
}