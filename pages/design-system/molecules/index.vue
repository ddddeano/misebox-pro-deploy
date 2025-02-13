<!-- pages/design-system/molecules/index.vue -->
<template>
  <client-only>
    <div class="design-container">
      <DesignSideMenu />
      <main class="main-content">
        <h1>Design System: Cards</h1>
        <div class="card-list">
          <!-- Debug output to inspect the fetched kitchen object -->
          <pre>{{ kitchen }}</pre>
          <!-- Kitchen Card Group (object card) -->
          <div class="card-group" v-if="kitchen && kitchen.id">
            <h2>Kitchen Card</h2>
            hello
            <OrganismsKitchenCard :kitchen="kitchen" />
          </div>
        </div>
      </main>
    </div>
  </client-only>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const kitchenId = "xV1TjtJLNEffDco6NTWs";

// Create a reactive ref for the kitchen
const kitchen = ref({});

// Fetch the kitchen asynchronously when the component is mounted
const { fetchKitchen } = useKitchen();

onMounted(async () => {
  try {
    const fetchedKitchen = await fetchKitchen(kitchenId);
    kitchen.value = fetchedKitchen;
    console.log("Fetched kitchen:", kitchen.value);
  } catch (error) {
    console.error("Error fetching kitchen:", error);
  }
});
</script>

<style scoped>
.design-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
}
</style>
