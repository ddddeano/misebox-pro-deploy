<!-- components/molecules/profile/Avatar.vue -->
<template>
  <div 
    class="avatar" 
    :class="[`avatar--${size}`, { 'avatar--notification': hasNotifications }]"
  >
    <template v-if="url">
      <img :src="url" :alt="altText" class="avatar-image" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: false, // Optional if fallback is used
  },
  size: {
    type: String,
    default: "mini",
    validator: (value) => ["mini", "small", "medium", "large"].includes(value),
  },
  altText: {
    type: String,
    default: "Avatar", // Alt text for accessibility
  },

});

const hasNotifications = ref(true);
</script>

<style lang="scss" scoped>
.avatar--notification {
  border-color: var(--primary);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}
</style>
