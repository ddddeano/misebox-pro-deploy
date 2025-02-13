<!-- pages/jobs/[jobId]/index.vue -->
<template>
  <client-only>
      <OrganismsJobView :job="job" />
  </client-only>
</template>

<script setup>

const route = useRoute()
const { fetchJob } = useJob()
const job = fetchJob(route.params.jobId)
</script>
