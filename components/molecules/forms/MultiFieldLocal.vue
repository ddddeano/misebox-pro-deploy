<!-- components/molecules/forms/MultiFieldLocal.vue -->
<template>
  <div class="form-field">
    <label>{{ label }}</label>
    <div class="input-group">
      <div
        v-for="(placeholder, key) in placeholders"
        :key="key"
        class="input-wrapper"
      >
        <input
          v-model="localValue[key]"
          :placeholder="placeholder"
          class="editable-input"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Object,
    default: () => ({}),
  },
  placeholders: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:value']);

const localValue = ref({ ...props.value });

watch(localValue, (newValue) => {
  emit('update:value', newValue);
});
</script>

<style scoped>
.form-field {
  padding: var(--spacing-s);
  border-radius: var(--radius-s);
}
</style>
