<!-- components/molecules/buttons/Google.vue -->
<!-- components/molecules/buttons/GoogleButton.vue -->
<!-- components/molecules/GoogleButton.vue -->
<template>
  <client-only>
    <div @click="$emit('click')" class="google-logo-wrapper">
      <!-- Conditional rendering based on both theme and signup status -->
      <img 
        v-if="!isSignup && currentTheme === 'light'" 
        src="/assets/icons/google-logo/sign-in-light.svg" 
        alt="Sign In with Google Light" 
        class="google-logo" 
      />
      <img 
        v-if="isSignup && currentTheme === 'light'" 
        src="/assets/icons/google-logo/sign-up-light.svg" 
        alt="Sign Up with Google Light" 
        class="google-logo" 
      />
      <img 
        v-if="!isSignup && currentTheme === 'dark'" 
        src="/assets/icons/google-logo/sign-in-dark.svg" 
        alt="Sign In with Google Dark" 
        class="google-logo" 
      />
      <img 
        v-if="isSignup && currentTheme === 'dark'" 
        src="/assets/icons/google-logo/sign-up-dark.svg" 
        alt="Sign Up with Google Dark" 
        class="google-logo" 
      />
    </div>
  </client-only>
</template>

<script setup>

const props = defineProps({
  isSignup: {
    type: Boolean,
    default: false,
  },
});

// Get current theme from the useTheme composable
const { currentTheme } = useTheme();
</script>

<style scoped>
.google-logo-wrapper {
  cursor: pointer; /* Show pointer cursor on hover for the wrapper */
}
</style>
