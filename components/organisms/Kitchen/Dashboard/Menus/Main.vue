<template>
  <div class="module">
    <h2>Menus</h2>
    <OrganismsKitchenDashboardMenusFormsAdd />
    <div v-for="menu in menus" :key="menu.name" class="menu">
      <h3>{{ menu.name }}</h3>
      <ul>
        <li v-for="item in menu.items" :key="item.name" class="menu-item">
          {{ item.name }} - {{ item.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.module {
  padding: var(--spacing-m);
}
.menu {
  margin-top: var(--spacing-m);
}
.menu-item {
  list-style: none;
  padding: var(--spacing-s) 0;
}
</style>
