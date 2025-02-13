<!-- pages/professionals/edit.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="professional"
      entityType="professionals"
      mode="edit"
      :deleteEntity="deleteProfessional"
    >
      <OrganismsProfessionalEdit />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentProfessional: professional, deleteProfessional } = useProfessional();
</script>
