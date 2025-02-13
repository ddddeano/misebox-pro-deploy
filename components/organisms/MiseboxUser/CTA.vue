<!-- components/organisms/MiseboxUser/CTA.vue -->
<template>
  <div>
    <div v-if="!miseboxUser" class="call-to-action-message">
      <h2>Join the Misebox Ecosystem</h2>
      <p>
        Create your Misebox account to access tools for managing kitchens, workflows, and more.
      </p>
      <button class="btn" @click="redirect">Create Misebox User Profile</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Redirect to the appropriate page
const redirect = () => {
  if (currentUser.value?.isAnonymous) {
    router.push('/auth'); // Redirect anonymous users to sign in
  } else if (currentUser.value && !miseboxUser.value) {
    router.push('/misebox-users/create'); // Redirect authenticated users to create a profile
  }
};
</script>
