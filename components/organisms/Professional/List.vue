<!-- components/organisms/Professional/List.vue -->
<template>
  <div class="list">
    <template v-if="filteredProfessionals?.length">
      <div
        v-for="professional in filteredProfessionals"
        :key="professional.id"
        class="list-item"
      >
        <OrganismsProfessionalCell :professional="professional" />
      </div>
    </template>
    <p v-else>No professionals found.</p>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();

const { professionalsCollection } = useProfessional();

const professionals = professionalsCollection();

const filteredProfessionals = computed(() =>
  professionals?.value?.filter((professional) => professional.id !== currentUser.value?.uid) || []
);
</script>
