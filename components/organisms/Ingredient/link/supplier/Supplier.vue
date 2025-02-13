<!-- components/organisms/Ingredient/link/supplier/Supplier.vue -->
<template>
  <client-only>
    <NuxtLink 
      :to="`/suppliers/${currentUser?.uid}`" 
      class="link supplier-ingredient"
    >
      <OrganismsSupplierCard isDisabled="true" />
    </NuxtLink>

      <OrganismsIngredientCell :ingredient="ingredient" isDisabled="true" />
      <button class="btn" @click.stop.prevent="addToSupplier">Add to Supplier</button>

      <!-- Supplier Catalogue Component -->
      <OrganismsIngredientLinkSupplierCatalogue :supplier-id="supplier?.id" />
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();

const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
})

// Dependencies
const { currentSupplier: supplier, addIngredientToSupplier } = useSupplier()

// Add ingredient to supplier's catalog
const addToSupplier = async () => {
  if (!supplier?.id) {
    console.warn('Supplier data is not ready yet.')
    return
  }

  try {
    await addIngredientToSupplier({
      id: props.ingredient.id,
      name: props.ingredient.name,
    })
  } catch (error) {
    console.error('Failed to add ingredient to supplier:', error.message)
  }
}
</script>

<style scoped>
.link.supplier-ingredient {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-decoration: none;
}
</style>
