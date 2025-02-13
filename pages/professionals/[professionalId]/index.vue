<!-- pages/professionals/[professionalId]/index.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="professional"
      entityType="professionals"
      mode="view"
    >
      <OrganismsProfessionalView :professional="professional" />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const route = useRoute();
const currentUser = useCurrentUser();
const { fetchMiseboxUser } = useMiseboxUser();
const { fetchProfessional } = useProfessional();

const miseboxUser = fetchMiseboxUser(route.params.professionalId);
const professional = fetchProfessional(route.params.professionalId);
</script>
