<!-- components/organisms/Chef/link/Kitchen/List.vue -->
<template>
  <div class="list">
    <h2 class="list-title">Kitchens Associated with This Chef</h2>

    <ul v-if="kitchenIds.length">
      <li v-for="id in kitchenIds" :key="id">
        <OrganismsChefLinkKitchenCell :id="id" />
      </li>
    </ul>

    <p v-else class="no-entities">No kitchens linked to this chef yet.</p>
  </div>
</template>

<script setup>
defineProps({ kitchenIds: { type: Array, required: false, default: () => [] } });
</script>
