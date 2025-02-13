<!-- pages/chefs/edit.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="chef"
      entityType="chefs"
      mode="edit"
      :deleteEntity="deleteChef"
    >
      <OrganismsChefEdit />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentChef: chef, deleteChef } = useChef();
</script>
