<template>
  <div class="menu-meta-form">
    <div class="form-group">
      <input
        id="menuName"
        v-model="localMeta.name"
        placeholder="Enter menu name (e.g. Main Menu, Lunch Menu, Paul & Kylie's Wedding, Today's Specials)"
        required
        class="editable-input"
      />
    </div>
    <div class="form-group">
      <textarea
        id="menuDescription"
        v-model="localMeta.description"
        placeholder="Enter menu description"
        class="editable-input"
      ></textarea>
    </div>
    <div class="form-group">
      <label>
        <input type="radio" value="daily" v-model="localMeta.frequency" />
        Daily Menu
      </label>
      <label>
        <input type="radio" value="special" v-model="localMeta.frequency" />
        Special Menu
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      name: "",
      description: "",
      frequency: "daily",
    }),
  },
});
const emit = defineEmits(["update:modelValue"]);

import { reactive, watch } from "vue";
const localMeta = reactive({ ...props.modelValue });

// Emit updates to parent whenever localMeta changes.
watch(localMeta, (newVal) => {
  emit("update:modelValue", newVal);
}, { deep: true });
</script>
