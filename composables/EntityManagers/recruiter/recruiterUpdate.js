
// Recruiter Update Functions
export function useRecruiterUpdate() {
  const { addItem, updateItem, removeItem, updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const addRecruiterArrayItem = async (fieldName, item) => {
    const recruiterId = currentUser.value?.uid;
    if (!recruiterId) throw new Error("No authenticated user found.");
    return await addItem("recruiters", recruiterId, fieldName, item);
  };

  const updateRecruiterArrayItem = async (fieldName, index, updatedItem) => {
    const recruiterId = currentUser.value?.uid;
    if (!recruiterId) throw new Error("No authenticated user found.");
    return await updateItem("recruiters", recruiterId, fieldName, index, updatedItem);
  };

  const removeRecruiterArrayItem = async (fieldName, index) => {
    const recruiterId = currentUser.value?.uid;
    if (!recruiterId) throw new Error("No authenticated user found.");
    return await removeItem("recruiters", recruiterId, fieldName, index);
  };

  const updateRecruiter = async (updates) => {
    try {
      if (!updates || typeof updates !== "object") {
        throw new Error("[updateRecruiter] Updates must be a valid object.");
      }
      await updateEntity("recruiters", updates);
      console.log("[updateRecruiter] Recruiter updated.");
    } catch (error) {
      console.error("[updateRecruiter] Error updating recruiter:", error.message);
      throw error;
    }
  };

  return {
    addRecruiterArrayItem,
    updateRecruiterArrayItem,
    removeRecruiterArrayItem,
    updateRecruiter,
  };
}
