<!-- components/organisms/Ingredient/CTA.vue -->
<template>
  <div class="ingredient-cta">
    <!-- Check for Misebox User -->
    <OrganismsMiseboxUserCTA v-if="!currentUser || !miseboxUser" />


    <!-- Require Chef or Supplier Profile -->
    <div v-else-if="!(chef || supplier)" class="call-to-action-message">
      <h2>Chef or Supplier Required</h2>
      <p>
        To manage ingredients, you need to be a Chef or Supplier. Please set up your profile to get started.
      </p>
      <div class="cta-buttons">
        <button class="btn" @click="redirectToCreateChef">Create Chef Profile</button>
        <button class="btn" @click="redirectToCreateSupplier">Create Supplier Profile</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();
import { useRouter } from "vue-router";
const { currentChef: chef } = useChef();
const { currentSupplier: supplier } = useSupplier();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

const router = useRouter();

// Redirects to the create Chef profile page
const redirectToCreateChef = () => {
  router.push("/chefs/create");
};

// Redirects to the create Supplier profile page
const redirectToCreateSupplier = () => {
  router.push("/suppliers/create");
};
</script>
