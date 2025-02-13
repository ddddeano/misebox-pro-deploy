<template>
  <div class="menu-items-form">
    <h5>Menu Items</h5>
    <div v-for="(item, index) in items" :key="index" class="menu-item">
      <input
        v-model="item.name"
        placeholder="Item name (e.g. Burger)"
        required
        class="editable-input"
      />
      <button type="button" class="btn btn-small btn-remove" @click="removeItem(index)">
        ❌
      </button>
    </div>
    <button type="button" class="btn btn-outline" @click="addItem">
      Add Item
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

import { ref, watch } from "vue";
const items = ref([...props.modelValue]);

const addItem = () => {
  items.value.push({ name: "" });
};

const removeItem = (index) => {
  items.value.splice(index, 1);
};

watch(items, (newVal) => {
  emit("update:modelValue", newVal);
}, { deep: true });
</script>
