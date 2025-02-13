<!-- components/organisms/Chef/Recipe/RecipeForm.vue -->
<template>
  <div class="recipe-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'">
      <strong>{{ recipe.name }}</strong>
      <p><strong>Ingredients:</strong> {{ recipe.ingredients }}</p>
      <p><strong>Preparation Steps:</strong> {{ recipe.steps }}</p>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'">
      <ul>
        <li><strong>Recipe Name:</strong> {{ recipe.name }}</li>
        <li><strong>Ingredients:</strong> {{ recipe.ingredients }}</li>
        <li><strong>Steps:</strong> {{ recipe.steps }}</li>
      </ul>
      <!-- Editing Inputs -->
      <div class="input-fields">
        <label>Recipe Name</label>
        <input v-model="recipe.name" type="text" placeholder="Enter recipe name" />
        <label>Ingredients</label>
        <textarea v-model="recipe.ingredients" placeholder="Enter ingredients"></textarea>
        <label>Preparation Steps</label>
        <textarea v-model="recipe.steps" placeholder="Enter steps"></textarea>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'">
      <label>Recipe Name</label>
      <input v-model="recipe.name" type="text" placeholder="Enter recipe name" />
      <label>Ingredients</label>
      <textarea v-model="recipe.ingredients" placeholder="Enter ingredients"></textarea>
      <label>Preparation Steps</label>
      <textarea v-model="recipe.steps" placeholder="Enter steps"></textarea>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  recipe: {
    type: Object,
    required: false,
    default: () => ({
      name: '',
      ingredients: '',
      steps: ''
    })
  },
  mode: {
    type: String,
    default: 'display' // Modes: 'display', 'edit', 'create'
  }
})
</script>

<style scoped>
.recipe-form {
  margin-bottom: var(--spacing-m);
}

.input-fields {
  margin-top: var(--spacing-m);
}

.recipe-form strong {
  font-size: 1.1rem;
}

.recipe-form textarea,
.recipe-form input {
  width: 100%;
  margin-bottom: var(--spacing-s);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-m);
}
</style>
