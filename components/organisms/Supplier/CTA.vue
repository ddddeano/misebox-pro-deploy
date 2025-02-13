<!-- components/organisms/Supplier/CTA.vue -->
<template>
    <OrganismsMiseboxUserCTA v-if="!currentUser || !miseboxUser" />

  <!-- Redirect to create page if no Recruiter profile exists -->
  <div v-if="currentUser && miseboxUser && !supplier" class="call-to-action-message">
    <h2>Join as a Supplier</h2>
    <p>
      Join Misebox as a Supplier to manage your inventory, connect with chefs, and streamline your operations.    </p>
    <button class="btn" @click="redirectToCreate">Create Supplier Profile</button>
  </div>

  <!-- Profile card for users with a Recruiter profile -->
  <div v-if="currentUser && miseboxUser && supplier" class="call-to-action-existing">
    <OrganismsSupplierCard />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentSupplier: supplier } = useSupplier();

const redirectToCreate = () => {
  router.push("/suppliers/create");
};
</script>