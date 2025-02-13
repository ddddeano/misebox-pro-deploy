<!-- components/molecules/SelectedItem.vue -->
<template>
  <div class="selected-item">
    <span>{{ value }}</span>
    <XCircleIcon
      class="icon clear-icon"
      @click="clearItem"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['clear'])

const clearItem = () => {
  emit('clear')
}
</script>

<style scoped>
.selected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.icon {
  cursor: pointer;
  color: red;
}
</style>
