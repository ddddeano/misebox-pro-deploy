<!-- pages/misebox-users/index.vue -->
<template>
  <client-only>
    <div class="page">
      <OrganismsMiseboxUserCTA />
      <OrganismsMiseboxUserCard v-if="miseboxUser" />
      <OrganismsMiseboxUserList />
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
