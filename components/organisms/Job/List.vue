<!-- components/organisms/Job/List.vue -->
<template>
  <div class="list">
    <template v-if="jobs?.length">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="list-item"
      >
        <OrganismsJobCell :job="job" />
      </div>
    </template>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
const { jobsCollection } = useJob();
const jobs = jobsCollection();
</script>
