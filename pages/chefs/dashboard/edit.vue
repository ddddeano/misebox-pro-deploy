<!-- pages/chefs/dashboard/edit.vue -->
<template>
  <client-only>
    <div class="page" v-if="chef">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />
      <div class="action-buttons">
        <NuxtLink to="/chefs" class="icon-btn">
          <UserCircleIcon class="icon" />
          <span>Profile</span>
        </NuxtLink>
        <button class="icon-btn" @click="deleteChef">
          <TrashIcon class="icon" />
          <span>Delete</span>
        </button>
      </div>
      <OrganismsChefEdit />
    </div>
    <p v-else>Loading...</p>
  </client-only>
</template>

<script setup>
const { currentChef: chef, deleteChef } = useChef();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
