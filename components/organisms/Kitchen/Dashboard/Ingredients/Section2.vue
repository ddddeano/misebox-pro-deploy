<template>
  <div class="module">
    <h2>Global Ingredients</h2>
    <OrganismsKitchenDashboardIngredientsAdd />

    <h2>Global Ingredients</h2>
    <div v-for="ingredient in globalIngredients" :key="ingredient.id">
      <OrganismsKitchenLinkIngredientCell 
        :ingredient="ingredient" 
        :isDisabled="true" 
        @click="addIngredientToKitchen(ingredient)" 
      />
    </div>

    <h2>Kitchen Ingredients</h2>
    <div v-for="ingredient in kitchenIngredients" :key="ingredient.id">
      <OrganismsKitchenLinkIngredientCell :ingredient="ingredient.id" :isDisabled="false" />
      <div class="toolbar">
        <button class="btn" @click="removeIngredientFromKitchen(ingredient.id)">❌ Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const { ingredientsCollection } = useIngredient();
const { useKitchenIngredientsCollection, addKitchenIngredient, removeKitchenIngredient } = useKitchenIngredients();

const globalIngredients = ingredientsCollection();
const kitchenId = route.params.kitchenId;

// ✅ Use the real-time Firestore collection
const kitchenIngredients = useKitchenIngredientsCollection(kitchenId);

// ✅ Add an ingredient reactively with category info
const addIngredientToKitchen = async (ingredient) => {
  // Pass the globalIngredientId along with category info from the global ingredient object
  await addKitchenIngredient({
    kitchenId,
    ingredient
  });
};

// ✅ Remove an ingredient reactively
const removeIngredientFromKitchen = async (ingredientId) => {
  await removeKitchenIngredient(kitchenId, ingredientId);
};
</script>
