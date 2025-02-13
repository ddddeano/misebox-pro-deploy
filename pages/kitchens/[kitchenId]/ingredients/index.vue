<!-- pages/kitchens/[kitchenId]/ingredients/index.vue -->
<!-- pages/kitchens/[id]/ingredients/index.vue -->
<template>
  <client-only>
    <div class="ingredients-index">
      <h1>Ingredients for {{ kitchenId }}</h1>
      <ul>
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-item">
          <NuxtLink
            :to="`/kitchens/${kitchenId}/ingredients/${ingredient.id}`"
            class="ingredient-link"
          >
            {{ ingredient.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Add Ingredient Form -->
      <form @submit.prevent="addIngredient">
        <input
          v-model="newIngredient"
          placeholder="Enter new ingredient"
          required
          class="ingredient-input"
        />
        <button type="submit" class="btn btn-primary">Add Ingredient</button>
      </form>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCollection, useFirestore, useCurrentUser } from 'vuefire';
import { collection, addDoc } from 'firebase/firestore';

const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

const kitchenId = route.params.id;

// Ingredients collection reference (with currentUser check)
const ingredientsCollectionRef = computed(() =>
  currentUser.value ? collection(db, `kitchens/${kitchenId}/ingredients`) : null
);

// Fetch ingredients from the collection
const { data: ingredients } = useCollection(ingredientsCollectionRef);

const newIngredient = ref('');

const addIngredient = async () => {
  if (!ingredientsCollectionRef.value) {
    alert('You must be logged in to add ingredients.');
    return;
  }

  if (!newIngredient.value.trim()) return;
  try {
    await addDoc(ingredientsCollectionRef.value, { name: newIngredient.value.trim(), status: 'available' });
    newIngredient.value = '';
  } catch (error) {
    console.error('Error adding ingredient:', error);
    alert('Failed to add ingredient. Please try again.');
  }
};
</script>

