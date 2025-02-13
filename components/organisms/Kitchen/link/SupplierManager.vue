<!-- components/organisms/Kitchen/link/SupplierManager.vue -->
<template>
  <div class="supplier-manager">
    <h2>Suppliers Manager</h2>
    <OrganismsSupplierCreate />

    <p v-if="kitchen.name">Managing suppliers for: <strong>{{ kitchen.name }}</strong></p>

    <div class="placeholder">Supplier management features coming soon...</div>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.supplier-manager {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  padding: var(--spacing-m);
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
}

.placeholder {
  color: var(--text-secondary);
  font-size: var(--font-size-m);
  text-align: center;
}
</style>
