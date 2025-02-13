<!-- pages/jobs/[jobId]/dashboard.vue -->
<!-- pages/jobs/[id]/dashboard.vue -->
<!-- ============================
pages/jobs/[id]/dashboard.vue
============================ -->

<template>
  <client-only>
    <OrganismsJobDashboard
      v-if="job"
      :job="job"
    />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const { fetchJob } = useJob();
const job = fetchJob(route.params.id);
</script>
