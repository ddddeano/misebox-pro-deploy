<!-- pages/jobs/create.vue -->
<template>
  <client-only>
    <div class="page" v-if="currentUser">
      <OrganismsChefCTA />
      <OrganismsJobCreate v-if="recruiter" />
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const { currentRecruiter: recruiter } = useRecruiter();
</script>
