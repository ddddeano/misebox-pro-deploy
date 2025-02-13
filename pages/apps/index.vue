<!-- pages/apps/index.vue -->
<template>
  <div class="apps-page">
    <h1>Manage Your Apps</h1>

    <!-- Congratulations message -->
    <div v-if="hasAllApps" class="congratulations">
      🎉 Congratulations, {{ profile.display_name }}! You have all the available apps.
    </div>

    <!-- Section: Your Apps -->
    <div class="your-apps">
      <h2>Your Apps</h2>
      <div v-if="yourApps.length" class="apps-container">
        <MainUserApp
          v-for="app in yourApps"
          :key="app.collection"
          :app="app"
          buttonText="Manage"
          @action="manageApp(app)"
        />
      </div>
      <div v-else>
        <p>You don't have any apps yet.</p>
      </div>
    </div>

    <!-- Section: Apps You Don’t Have -->
    <div class="apps-you-dont-have" v-if="availableApps.length">
      <h2>Apps You Don’t Have</h2>
      <div class="apps-container">
        <MainUserApp
          v-for="app in availableApps"
          :key="app.collection"
          :app="app"
          buttonText="Create"
          @action="createApp(app)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const currentUser = useCurrentUser();
const db = useFirestore();
const router = useRouter();

// Reference user document in Firestore
const userDocRef = computed(() => currentUser.value ? doc(db, 'misebox-users', currentUser.value.uid) : null);
const { data: profile } = useDocument(userDocRef);

// List of all available apps
const allApps = miseboxApps;

// Your apps - based on user document, using `app.collection` for checking
const yourApps = computed(() => {
  const userApps = profile.value?.user_apps || [];
  return allApps.filter(app => userApps.includes(app.collection));
});

// Apps the user doesn't have
const availableApps = computed(() => {
  const userApps = profile.value?.user_apps || [];
  return allApps.filter(app => !userApps.includes(app.collection));
});

// Check if user has all available apps
const hasAllApps = computed(() => {
  return yourApps.value.length === allApps.length;
});

// Manage and create app functions
const manageApp = (app) => {
  router.push(`/${app.collection}/${currentUser.value.uid}`);
};

const createApp = (app) => {
  // Implement logic for creating specific app
  router.push(`/create/${app.collection}`);
};
</script>

<style scoped>
/* App Page Container */
.apps-page {
  padding: 20px;
}

/* Congratulations message */
.congratulations {
  background-color: var(--success-color);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: var(--text-color-inverse);
  text-align: center;
}

/* App containers */
.apps-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
