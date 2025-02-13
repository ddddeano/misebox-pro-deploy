<!-- components/molecules/navigation/NavigationLinks.vue -->
<!-- components/molecules/NavigationLinks.vue -->
<template>
  <ul class="navigation-links">
    <li>
      <NuxtLink to="/misebox-users" active-class="active-link">Misebox</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/professionals" active-class="active-link">Professionals</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/chefs" active-class="active-link">Chefs</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/recruiters" active-class="active-link">Recruiters</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/suppliers" active-class="active-link">Suppliers</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/kitchens" active-class="active-link">Kitchens</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/jobs" active-class="active-link">Jobs</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/ingredients" active-class="active-link">Ingredients</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/subscribe" active-class="active-link">Subscribe</NuxtLink>
    </li>
  </ul>
</template>

<script setup></script>

<style lang="scss">

.divider {
  border-top: 1px solid var(--border); /* Use a border color variable */
  margin: var(--spacing-xs) 0; /* Add some spacing between sections */
}
</style>
