<!-- pages/professionals/create.vue -->
<template>
  <client-only>
    <div class="page">
      <OrganismsMiseboxUserCTA />
      <OrganismsProfessionalCreate v-if="!professional" />
      <p v-else>You already have a professional profile.</p>
    </div>
  </client-only>
</template>

<script setup>
const { currentProfessional: professional } = useProfessional();
</script>
