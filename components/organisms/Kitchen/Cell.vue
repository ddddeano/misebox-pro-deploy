<!-- components/organisms/Kitchen/Cell.vue -->
<template>
  <div class="cell" v-if="kitchen">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="kitchen.image_url"
          :url="kitchen.image_url"
          size="small"
          altText="Kitchen Image"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name" v-if="kitchenDisplayName">
          {{ kitchenDisplayName }}
        </span>
        <span class="handle" v-if="kitchenLocation">
          {{ kitchenLocation }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
    default: () => ({})
  },
  isDisabled: {
    type: Boolean,
    default: false,
  }
});

// Compute the route: if isDisabled is true, return null; otherwise, the kitchen route.
const route = computed(() => (props.isDisabled ? null : `/kitchens/${props.kitchen.id}`));

// Compute the display name using the same fallback chain.
const kitchenDisplayName = computed(() => {
  return props.kitchen.place_name || props.kitchen.name || "Unnamed Kitchen";
});

// Compute the location string using formatted_address or short_address.
const kitchenLocation = computed(() => {
  return props.kitchen.formatted_address || props.kitchen.short_address || "";
});
</script>
