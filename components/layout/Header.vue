<!-- components/layout/Header.vue -->
<template>
  <client-only>
    <header class="header" @click="closeAllModals">
      <!-- Logo -->
      <AtomsLogo size="medium" />

      <!-- Navigation Links for Larger Screens -->
      <MoleculesNavigationLinks v-if="!isMobile" class="nav-links larger" />

      <!-- Header Right Section -->
      <div class="header-right">
        <NuxtLink v-if="!isAuthPage && !miseboxUser" to="/auth?mode=login" class="btn small">
          <UserCircleIcon class="icon" />
          <span v-if="!isMobile">Log In</span>
        </NuxtLink>
        <NuxtLink v-if="!isAuthPage && !miseboxUser" to="/auth?mode=signup" class="btn small">
          <UserPlusIcon class="icon" />
          <span v-if="!isMobile">Create</span>
        </NuxtLink>

        <!-- Profile Link (if logged in) -->
        <NuxtLink v-if="miseboxUser" :to="`/misebox-users/${miseboxUser.id}`" class="view-profile-link">
          <MoleculesProfileAvatar collectionName="misebox-users" :id="miseboxUser.id" :url="miseboxUser.avatar" altText="User Avatar" size="small" />
        </NuxtLink>

        <!-- Share & Burger Buttons (Mobile Only) -->
        <button class="action-button" @click.stop="toggleShareModal" v-if="isMobile">
          <client-only>
            <ShareIcon class="icon" />
          </client-only>
        </button>

        <button class="action-button" @click.stop="toggleBurgerModal" v-if="isMobile">
          <client-only>
            <Bars3Icon class="icon" />
          </client-only>
        </button>
      </div>
    </header>

 <!-- Share Modal -->
<div class="overlay" v-if="isShareModalOpen" @click.self="toggleShareModal">
  <OrganismsCurrentUserSharing class="modal" @click.stop @closeShareModal="toggleShareModal" />
</div>

    <!-- Burger Modal (Navigation Links) -->
    <div class="overlay" v-if="isBurgerModalOpen" @click.self="toggleBurgerModal">
      <div class="modal">
        <MoleculesNavigationLinks class="nav-links mobile" @click="toggleBurgerModal" />
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/auth');
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

const isShareModalOpen = ref(false);
const isBurgerModalOpen = ref(false);

const toggleShareModal = () => {
  isBurgerModalOpen.value = false; // Close burger modal if open
  isShareModalOpen.value = !isShareModalOpen.value;
};

const toggleBurgerModal = () => {
  isShareModalOpen.value = false; // Close share modal if open
  isBurgerModalOpen.value = !isBurgerModalOpen.value;
};

const closeAllModals = () => {
  isShareModalOpen.value = false;
  isBurgerModalOpen.value = false;
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 var(--spacing-l);
  background-color: var(--background-strong);
  height: var(--header-height);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-s);
  position: relative;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
}

.btn.small {
  padding: var(--spacing-xxs) var(--spacing-s);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-s);
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
}

.view-profile-link {
  display: flex;
  align-items: center;
}

/* Action Buttons */
.action-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.action-button:hover {
  color: var(--hover);
}

/* Modals */
.overlay {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.modal {
  width: 100%;
  max-width: 400px;
  position: fixed;
  top: 60px;
  background: var(--background-strong);
  padding: var(--spacing-l);
  box-shadow: var(--shadow-l);
  border-radius: var(--radius-m);
}

/* Navigation Links */
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links.larger {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-s);
}

.nav-links.mobile {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
