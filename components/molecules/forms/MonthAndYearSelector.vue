<!-- components/molecules/forms/MonthAndYearSelector.vue -->
<!-- components/molecules/MonthAndYearSelector.vue -->
<template>
  <div class="month-year-selector">
    <div class="selectors">
      <!-- Month Selector -->
      <select v-model="selectedMonth" @change="updateMonth" class="editable-input">
        <option disabled value="">Month</option>
        <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>
      </select>

      <!-- Year Selector -->
      <select v-model="selectedYear" @change="updateYear" class="editable-input">
        <option disabled value="">Year</option>
        <option v-for="year in years" :key="year">{{ year }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props: Now using strings for month and year
const props = defineProps({
  month: {
    type: String,
    default: '', // Default to empty
  },
  year: {
    type: String,
    default: '', // Default to empty
  }
});

// Emit events for the month and year
const emit = defineEmits(['update:month', 'update:year']);

// Month options (array of month names)
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


// Year options (current year to 40 years back)
const years = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 41 }, (_, i) => String(currentYear - i)); // Convert years to strings
});

// Refs for selected month and year
const selectedMonth = ref(props.month); // Initialize from prop
const selectedYear = ref(props.year);   // Initialize from prop

// Emit the updated month when changed
const updateMonth = () => {
  emit('update:month', selectedMonth.value);
};

// Emit the updated year when changed
const updateYear = () => {
  emit('update:year', selectedYear.value);
};
</script>

<style scoped>
.month-year-selector {
  display: flex;
}

.selectors {
  display: flex;
  gap: 10px;
  width: 60%;
}
</style>
