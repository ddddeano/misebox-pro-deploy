<!-- components/organisms/Chef/Recipe/Ingredients.vue -->
<template>
  <div class="recipe-ingredients">
    <h2>Ingredients</h2>
    <div
      v-for="(ingredient, index) in localIngredients"
      :key="ingredient.id"
      class="ingredient-item"
    >
      <input
        type="text"
        v-model="ingredient.name"
        placeholder="Ingredient Name"
        class="form-control"
      />
      <input
        type="number"
        v-model.number="ingredient.quantity"
        placeholder="Quantity"
        class="form-control"
      />
      <select v-model="ingredient.unit" class="form-control">
        <option disabled value="">Unit</option>
        <option v-for="unit in units" :key="unit" :value="unit">
          {{ unit }}
        </option>
      </select>
      <button @click="removeIngredient(index)" class="btn btn-danger btn-sm">Remove</button>
    </div>
    <button @click="addIngredient" class="btn btn-secondary btn-sm">Add Ingredient</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  ingredients: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(['update-ingredients']);

const localIngredients = reactive([...props.ingredients]);

watch(
  () => localIngredients,
  (newVal) => {
    emits('update-ingredients', newVal);
  },
  { deep: true }
);

const units = ['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'oz', 'lb'];

const addIngredient = () => {
  localIngredients.push({
    id: Date.now().toString(),
    name: '',
    quantity: null,
    unit: '',
  });
};

const removeIngredient = (index) => {
  localIngredients.splice(index, 1);
};

if (localIngredients.length === 0) {
  addIngredient();
}
</script>

<style scoped>
.recipe-ingredients {
  margin-bottom: 1.5rem;
}

.ingredient-item {
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
