<!-- components/organisms/Professional/CTA.vue -->
<template>
  <!-- Professional-specific CTA -->
  <OrganismsMiseboxUserCTA v-if="!currentUser || !miseboxUser" />

  <!-- Redirect to create page if no Professional profile exists -->
  <div v-if="currentUser && miseboxUser && !professional" class="call-to-action-message">
    <h2>Advance Your Professional Path</h2>
    <p>
      Misebox helps you stand out in the job market with a digital portfolio that showcases your achievements and connects you to top opportunities.
    </p>
    <button class="btn" @click="redirectToCreate">Create Professional Profile</button>
  </div>

  <!-- Profile card for users with a Professional profile -->
  <div v-if="currentUser && miseboxUser && professional" class="call-to-action-existing">
    <OrganismsProfessionalCard />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentProfessional: professional } = useProfessional();

// Redirect to create page
const redirectToCreate = () => {
  router.push("/professionals/create");
};
</script>
