<!-- components/molecules/forms/SingleFieldLocal.vue -->
<template>
  <div class="form-field-local">
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="editable-input"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: false },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
});
</script>

<style scoped>
.form-field-local {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
}
</style>
