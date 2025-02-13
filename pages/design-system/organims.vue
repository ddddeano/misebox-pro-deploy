<!-- pages/design-system/organims.vue -->
<template>
  <client-only>
    <div class="design-system">
      <DesignSideMenu />
      <main class="main-content">
        <h1>Organims</h1>
        <p>Showcase for organism-level components goes here...</p>
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
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
