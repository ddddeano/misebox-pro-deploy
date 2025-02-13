<!-- components/layout/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <MoleculesButtonsThemeToggle />
      <AtomsLogo class="footer-logo" />
      <p>Device Type: {{ deviceType }}</p>
      <p>&copy; 2024 Misebox. All rights reserved.</p>
      <p>Version 2.0.2</p>
      <p>Contact us: support@misebox.com</p>
    </div>
  </footer>
</template>

<script setup>
const { deviceType } = useDeviceType()
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: var(--spacing-m);
  background-color: var(--background);
  color: var(--text-primary);

  text-align: center;
  border-top: 1px solid var(--border);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
}

.footer-logo {
  margin: var(--spacing-m);
}
</style>
