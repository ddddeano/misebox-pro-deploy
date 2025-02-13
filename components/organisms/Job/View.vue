<!-- components/organisms/Job/View.vue -->
<template>
  <client-only>
    <div v-if="job" class="view-profile">
      <section>
        <h2 class="view-profile-title">Job Details</h2>
        <p><strong>Title:</strong> {{ job.title }}</p>
        <p><strong>Location:</strong> {{ job.location }}</p>
        <p><strong>Description:</strong> {{ job.description }}</p>
      </section>
    </div>
    <div v-else>
      <p class="error-message">Job details not found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Styling similar to Professional */
.view-profile {
  padding: var(--spacing-m);
  max-width: 800px;
  margin: 0 auto;
}
.section {
  background-color: var(--background-2);
  margin-bottom: var(--spacing-l);
  padding: var(--spacing-m);
  border-radius: var(--radius-s);
}
</style>
