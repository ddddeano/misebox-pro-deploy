<!-- components/organisms/Ingredient/link/Chef.vue -->
<template>
  <div v-if="chefIngredients" class="add-ingredient">
    <h2>Chef Ingredients</h2>
    <ul v-if="chefIngredients?.length">
      <li v-for="ingredient in chefIngredients" :key="ingredient.id">
        {{ ingredient.name }}
      </li>
    </ul>
    <p v-else>No ingredients found for this chef.</p>

    <!-- Button to Add Ingredient -->
    <button @click="addIngredientToChef">Add Ingredient to Chef</button>

    <!-- Debugging Data -->
    <h3>Debug Info</h3>
    <pre>{{ chefIngredients }}</pre>
  </div>
</template>

<script setup>
import { useFirestore, useCollection, useCurrentUser } from "vuefire";
import { collection, doc, setDoc } from "firebase/firestore";

// Props
const props = defineProps({
  ingredient: {
    type: Object,
    required: true, // Ensure ingredient is passed
  },
});

// Firebase setup
const db = useFirestore();
const currentUser = useCurrentUser();

// Reference to the chef's ingredients subcollection
const chefIngredientsRef = computed(() =>
  currentUser.value ? collection(db, `chefs/${currentUser.value.uid}/ingredients`) : null
);

// Reactive collection of ingredients
const { data: chefIngredients } = useCollection(chefIngredientsRef);

// Function to add ingredient to chef's subcollection
async function addIngredientToChef() {
  if (!currentUser.value) {
    alert("You must be logged in to add an ingredient.");
    return;
  }

  try {
    const ingredientToAdd = { id: props.ingredient.id, name: props.ingredient.name }; // Use passed ingredient data
    const ingredientRef = doc(
      db,
      `chefs/${currentUser.value.uid}/ingredients`,
      ingredientToAdd.id
    );
    await setDoc(ingredientRef, ingredientToAdd);

    alert(`Ingredient "${ingredientToAdd.name}" added to chef successfully!`);
  } catch (error) {
    console.error("Error adding ingredient to chef:", error);
    alert("Failed to add ingredient to chef.");
  }
}
</script>

<style scoped>
.add-ingredient {
  margin-bottom: 20px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #4b47a6;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
  font-size: 16px;
}

pre {
  background: orange;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
