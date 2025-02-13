<template>
  <div class="entity-create">
    <section class="creation-section">
      <OrganismsIngredientSearch
        v-model="ingredient.name"
        @select-ingredient="handleSelection"
        @no-results="handleNoResults"
      />
    </section>
    <section class="button-section" v-if="showButton">
      <button class="btn" @click="handleSelection(null)">
        Add {{ ingredient.name }}
      </button>
    </section>
    <!-- Display global ingredients retrieved from Firestore (for debugging/reference) -->
    <div class="global-ingredients" v-if="globalIngredients && globalIngredients.length">
      <h3>Global Ingredients</h3>
      <ul>
        <li v-for="g in globalIngredients" :key="g.id">
          {{ g.name }} - Tags: {{ g.tags ? g.tags.join(', ') : '' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const { processIngredient } = useIngredient();
const ingredient = ref({ name: '' });
const noResults = ref(false);

function handleNoResults(val) {
  noResults.value = val;
}

async function handleSelection(result) {
  let ingredientId;
  if (result) {
    ingredientId = await processIngredient(result);
  } else {
    ingredientId = await processIngredient(ingredient.value);
  }
  router.push(`/ingredients/${ingredientId}`);
}

const showButton = computed(() => {
  return noResults.value && ingredient.value.name.trim().length > 0;
});

// Retrieve global ingredients from Firestore using your composable.
const { ingredientsCollection } = useIngredient();
const globalIngredients = ingredientsCollection();
</script>

<style scoped>
.entity-create {
  padding: 16px;
}
.button-section {
  margin-top: 16px;
}
.global-ingredients {
  margin-top: 16px;
}
.global-ingredients ul {
  list-style: none;
  padding: 0;
}
.global-ingredients li {
  padding: 4px 0;
}
</style>
