<!-- components/molecules/forms/CreateModeSection.vue -->
<template>
  <transition name="fade">
    <div v-if="isCreating && !isFolded" class="create bordered-section">
      <slot name="create" :item="localNewObject" />
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  isCreating: {
    type: Boolean,
    required: true,
  },
  isFolded: {
    type: Boolean,
    required: true,
  },
  localNewObject: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["confirm-create", "cancel-create"]); // Ensure consistency with parent event names
</script>

<style lang="scss" scoped>
.create {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: var(--spacing-s);
  background-color: var(--tertiary);
}
</style>
