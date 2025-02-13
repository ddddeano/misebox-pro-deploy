<!-- components/molecules/forms/Flyout.vue -->
<!-- components/molecules/Flyout.vue -->
<template>
  <div class="flyout">
    <ul>
      <li v-for="option in options" :key="option" @click="select(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  options: Array
});

const emit = defineEmits(['select']);

const select = (option) => {
  emit('select', option);
};
</script>

<style scoped>
.flyout {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
  width: auto;
  max-width: 100%;
  z-index: 9999;
}

.flyout ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.flyout li {
  padding: 8px;
  cursor: pointer;
  white-space: nowrap;
}

.flyout li:hover {
  background-color: var(--hover-color);
  color: var(--text-color-inverse);
}
</style>
