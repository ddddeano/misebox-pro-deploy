<!-- components/molecules/forms/DatePicker.vue -->
<template>
  <div class="date-picker-container">
    <input
      type="date"
      :value="formattedDate"
      @input="onDateChange"
      class="date-picker-input"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

// Initialize the local date as reactive data
const date = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    date.value = newVal;
  }
);

// Emit date changes back to the parent component
const onDateChange = (event) => {
  emit('update:modelValue', event.target.value);
};

// Format date for display in the input field
const formattedDate = computed(() => {
  if (!date.value) return '';
  const d = new Date(date.value);
  return d.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
});
</script>

<style scoped>
.date-picker-container {
  position: relative;
  width: 100%;
}

.date-picker-input {
  width: 100%;
  padding: 10px;
  border-radius: var(--radius-s);
  border: 1px solid var(--border);
  font-size: var(--font-size-m);
  color: var(--text-primary);
  background-color: var(--background);
  transition: border-color 0.3s ease;
}

.date-picker-input:focus {
  outline: none;
  border-color: var(--hover);
}
</style>
