<!-- components/organisms/Supplier/List.vue -->
<template>
  <div class="list">
    <template v-if="filteredSuppliers?.length">
      <div
        v-for="supplier in filteredSuppliers"
        :key="supplier.id"
        class="list-item"
      >
        <OrganismsSupplierCell :supplier="supplier" />
      </div>
    </template>
    <p v-else>No suppliers found.</p>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();

const { suppliersCollection } = useSupplier();

const suppliers = suppliersCollection();

const filteredSuppliers = computed(() =>
  suppliers?.value?.filter((supplier) => supplier.id !== currentUser.value?.uid) || []
);
</script>
