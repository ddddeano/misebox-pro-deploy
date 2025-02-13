<!-- pages/design-system/index.vue -->
<template>
  <client-only>
    <div class=" design-system">
      <DesignSideMenu />
      <main class="main-content">
        <h1>Design System Index</h1>
        <p>Welcome to the design system. Use the menu on the left to navigate.</p>
      </main>
    </div>
  </client-only>
</template>

<script setup>
</script>

<style scoped>
.design-system {
  display: flex;
  min-height: 100vh;
  width: 100%;
}
.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
