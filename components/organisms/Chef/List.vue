<!-- components/organisms/Chef/List.vue -->
<template>
  <div class="list">
    <template v-if="filteredChefs?.length" class="list">
      <div
        v-for="chef in filteredChefs"
        :key="chef.id"
        :chef="chef"
      >
      <OrganismsChefCell :chef="chef" />
      </div>
    </template>
    <p v-else>No chefs found.</p>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();

const { chefsCollection } = useChef();
const chefs = chefsCollection();

const filteredChefs = computed(() =>
  chefs?.value?.filter((chef) => chef.id !== currentUser.value?.uid) || []
);
</script>
