<!-- components/organisms/Recruiter/CTA.vue -->
<template>
  <OrganismsMiseboxUserCTA v-if="!currentUser || !miseboxUser" />

  <!-- Redirect to create page if no Recruiter profile exists -->
  <div v-if="currentUser && miseboxUser && !recruiter" class="call-to-action-message">
    <h2>Join as a Recruiter</h2>
    <p>
      Misebox helps recruiters find top talent, post jobs, and connect with industry professionals.
    </p>
    <button class="btn" @click="redirectToCreate">Create Recruiter Profile</button>
  </div>

  <!-- Profile card for users with a Recruiter profile -->
  <div v-if="currentUser && miseboxUser && recruiter" class="call-to-action-existing">
    <OrganismsRecruiterCard />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentRecruiter: recruiter } = useRecruiter();

const redirectToCreate = () => {
  router.push("/recruiters/create");
};
</script>
