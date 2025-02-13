<!-- pages/chefs/[chefId]/index.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="chef"
      entityType="chefs"
      mode="view"
    >
      <OrganismsChefView :chef="chef" />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const route = useRoute();
const { fetchMiseboxUser } = useMiseboxUser();
const { fetchChef } = useChef();

const miseboxUser = fetchMiseboxUser(route.params.chefId);
const chef = fetchChef(route.params.chefId);
</script>
