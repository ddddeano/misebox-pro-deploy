<!-- components/organisms/Kitchen/link/Chef/List.vue -->
<template>
  <div class="list">
    <h2 class="list-title">Chefs in This Kitchen</h2>

    <ul v-if="chefIds.length">
      <li v-for="id in chefIds" :key="id">
        <OrganismsKitchenLinkChefCell :id="id" />
      </li>
    </ul>

    <p v-else class="no-entities">No chefs linked to this kitchen yet.</p>
  </div>
</template>

<script setup>
defineProps({ chefIds: { type: Array, required: false, default: () => [] } });
</script>
