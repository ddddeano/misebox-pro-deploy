<!-- pages/auth/index.vue -->
<template>
  <div class="auth-page">
    <div v-if="currentUser && !currentUser.isAnonymous" class="auth-cta">
      <!-- Sign out button -->
      <OrganismsMiseboxUserCTA />
      <button @click="handleLogout" class="btn btn-primary">Sign Out</button>
    </div>
    <div class="auth-container" v-else>
      <!-- Removed the :authMode binding -->
      <OrganismsAuth />
    </div>
  </div>
</template>

<script setup>
const currentUser = useCurrentUser();
const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  try {
    await logout();
    router.push('/'); // Redirect to home or relevant page after logout
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

<style scoped>
.auth-cta, .auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing-xxs);
  margin: 0;
}

.auth-container {
  width: 100%;
  max-width: 600px;
}
</style>
