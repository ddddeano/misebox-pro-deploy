<!-- components/organisms/Chef/CTA.vue -->
<template>
  <!-- Chef-specific CTA -->
  <OrganismsMiseboxUserCTA v-if="!currentUser || !miseboxUser" />

  <!-- Redirect to create page if no Chef profile exists -->
  <div v-if="currentUser && miseboxUser && !chef" class="call-to-action-message">
    <h2>Step Into Your Chef Journey</h2>
    <p>
      Misebox empowers chefs to showcase their culinary talent, organize workflows, and manage their kitchens efficiently.
    </p>
    <button class="btn" @click="redirectToCreate">Create Chef Profile</button>
  </div>

  <!-- Profile card for users with a Chef profile -->
  <div v-if="currentUser && miseboxUser && chef" class="call-to-action-existing">
    <OrganismsChefCard />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentChef: chef } = useChef();

const redirectToCreate = () => {
  router.push("/chefs/create");
};
</script>
