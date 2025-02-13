<!-- pages/misebox-users/[miseboxUserId]/index.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="miseboxUser"
      entityType="misebox-users"
      mode="view"
    >
      <OrganismsMiseboxUserView :miseboxUser="miseboxUser" />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const route = useRoute();
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(route.params.miseboxUserId);
</script>
