<!-- components/molecules/buttons/ChevronButton.vue -->
<!-- components/molecules/ChevronButton.vue -->
<template>
  <div class="chevron-button icon" @click="handleClick">
    <ChevronUpIcon :class="chevronDirectionClass" />
  </div>
</template>

<script setup>
// Props to receive the direction (up, down, left, right)
const props = defineProps({
  direction: {
    type: String,
    required: true,
    validator: value => ['up', 'down', 'left', 'right'].includes(value), // Validate the prop value
  },
})

// Emit an event when the button is clicked
const emit = defineEmits(['click'])

// Method to emit the click event
const handleClick = () => {
  emit('click')
}

// Computed class for the Chevron direction
const chevronDirectionClass = computed(() => {
  return `chevron--${props.direction}` // Generates class like 'chevron--up', 'chevron--down', etc.
})
</script>

<style scoped>
.chevron-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chevron--up {
  transform: rotate(0deg); /* Default is up */
}

.chevron--down {
  transform: rotate(180deg);
}

.chevron--left {
  transform: rotate(90deg);
}

.chevron--right {
  transform: rotate(-90deg);
}

/* You can add more styling for icon size, colors, or hover effects */
</style>
