<!-- pages/misebox-users/edit.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="miseboxUser"
      entityType="misebox-users"
      mode="edit"
      :deleteEntity="deleteMiseboxUser"
    >
      <OrganismsMiseboxUserEdit />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser, deleteMiseboxUser } = useMiseboxUser();
</script>
