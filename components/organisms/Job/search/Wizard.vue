<!-- components/organisms/Job/search/Wizard.vue -->
<template>
  <div class="job-wizard">
    <!-- Job Search -->
    <OrganismsJobSearch @select-job="handleSelectJob" />
    <!-- Selected Job -->
    <div v-if="selectedJob" class="selected-job">
      <OrganismsJobCell :job="selectedJob" />

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-primary" @click="confirmJob">Confirm Job</button>
        <button class="btn btn-secondary" @click="resetSelection">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { createJob } = useJob();
const selectedJob = ref(null);

// Handle job selection from the search component
const handleSelectJob = (job) => {
  selectedJob.value = job;
};

// Confirm the selected job and create it in Firestore
const confirmJob = async () => {
  try {
    const jobId = await createJob(selectedJob.value);
    if (jobId) {
      resetSelection(); // Reset selection after confirmation
    }
  } catch (error) {
    console.error("Error creating job:", error);
    alert("An error occurred while creating the job. Please try again.");
  }
};

// Reset the selected job
const resetSelection = () => {
  selectedJob.value = null;
};
</script>

<style scoped>
.job-wizard {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  gap: var(--spacing-m); /* Optional: Adds space between children */
}

.action-buttons {
  display: flex;
  gap: var(--spacing-s); /* Space between buttons */
}
</style>