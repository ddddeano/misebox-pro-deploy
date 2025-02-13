<template>
  <div class="entity-create">
    <section class="creation-section">
      <!-- Re-use the global search component -->
      <OrganismsIngredientSearch
        v-model="ingredient.name"
        @select-ingredient="handleSelection"
        @no-results="handleNoResults"
      />
    </section>
    <section class="button-section" v-if="showButton">
      <button class="btn" @click="handleSelection(null)">
        Add {{ ingredient.name }} to Inventory
      </button>
    </section>
  </div>
</template>

<script setup>
const { processIngredient } = useIngredient();
const { addKitchenIngredient} = useKitchen()
const route = useRoute()
const kitchenId = route.params.kitchenId

// Reactive state for the ingredient input
const ingredient = ref({ name: '' })
const noResults = ref(false)

function handleNoResults(val) {
  noResults.value = val
}

async function handleSelection(result) {
  let ingredientId
  if (result) {
    ingredientId = await processIngredient(result)
  } else {
    ingredientId = await processIngredient(ingredient.value)
  }
  
  console.log(`Processed ingredient with id: ${ingredientId}`)
  
  await addKitchenIngredient({
    kitchenId,
    globalIngredientId: ingredientId,
    quantity: 0, 
  })
  
  console.log(`Ingredient ${ingredientId} added to kitchen inventory for kitchen ${kitchenId}`)
  ingredient.value.name = ''
  noResults.value = false
}

const showButton = computed(() => noResults.value && ingredient.value.name.trim().length > 0)
</script>

<style scoped>
.entity-create {
  padding: 16px;
}
.button-section {
  margin-top: 16px;
}
</style>
