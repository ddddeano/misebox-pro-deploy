<template>
  <div class="module">
    <div class="left">
      <h2>Kitchen Ingredients</h2>
      <ul>
        <li v-for="cat in categories" :key="cat">
          <!-- Use MoleculesButtonsTopChevronBar -->
          <MoleculesButtonsTopChevronBar 
            :label="cat" 
            :isFolded="categoryFolded[cat]" 
            @toggle="toggle(cat)" 
          />
          <!-- Expanded list of ingredients for this category -->
          <ul v-if="!categoryFolded[cat]">
            <li v-for="ingredient in groupedIngredients[cat]" :key="ingredient.globalIngredientId">
              <OrganismsKitchenLinkIngredientCell 
                :ingredient="ingredient.id" 
                :isDisabled="false" 
                @click="addToOrder(ingredient)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="right">
      <h2>Stock Order</h2>
      <ul v-if="order.length">
     kitchenOrders
      </ul>
      <p v-else>No ingredients selected.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { useKitchenIngredientsCollection } = useKitchen();
const kitchenId = route.params.kitchenId;

// ✅ Use the real-time Firestore collection
const kitchenIngredients = useKitchenIngredientsCollection(kitchenId);

// Order list (tracks selected ingredients)

// Function to add an ingredient to the order
const addToOrder = (ingredient) => {

};

// Compute unique categories from the kitchenIngredients collection.
const categories = computed(() => {
  const allCats = kitchenIngredients.value
    .map((ingredient) => ingredient.category)
    .filter((category) => category != null && category !== "");
  return Array.from(new Set(allCats));
});

// Group ingredients by category.
const groupedIngredients = computed(() => {
  const groups = {};
  kitchenIngredients.value.forEach((ingredient) => {
    const cat = ingredient.category;
    if (!cat) return;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(ingredient);
  });
  return groups;
});

// Maintain toggle state for each category dropdown.
const categoryFolded = reactive({});
watch(
  categories,
  (newCats) => {
    newCats.forEach((cat) => {
      if (categoryFolded[cat] === undefined) {
        categoryFolded[cat] = true;
      }
    });
  },
  { immediate: true }
);

// Toggle function for a given category.
const toggle = (cat) => {
  categoryFolded[cat] = !categoryFolded[cat];
};
</script>

<style lang="scss" scoped>
.module {
  display: flex;
  gap: var(--spacing-m);
}

/* Left Side: Kitchen Ingredients */
.left {
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: var(--background);
  padding: var(--spacing-m);
  border-radius: var(--radius-m);
}

/* Right Side: Stock Management */
.right {
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: var(--background-strong);
  padding: var(--spacing-m);
  border-radius: var(--radius-m);
}
</style>
