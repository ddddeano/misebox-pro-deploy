<template>
  <div class="menu-section">
    <div class="section-header" :class="{ unfolded: !isFolded }">
      <!-- Input serves as both label and editor -->
      <input
        v-model="section.sectionName"
        placeholder="Enter section name (e.g. Lunch Items)"
        class="section-title-edit"
        @click.stop
      />
      <!-- Toggle container with a single chevron icon that changes based on state -->
      <div class="toggle-container" @click.stop="toggleFold">
        <ChevronDownIcon v-if="isFolded" class="icon toggle-icon" />
        <ChevronUpIcon v-else class="icon toggle-icon" />
      </div>
    </div>
    <!-- Section details; display nested content when unfolded -->
    <div v-if="!isFolded" class="section-details">
items
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      sectionName: "",
      items: []
    }),
  },
});
const emit = defineEmits(["update:modelValue"]);

// Local reactive copy of the section data.
const section = ref({ ...props.modelValue });

// Local state to control fold/unfold.
const isFolded = ref(true);

// Toggle the fold state.
const toggleFold = () => {
  isFolded.value = !isFolded.value;
};

// Propagate any changes to the parent.
watch(
  section,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);
</script>

<style scoped>
.menu-section {
  margin-bottom: var(--spacing-m);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-s);
  background-color: var(--background-strong);
  cursor: pointer;
}

.section-title-edit {
  flex: 1;
  padding: var(--spacing-s);
  font-size: var(--font-size-m);
  border: none;
  background: transparent;
  color: var(--text-primary);
}

.section-title-edit::placeholder {
  color: var(--text-secondary);
}

.toggle-container {
  margin-left: var(--spacing-xs);
  display: flex;
  align-items: center;
}

.icon.toggle-icon {
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.icon.toggle-icon:hover {
  transform: scale(1.1);
  color: var(--primary-hover);
}

.section-details {
  padding: var(--spacing-s);
  background-color: var(--background);
}
</style>
