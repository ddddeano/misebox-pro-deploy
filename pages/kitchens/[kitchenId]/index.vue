<!-- pages/kitchens/[kitchenId]/index.vue -->
<template>
  <client-only>
    <div class="page" v-if="kitchen && kitchen.id">
      <OrganismsKitchenCard :kitchen="kitchen" />

      <!-- Header with Edit & Dashboard Buttons -->
      <div class="header action-buttons">
        <NuxtLink v-if="hasTeamAccess" :to="`/kitchens/${kitchen.id}/dashboard`" class="icon-btn">
          <WindowIcon class="icon" />
          <span>Dashboard</span>
        </NuxtLink>
        <NuxtLink v-if="isAdmin" :to="`/kitchens/${kitchen.id}/edit`" class="icon-btn">
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
      </div>

      <OrganismsKitchenView :kitchen="kitchen" />
    </div>
    <div v-else class="loading-container">
      <p>Loading kitchen...</p>
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const route = useRoute();
const { fetchKitchen } = useKitchen();
const { fetchTeamMembers } = useKitchenTeam();

const kitchen = fetchKitchen(route.params.kitchenId);
const teamData = ref([]);

// Fetch team members only AFTER kitchen.id is available
watchEffect(async () => {
  if (kitchen.value?.id) {
    console.log(`[watchEffect] Kitchen loaded: ${kitchen.value.id}, fetching team members...`);
    teamData.value = await fetchTeamMembers(kitchen.value.id);
  }
});

// Computed property for team members
const team = computed(() => teamData.value);

// Check if user is in the team
const hasTeamAccess = computed(() => {
  const userId = currentUser.value?.uid;
  return userId ? team.value.some(member => member.id === userId) : false;
});

// Check if user is an admin
const isAdmin = computed(() => {
  const userId = currentUser.value?.uid;
  return userId ? team.value.some(member => member.id === userId && member.admin) : false;
});
</script>

<style scoped>
/* 🔹 Action Buttons */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-m);
  padding-inline: var(--spacing-s);
}

</style>
