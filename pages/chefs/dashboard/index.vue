<!-- pages/chefs/dashboard/index.vue -->
<template>
  <client-only>
    <div class="page" v-if="miseboxUser && chef">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="dashboard-section">
        <div class="action-buttons">
          <NuxtLink to="/chefs/dashboard/chef-kitchens" class="icon-btn">
            <ChevronRightIcon class="icon" />
            <span>Kitchens</span>
          </NuxtLink>
          <NuxtLink to="/chefs/dashboard/chef-suppliers" class="icon-btn">
            <ChevronRightIcon class="icon" />
            <span>Suppliers</span>
          </NuxtLink>
          <NuxtLink to="/chefs/{chef.id}/" class="icon-btn">
            <EyeIcon class="icon" />
            <span>View</span>
          </NuxtLink>
          <NuxtLink to="/chefs/dashboard/edit" class="icon-btn">
            <Cog6ToothIcon class="icon" />
            <span>Edit</span>
          </NuxtLink>
        </div>
      </div>

      <OrganismsChefDashboard />
    </div>
    <p v-else class="loading-message">Loading...</p>
  </client-only>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentChef: chef } = useChef();
</script>

<style scoped>
.action-buttons {
  justify-content: space-between; /* Distributes buttons evenly */
}
</style>
