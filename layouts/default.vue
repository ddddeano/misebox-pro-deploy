<template>
  <div class="default-layout">
    <LayoutHeader class="layout-header" />
    <main class="main-content">
      <NuxtPage />
    </main>
    <LayoutFooter class="layout-footer" />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background: linear-gradient(135deg, var(--background-2), var(--background)); /* Full-page gradient */
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}
</style>