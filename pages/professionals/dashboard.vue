<!-- pages/professionals/dashboard.vue -->
<template>
  <client-only>
    <div class="page" v-if="miseboxUser && professional">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-links">
        <NuxtLink to="/professionals/professional-jobs" class="btn">Manage Jobs</NuxtLink>
      </div>

      <OrganismsProfessionalDashboard />
    </div>
    <p v-else class="loading">Loading...</p>
  </client-only>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentProfessional: professional } = useProfessional();
</script>
