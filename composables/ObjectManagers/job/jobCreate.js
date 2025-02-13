// composables/ObjectManagers/job/jobCreate.js
// File: composables/EntityManagers/job/jobCreate.js
export function useJobCreate() {
  // Retrieve the current recruiter once when the module loads.
  const { currentRecruiter: recruiter } = useRecruiter();

  const processJob = async (job) => {
    try {
      if (!job || typeof job !== "object") {
        throw new Error("[processJob] Invalid input. Must be an object.");
      }
  
      // Log the current recruiter image_url for debugging.
      console.log("Recruiter image_url:", recruiter.value?.image_url);
  
      // Build configuration using values from the current recruiter.
      const config = {
        image_url: recruiter.value?.image_url || "https://via.placeholder.com/150?text=Job+Image",
        currency: recruiter.value?.currency || "USD",
        source: "firestore"
      };
  
      // Merge the provided job object with the recruiter config.
      const processedJob = {
        ...job,
        ...config,
      };
  
      let jobId;
      try {
        const { createObject } = useMiseboxFirestore();
        jobId = await createObject("jobs", processedJob);
        console.log(`[processJob] Created job document with ID: ${jobId}`);
      } catch (createError) {
        console.error("[processJob] Error creating job object:", createError.message);
        throw createError;
      }
  
      return jobId;
    } catch (error) {
      console.error("[processJob] Error:", error.message);
      throw error;
    }
  };
  
  return { processJob };
}
