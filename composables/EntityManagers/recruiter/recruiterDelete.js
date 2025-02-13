// composables/EntityManagers/recruiter/recruiterDelete.js
// ============================
// composables/EntityManagers/recruiter/recruiterDelete.js
// ============================


export function useRecruiterDelete() {
  const { deleteEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const deleteRecruiter = async () => {
    try {
      const recruiterId = currentUser.value?.uid;
      if (!recruiterId) {
        throw new Error("[deleteRecruiter] No authenticated user found.");
      }

      // Delete the recruiter document
      await deleteEntity("recruiters", recruiterId);

      console.log("[deleteRecruiter] Recruiter profile deleted successfully.");
    } catch (error) {
      console.error("[deleteRecruiter] Error deleting recruiter profile:", error.message);
      throw error;
    }
  };

  return { deleteRecruiter };
}
