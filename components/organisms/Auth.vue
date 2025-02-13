<!-- components/organisms/Auth.vue -->
<template>
  <div class="auth-content">
    <div class="auth-title">{{ isSignup ? 'Create' : 'Welcome back' }}</div>
    <p class="app-slogan">Your Smart Mise en Place!</p>
    <hr class="divider" />
    <MoleculesButtonsGoogle @click="googleSignIn" :isSignup="isSignup" />
    <hr class="divider" />

    <form @submit.prevent="isSignup ? signUp(email, password) : logIn(email, password)" novalidate>
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          :disabled="loading"
          class="editable-input"
        />
      </div>
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          :disabled="loading"
          class="editable-input"
        />
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <button type="submit" :disabled="loading" class="btn btn-primary btn-pill">
        <span v-if="!loading">{{ isSignup ? 'Create Account' : 'Log In' }}</span>
        <span v-else>Processing...</span>
      </button>
    </form>
    <p @click="toggleAuthMode" class="toggle-link">
      {{ isSignup ? 'Already have an account? Log in' : 'New here? Create an account' }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive states from your auth composable and internal component state
const { signUp, logIn, googleSignIn, error, loading } = useAuth();
const email = ref('');
const password = ref('');

// Set the default mode (login) so isSignup is false initially
const isSignup = ref(false);

const toggleAuthMode = () => {
  isSignup.value = !isSignup.value;
};
</script>

<style scoped>
.auth-content {
  width: 100%; /* Full width on mobile */
  padding: var(--spacing-l);
  background-color: var(--background-strong);
  border-radius: var(--radius-m);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto; /* Center the container */
}

@media (min-width: 768px) {
  .auth-content {
    max-width: 600px; /* Set a larger max width for tablets and above */
  }
}

.app-slogan {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-s);
  text-align: center;
}

.auth-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 8px;
}

.error-message {
  color: var(--error-color);
  font-size: var(--font-size-s);
  margin: var(--spacing-s) 0;
  text-align: center;
}

.divider {
  border-top: 1px solid var(--border);
  margin: var(--spacing-m) 0;
  width: 100%;
  max-width: 350px;
}

.toggle-link {
  color: var(--text-secondary);
  cursor: pointer;
  font-size: var(--font-size-s);
  margin-top: var(--spacing-m);
  text-decoration: underline;
  text-align: center;
}

.btn {
  margin-top: 8px;
}
</style>
