<!-- pages/suppliers/create.vue -->
<template>
  <client-only>
    <div class="page">
      <OrganismsMiseboxUserCTA />
      <OrganismsSupplierCreate />
    </div>
  </client-only>
</template>

<script setup>
const { currentSupplier: supplier } = useSupplier();
</script>
