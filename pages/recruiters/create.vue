<!-- pages/recruiters/create.vue -->
<template>
  <client-only>
    <div class="page">
      <OrganismsMiseboxUserCTA />
      <OrganismsRecruiterCreate v-if="!recruiter" />
      <p v-else>You already have a recruiter profile.</p>
    </div>
  </client-only>
</template>

<script setup>
const { currentRecruiter: recruiter } = useRecruiter();
</script>
