<!-- pages/suppliers/[supplierId]/index.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="supplier"
      entityType="suppliers"
      mode="view"
    >
      <OrganismsSupplierView :supplier="supplier" />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchSupplier } = useSupplier();

const miseboxUser = fetchMiseboxUser(route.params.supplierId);
const supplier = fetchSupplier(route.params.supplierId);
</script>
