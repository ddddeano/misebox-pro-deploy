<!-- components/organisms/Job/search/search.vue -->
<template>
  <div class="job-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for a job..."
      class="editable-input"
    />
    <div class="job-search-dropdown" v-if="filteredJobs.length > 0">
      <div
        v-for="job in filteredJobs"
        :key="job.jobId"
        @click="emitSelectedJob(job)"
        class="job-cell-wrapper"
      >
        <OrganismsJobCell :job="job" />
      </div>
    </div>

    <!-- No results -->
    <div v-else class="no-results">
      <p>Cannot find a job? <NuxtLink to="/professionals/post">Create  here</NuxtLink>.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineEmits } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

const emits = defineEmits(["select-job"]);
const db = useFirestore();

const currentUser = useCurrentUser();

const searchQuery = ref("");

const jobsCollectionRef = computed(() =>
  currentUser.value ? collection(db, "jobs") : null
);

const { data: jobs } = useCollection(jobsCollectionRef);

const filteredJobs = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return jobs.value.filter(
    (job) =>
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
  );
});

const emitSelectedJob = (job) => {
  emits("select-job", job);
};

const performSearch = () => {
  // This function is intentionally left simple for keyword search
};
</script>

<style scoped>
.job-search {
  width: 100%;
}

.job-cell-wrapper {
  cursor: pointer;
  margin-bottom: var(--spacing-s);
}

.no-results {
  margin-top: var(--spacing-m);
  text-align: center;
  font-size: var(--font-size-m);
}

.no-results a {
  color: var(--primary);
  text-decoration: underline;
  cursor: pointer;
}
</style>