<!-- components/organisms/Recruiter/List.vue -->
<template>
  <div class="list">
    <template v-if="filteredRecruiters?.length">
      <div
        v-for="recruiter in filteredRecruiters"
        :key="recruiter.id"
        class="list-item"
      >
        <OrganismsRecruiterCell :recruiter="recruiter" />
      </div>
    </template>
    <p v-else>No recruiters found.</p>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();

const { recruitersCollection } = useRecruiter();

const recruiters = recruitersCollection();

const filteredRecruiters = computed(() =>
  recruiters?.value?.filter((recruiter) => recruiter.id !== currentUser.value?.uid) || []
);
</script>
