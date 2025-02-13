<!-- components/organisms/Chef/Recipe/Instructions.vue -->
<template>
  <div class="recipe-instructions">
    <h2>Instructions</h2>
    <div
      v-for="(step, index) in localInstructions"
      :key="step.id"
      class="instruction-step"
    >
      <label>Step {{ index + 1 }}</label>
      <textarea
        v-model="step.description"
        placeholder="Step Description"
        class="form-control step-description"
      ></textarea>
      <input
        type="number"
        v-model.number="step.duration"
        placeholder="Duration (min)"
        class="form-control step-duration"
      />
      <button @click="removeStep(index)" class="btn btn-danger btn-sm">Remove</button>
    </div>
    <button @click="addStep" class="btn btn-secondary btn-sm">Add Instruction Step</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  instructions: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(['update-instructions']);

const localInstructions = reactive([...props.instructions]);

watch(
  () => localInstructions,
  (newVal) => {
    newVal.forEach((step, index) => {
      step.stepNumber = index + 1;
    });
    emits('update-instructions', newVal);
  },
  { deep: true }
);

const addStep = () => {
  localInstructions.push({
    id: Date.now().toString(),
    stepNumber: localInstructions.length + 1,
    description: '',
    duration: null,
  });
};

const removeStep = (index) => {
  localInstructions.splice(index, 1);
};

if (localInstructions.length === 0) {
  addStep();
}
</script>

<style scoped>
.recipe-instructions {
  margin-bottom: 1.5rem;
}

.instruction-step {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  margin-bottom: 0.5rem;
}

.btn {
  margin-top: 0.5rem;
}
</style>
