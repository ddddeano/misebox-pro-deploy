<!-- components/molecules/forms/YearSelector.vue -->
<!-- components/molecules/YearSelector.vue -->
<template>
  <div class="year-selector">
    <select v-model="selectedYear" @change="updateYear" class="editable-input">
      <option disabled value="">Select Year</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Props for external data binding
const props = defineProps({
  year: {
    type: String,
    default: "", // Default to empty
  },
  startYear: {
    type: Number,
    default: 1950, // Default starting year
  },
  endYear: {
    type: Number,
    default: new Date().getFullYear(), // Default ending year
  },
});

// Emits to parent
const emit = defineEmits(["update:year"]);

// Years list (computed based on props)
const years = computed(() => {
  return Array.from({ length: props.endYear - props.startYear + 1 }, (_, i) => String(props.startYear + i));
});

// Selected year (two-way binding)
const selectedYear = ref(props.year);

// Emit year updates to the parent
const updateYear = () => {
  emit("update:year", selectedYear.value);
};
</script>

<style scoped>
.year-selector {
  display: flex;
  justify-content: center;
  width: 100%;
}

.editable-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  font-size: var(--font-size-m);
}
</style>
