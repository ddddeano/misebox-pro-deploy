<!-- pages/chefs/create.vue -->
<template>
  <client-only>
    <div class="page">
      <OrganismsMiseboxUserCTA />
      <OrganismsChefCreate v-if="!chef" />
      <p v-else>You already have a chef profile.</p>
    </div>
  </client-only>
</template>

<script setup>
const { currentChef: chef } = useChef();
</script>
