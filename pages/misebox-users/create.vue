<!-- pages/misebox-users/create.vue -->
<template>
  <client-only>
    <div class="page" v-if="currentUser && !currentUser.isAnonymous">
      <OrganismsMiseboxUserCTA />
      <OrganismsMiseboxUserCreate v-if="!miseboxUser" />
      <p v-else>You already have a profile.</p>
    </div>
    <div v-else>
      <p>You need to be signed in to create a Misebox User profile.</p>
      <NuxtLink to="/login" class="btn btn-primary">Get Authorized</NuxtLink>
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
