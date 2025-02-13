<!-- components/organisms/MiseboxUser/List.vue -->
<!-- ============================
components/organisms/MiseboxUser/List.vue
============================ -->

<template>
  <div class="list">
    <template v-if="miseboxUsers?.length">
      <div
        v-for="user in filteredMiseboxUsers"
        :key="user.id"
        class="list-item"
      >
        <OrganismsMiseboxUserCell :miseboxUser="user" />
      </div>
    </template>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();

const { miseboxUsersCollection } = useMiseboxUser();

const miseboxUsers = miseboxUsersCollection();

const filteredMiseboxUsers = computed(() =>
  miseboxUsers?.value?.filter((user) => user.id !== currentUser.value?.uid) || []
);
</script>
