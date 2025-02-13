<!-- pages/suppliers/edit.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="supplier"
      entityType="suppliers"
      mode="edit"
      :deleteEntity="deleteSupplier"
    >
      <OrganismsSupplierEdit />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentSupplier: supplier, deleteSupplier } = useSupplier();
</script>
