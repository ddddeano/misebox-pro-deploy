<!-- pages/index.vue -->
<template>
  <ClientOnly>
    <div class="landing-page">
      <h1 class="app-slogan">Your Smart Mise en Place!</h1>

      <!-- User Section Wrapper -->
      <section v-if="miseboxUser" class="info-card section">
        <div class="section-content">
          <h2 class="welcome-message">
            👋 Welcome back, <span class="user-name">{{ miseboxUser.display_name }}</span>!
          </h2>
          <div class="description">{{ miseboxMessage }}</div>
          <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="btn btn-pill btn-primary">
            View Your Dashboard
          </NuxtLink>
        </div>
      </section>

      <section v-else class="info-card section">
        <div class="section-content">
          <p class="welcome-message">🚀 Join the Misebox Ecosystem!</p>
          <div class="description">{{ miseboxMessage }}</div>
          <NuxtLink to="/auth" class="btn btn-pill btn-primary">Get Started Now</NuxtLink>
        </div>
      </section>
  <!-- Recruiter Section -->
  <section class="info-card section recruiter-section">
        <div class="section-content">
          <h2 class="section-title">Find a Solution to your recruitment needs</h2>
          <div class="section-description">
            Misebox hosts a databse of fixed and flexable professionals to connect with. Interact directly or post a postion out to the market.
          </div>
          <NuxtLink to="/professionals" class="btn btn-pill btn-primary">Create Recruitment Profile</NuxtLink>

        </div>
      </section>
      <!-- Digital Portfolio Section -->
      <section class="info-card section portfolio-section">
        <div class="section-content">
          <h2 class="section-title">Create a Professional Portfolio</h2>
          <div class="section-description">
            Showcase your realtime rsume, skills and achievements in one place, making it easy for new opportunities to find you.  
          </div>
          <NuxtLink to="/professionals" class="btn btn-pill btn-primary">Start Your Portfolio</NuxtLink>
        </div>
      </section>

      <!-- Chef Section -->
      <section class="info-card section chef-section">
        <div class="section-content">
          <h2 class="section-title">Optimize Your Kitchen Workflow</h2>
          <div class="section-description">
            Coordinate tasks, recipes, and team management with ease. Misebox tools streamline your kitchen’s daily operations.
          </div>
          <NuxtLink to="/chefs" class="btn btn-pill btn-primary">Explore Kitchen Tools</NuxtLink>
        </div>
      </section>

      <!-- Recipes Section -->
      <section class="info-card section recipes-section">
        <div class="section-content">
          <h2 class="section-title">Organize Your Recipe Collection</h2>
          <div class="section-description">
            Notice no cookies - Chef designed recipes that are quick to use and easy to edit and organise.
             Link them to our kitchen so our whole team can access and bolt on training
          </div>
          <NuxtLink to="/chefs/recipe" class="btn btn-pill btn-primary">Manage Recipes</NuxtLink>
        </div>
      </section>

    
    </div>
  </ClientOnly>
</template>

<script setup>
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';

const currentUser = useCurrentUser();
const db = useFirestore();

// Fetching the misebox user data directly
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, 'misebox-users', currentUser.value.uid) : null
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const miseboxMessage = 'Create your smart mise-en-place with Misebox. All the essential tools for managing your kitchens; recipes, recruitment, tasks, inventory, POS, complicence, networking and more.'

</script>

<style scoped>
/* Base Styles */
.landing-page {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-s);
}

.app-slogan {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  text-align: center;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-l);
}

/* Unified Section Styles */
.section {
  display: flex;
  justify-content: center;
  padding: var(--spacing-l) var(--spacing-m);
  text-align: center;
  width: 100%;
  max-width: 100%; /* Full width on smaller screens */
  margin-bottom: var(--spacing-xxl); /* Increased bottom margin for breathing room */
}

/* General Info and Section Cards */
.info-card {
  background: linear-gradient(135deg, var(--primary), var(--tertiary));
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-l); /* Increased padding for more vertical space */
  background-color: var(--background-strong);
  border-radius: var(--radius-m);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%; /* Ensures full width on mobile */
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

/* Titles and Descriptions */
.welcome-message,
.section-title {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.user-name {
  color: var(--text-inverse);
  font-weight: var(--font-weight-bold);
}

.description,
.section-description {
  font-size: var(--font-size-m);
  color: var(--text-secondary);
  line-height: var(--line-height-m);
  margin: var(--spacing-m) 0;
  width: 100%;
}


/* Responsive Adjustments */
@media (min-width: 768px) {
  .section {
    max-width: 600px;
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-xxl); /* Maintain spacing on larger screens */
  }

  .app-slogan {
    font-size: var(--font-size-xl);
  }
}
</style>
