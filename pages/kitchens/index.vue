<!-- pages/kitchens/index.vue -->
<template>
  <client-only>
    <div class="page">     
      <OrganismsKitchenList :kitchens="kitchens" title="All Kitchens" />
    </div>
  </client-only>
</template>

<script setup>
const { kitchensCollection } = useKitchen();
const kitchens = kitchensCollection();
</script>
