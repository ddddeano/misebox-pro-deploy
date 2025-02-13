<!-- components/molecules/buttons/ThemeToggle.vue -->
<!-- components/molecules/ThemeToggle.vue -->
<template>
  <div class="theme-toggle" @click="toggleTheme" :aria-label="currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
    <MoonIcon v-if="currentTheme === 'dark'" class="icon" aria-hidden="true" />
    <SunIcon v-else class="icon" aria-hidden="true" />
  </div>
</template>

<script setup>
const { currentTheme, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-strong); 
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid var(--border); 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>