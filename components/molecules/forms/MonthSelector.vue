<!-- components/molecules/forms/MonthSelector.vue -->
<!-- components/molecules/MonthSelector.vue -->
<template>
  <select v-model="selectedMonth" @change="emitUpdatedDate">
    <option value="" disabled>Select a month</option>
    <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}</option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue';
import { setMonth } from 'date-fns';

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  }
});

const emit = defineEmits(['update:modelValue']);

// Months array
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Local state for selected month
const selectedMonth = ref(props.modelValue ? props.modelValue.getMonth() : null);

// Watch for changes in modelValue and update local month accordingly
watch(() => props.modelValue, (newDate) => {
  if (newDate) {
    selectedMonth.value = newDate.getMonth();
  }
});

// Emit the updated Date object
const emitUpdatedDate = () => {
  if (props.modelValue) {
    const updatedDate = setMonth(new Date(props.modelValue), selectedMonth.value);
    emit('update:modelValue', updatedDate);
  }
};
</script>
