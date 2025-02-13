// composables/ObjectManagers/job/useJob.js
// ============================
// composables/ObjectManagers/job/useJob.js
// ============================

import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useJob() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Fetch a specific job by ID
  function fetchJob(id) {
    const jobRef = computed(() =>
      currentUser.value && id ? doc(db, "jobs", id) : null
    );
    const { data: job } = useDocument(jobRef);
    return job;
  }

  // Fetch all jobs
  function jobsCollection() {
    const jobsRef = computed(() =>
      currentUser.value ? collection(db, "jobs") : null
    );
    const { data: jobs } = useCollection(jobsRef);
    return jobs;
  }

  // Expose the functionalities
  return {
    ...useJobCreate(),
    ...useJobUpdate(),
    ...useJobDelete(),
    fetchJob,
    jobsCollection,
  };
}
