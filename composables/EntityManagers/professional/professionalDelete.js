// composables/EntityManagers/professional/professionalDelete.js
// ============================
// composables/EntityManagers/professional/professionalDelete.js
// ============================

export function useProfessionalDelete() {
  const { deleteEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const deleteProfessional = async () => {
    try {
      const professionalId = currentUser.value?.uid;
      if (!professionalId) throw new Error("[deleteProfessional] No authenticated user found.");

      // Delete the professional document
      await deleteEntity("professionals", professionalId);

      console.log("[deleteProfessional] Professional profile deleted successfully.");
    } catch (error) {
      console.error("[deleteProfessional] Error deleting Professional profile:", error.message);
      throw error;
    }
  };

  return { deleteProfessional };
}
