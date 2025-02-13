<!-- components/organisms/Chef/Recipe/MiseEnPlace.vue -->
<template>
  <div class="recipe-mise-en-place">
    <h2>Mise en Place</h2>
    <div
      v-for="(item, index) in localMiseEnPlace"
      :key="item.id"
      class="mise-en-place-item"
    >
      <input
        type="text"
        v-model="item.task"
        placeholder="Task Description"
        class="form-control"
      />
      <input
        type="number"
        v-model.number="item.estimatedTime"
        placeholder="Estimated Time (min)"
        class="form-control"
      />
      <button @click="removeItem(index)" class="btn btn-danger btn-sm">Remove</button>
    </div>
    <button @click="addItem" class="btn btn-secondary btn-sm">Add Mise en Place Task</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  miseEnPlace: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(['update-mise-en-place']);

const localMiseEnPlace = reactive([...props.miseEnPlace]);

watch(
  () => localMiseEnPlace,
  (newVal) => {
    emits('update-mise-en-place', newVal);
  },
  { deep: true }
);

const addItem = () => {
  localMiseEnPlace.push({
    id: Date.now().toString(),
    task: '',
    estimatedTime: null,
  });
};

const removeItem = (index) => {
  localMiseEnPlace.splice(index, 1);
};

if (localMiseEnPlace.length === 0) {
  addItem();
}
</script>

<style scoped>
.recipe-mise-en-place {
  margin-bottom: 1.5rem;
}

.mise-en-place-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.form-control {
  flex: 1;
}

.btn {
  margin-left: 0.5rem;
}
</style>
