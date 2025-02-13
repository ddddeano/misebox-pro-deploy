<template>
  <div class="top-chevron-bar" :class="{ unfolded: !isFolded }" @click="emitToggle">
    <label>{{ label }}</label>
    <div class="top-icons">
      <ChevronDownIcon v-if="isFolded" class="icon toggle-icon" />
      <ChevronUpIcon v-else class="icon toggle-icon" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  isFolded: { type: Boolean, required: true },
});

const emit = defineEmits(["toggle"]);

const emitToggle = () => emit("toggle");
</script>

<style lang="scss" scoped>
.top-chevron-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-strong);
  padding: var(--spacing-xs);
  border-radius: var(--radius-s);
  border: 1px solid var(--border);
  transition: background-color 0.3s ease;
  cursor: pointer;

  &.unfolded {
    background-color: var(--background-strong);
  }
}

.top-icons {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.icon {
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.icon:hover {
  color: var(--primary-hover);
  transform: scale(1.1);
}
</style>
