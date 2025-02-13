<!-- pages/chefs/dashboard/chef-Kitchens.vue -->
<template>
  <client-only>
    <div class="page" v-if="chef">
      <h3>Create a Kitchen</h3>
      <OrganismsKitchenCreate />
      <h3>My Kitchens</h3>
      <OrganismsChefLinkKitchenList :kitchenIds="chef.kitchens ?? []" />
    </div>
    <p v-else>Loading chef data...</p>
  </client-only>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const { currentChef: chef } = useChef();
</script>
