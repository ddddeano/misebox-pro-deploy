<!-- pages/jobs/[jobId]/edit.vue -->
<template>
  <client-only>
      <OrganismsJobEdit :job="job" />
  </client-only>
</template>

<script setup>
const route = useRoute()
const { fetchJob, deleteJob } = useJob()
const job = fetchJob(route.params.jobId)
</script>
