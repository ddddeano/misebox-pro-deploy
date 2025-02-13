<!-- components/organisms/Kitchen/List.vue -->
<template>
  <div class="chef-kitchen-list">
    <template v-if="kitchens.length">
      <div
        v-for="kitchen in kitchens"
        :key="kitchen.id"
        class="list-item"
      >
        <OrganismsKitchenCell :kitchen="kitchen" />
      </div>
    </template>
    <p v-else>No kitchens found.</p>
  </div>
</template>

<script setup>
defineProps({
  kitchens: {
    type: Array,
    required: true,
    default: () => []
  },
});
</script>
