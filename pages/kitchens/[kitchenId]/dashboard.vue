<!-- pages/kitchens/[kitchenId]/dashboard.vue -->
<template>
  <client-only>
    <div class="dashboard" v-if="kitchen">
      <OrganismsKitchenDashboardMain :kitchen="kitchen" />
    </div>
  </client-only>
</template>

<script setup>
const route = useRoute();
const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(route.params.kitchenId);
</script>

<style scoped>
.dashboard {
  width: 100%;
}
</style>
