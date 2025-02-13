<!-- components/organisms/Job/link/Kitchen/Card.vue -->
<template>
  <div class="card" v-if="kitchen">
    <img v-if="kitchen.image_url" :src="kitchen.image_url" alt="Kitchen Image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ kitchen.name }}</h3>
      <p class="card-address">{{ kitchen.short_address }}</p>
    </div>
  </div>
  <div v-else class="card loading">
    <p>Loading kitchen...</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true }
});

const { fetchKitchen } = useKitchen();
const kitchen = fetchKitchen(props.id);
</script>

<style scoped>
.card {
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-xs);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: var(--spacing-m) auto;
}

.card.loading {
  padding: var(--spacing-m);
  text-align: center;
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-content {
  padding: var(--spacing-s);
}

.card-title {
  font-size: var(--font-size-l);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.card-address {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
  margin: 0;
}
</style>
