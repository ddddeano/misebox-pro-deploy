<!-- pages/recruiters/edit.vue -->
<template>
  <client-only>
    <MoleculesProfilePage
      :miseboxUser="miseboxUser"
      :entity="recruiter"
      entityType="recruiters"
      mode="edit"
      :deleteEntity="deleteRecruiter"
    >
      <OrganismsRecruiterEdit />
    </MoleculesProfilePage>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentRecruiter: recruiter, deleteRecruiter } = useRecruiter();
</script>
