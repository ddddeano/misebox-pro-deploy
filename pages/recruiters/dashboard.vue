<!-- pages/recruiters/dashboard.vue -->
<template>
  <client-only>
    <div class="page" v-if="miseboxUser && recruiter">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-links">
        <NuxtLink to="/recruiters/manage-jobs" class="btn">Manage Jobs</NuxtLink>
        <NuxtLink to="/recruiters/applicants" class="btn">View Applicants</NuxtLink>
      </div>

      <OrganismsRecruiterDashboard />
    </div>
    <p v-else class="loading">Loading...</p>
  </client-only>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentRecruiter: recruiter } = useRecruiter();
</script>
