<!-- pages/kitchens/create.vue -->
<template>
  <client-only>
    <div class="page" v-if="currentUser">
      <OrganismsChefCTA />
      <OrganismsKitchenCreate v-if="chef" />
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const { currentChef: chef } = useChef();
</script>
