<!-- components/molecules/profile/Display.vue -->
<!-- components/molecules/profile/display.vue -->
<template>
  <div class="profile-display">
    <div
      v-for="(item, index) in validItems"
      :key="index"
      :class="getItemClass(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const validItems = computed(() =>
  props.items.filter((item) => item !== undefined && item !== null && item !== "")
);

// Determine the class based on the index
const getItemClass = (index) => {
  if (index === 0) return "profile-display-item heading";
  if (index === 1) return "profile-display-item thin";
  if (index === 2) return "profile-display-item italics";
  return "profile-display-item normal";
};
</script>

<style scoped>
.profile-display {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.profile-display-item {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-regular);
  color: var(--text-primary);
}

/* Styles for the first item (heading) */
.profile-display-item.heading {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

/* Styles for the second item (thin) */
.profile-display-item.thin {
  font-weight: var(--font-weight-light);
  font-size: var(--font-size-m);
  color: var(--text-secondary);
}

/* Styles for the third item (italics) */
.profile-display-item.italics {
  font-style: italic;
  font-size: var(--font-size-m);
  color: var(--text-primary);
}

/* Styles for subsequent items (normal) */
.profile-display-item.normal {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-regular);
  color: var(--text-secondary);
}
</style>
