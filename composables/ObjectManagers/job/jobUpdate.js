// composables/ObjectManagers/job/jobUpdate.js
// ============================
// composables/ObjectManagers/job/jobUpdate.js
// ============================


export function useJobUpdate() {
  const { updateDocument } = useMiseboxFirestore();

  const updateJob = async (jobId, updates) => {
    try {
      if (!jobId) {
        throw new Error("[updateJob] Job ID is required.");
      }

      if (!updates || typeof updates !== "object") {
        throw new Error("[updateJob] Updates must be an object.");
      }

      await updateDocument("jobs", jobId, updates);

      console.log(`[updateJob] Job updated successfully with ID: ${jobId}`);
    } catch (error) {
      console.error("[updateJob] Error updating job:", error.message);
      throw error;
    }
  };

  return { updateJob };
}
