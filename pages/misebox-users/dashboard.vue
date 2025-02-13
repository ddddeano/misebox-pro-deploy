<!-- pages/misebox-users/dashboard.vue -->
<template>
  <client-only>
    <div class="page" v-if="miseboxUser">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-links">
        <NuxtLink to="/chefs/dashboard" class="btn">Chef Dashboard</NuxtLink>
        <NuxtLink to="/professionals/dashboard" class="btn">Professional Dashboard</NuxtLink>
        <NuxtLink to="/suppliers/dashboard" class="btn">Supplier Dashboard</NuxtLink>
        <NuxtLink to="/recruiters/dashboard" class="btn">Recruiter Dashboard</NuxtLink>
      </div>

      <OrganismsMiseboxUserDashboard />
    </div>
    <p v-else>Loading...</p>
  </client-only>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
