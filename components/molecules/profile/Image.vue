<!-- components/molecules/profile/Image.vue -->
<template>
  <div class="profile-image" :class="`profile-image--${size}`">
    <template v-if="url">
      <img :src="url" :alt="altText" class="profile-image-photo" />
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
    default: "medium",
    validator: (value) => ["mini", "small", "medium", "large"].includes(value),
  },
  altText: {
    type: String,
    default: "Profile Image", // Alt text for accessibility
  },
});
</script>
