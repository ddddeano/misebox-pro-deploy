<!-- pages/suppliers/dashboard.vue -->
<template>
  <client-only>
    <div class="page" v-if="miseboxUser && supplier">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-links">
        <NuxtLink to="/suppliers/manage-products" class="btn">Manage Products</NuxtLink>
        <NuxtLink to="/suppliers/orders" class="btn">View Orders</NuxtLink>
      </div>

      <OrganismsSupplierDashboard />
    </div>
    <p v-else class="loading">Loading...</p>
  </client-only>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentSupplier: supplier } = useSupplier();
</script>
