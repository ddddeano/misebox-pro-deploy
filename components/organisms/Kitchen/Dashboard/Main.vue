<!-- components/organisms/Kitchen/Dashboard/Main.vue -->
<template>
  <div class="dashboard">
    <!-- Sidebar Navigation -->
    <aside class="dashboard-sidebar">
      <nav>
        <ul>
          <li :class="{ active: viewMode === 'tickets' }" @click="viewMode = 'tickets'">
            Tickets
          </li>
          <li :class="{ active: viewMode === 'ingredients' }" @click="viewMode = 'ingredients'">
            Ingredients
          </li>
          <li :class="{ active: viewMode === 'preparation' }" @click="viewMode = 'preparation'">
            Tasks
          </li>
          <li :class="{ active: viewMode === 'menus' }" @click="viewMode = 'menus'">
            Menus
          </li>
          <li :class="{ active: viewMode === 'recipes' }" @click="viewMode = 'recipes'">
            Recipes
          </li>
          <li :class="{ active: viewMode === 'suppliers' }" @click="viewMode = 'suppliers'">
            Suppliers
          </li>
          <li :class="{ active: viewMode === 'team' }" @click="viewMode = 'team'">
            Team
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="dashboard-content">
      <OrganismsKitchenDashboardTickets v-if="viewMode === 'tickets'" :kitchen="kitchen" />
      <OrganismsKitchenDashboardIngredientsMain v-if="viewMode === 'ingredients'" :kitchen="kitchen" />
      <OrganismsKitchenDashboardTasks v-if="viewMode === 'preparation'" :kitchen="kitchen" />
      <OrganismsKitchenDashboardMenusMain v-if="viewMode === 'menus'" :kitchen="kitchen" />
      <OrganismsKitchenDashboardRecipes v-if="viewMode === 'recipes'" :kitchen="kitchen" />
      <OrganismsKitchenDashboardSuppliers v-if="viewMode === 'suppliers'" :kitchen="kitchen" />
      <OrganismsKitchenDashboardTeam v-if="viewMode === 'team'" :kitchen="kitchen" />
    </main>
  </div>
</template>

<script setup>
const viewMode = ref('ingredients');

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
    default: () => ({})
  }
});
</script>

<style scoped>
.dashboard {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.dashboard-sidebar {
  width: fit-content;
  background: var(--background-2);
  padding: var(--spacing-m);
}

.dashboard-content {
  flex-grow: 1;
  padding: var(--spacing-m);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: var(--spacing-s);
  cursor: pointer;
  color: var(--text-secondary);
}

li.active {
  color: var(--text-primary);
  background-color: var(--background-strong);
}
</style>
