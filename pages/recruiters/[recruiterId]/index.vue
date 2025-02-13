<!-- pages/recruiters/[recruiterId]/index.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="recruiter"
      entityType="recruiters"
      mode="view"
    >
      <OrganismsRecruiterView :recruiter="recruiter" />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchRecruiter } = useRecruiter();

const miseboxUser = fetchMiseboxUser(route.params.recruiterId);
const recruiter = fetchRecruiter(route.params.recruiterId);
</script>
