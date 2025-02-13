// composables/ObjectManagers/job/jobDelete.js
// ============================
// composables/ObjectManagers/job/jobDelete.js
// ============================

export function useJobDelete() {
  const { deleteDocument } = useMiseboxFirestore();

  const deleteJob = async (jobId) => {
    try {
      if (!jobId) {
        throw new Error("[deleteJob] Job ID is required.");
      }

      await deleteDocument("jobs", jobId);

      console.log(`[deleteJob] Job deleted successfully with ID: ${jobId}`);
    } catch (error) {
      console.error("[deleteJob] Error deleting job:", error.message);
      throw error;
    }
  };

  return { deleteJob };
}
