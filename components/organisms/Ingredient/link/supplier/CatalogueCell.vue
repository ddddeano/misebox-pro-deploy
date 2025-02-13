<!-- components/organisms/Ingredient/link/supplier/CatalogueCell.vue -->
<template>
  <div class="cell">
    <p class="ingredient-name">{{ ingredient.name }}</p>
    <!-- Remove Button -->
    <button class="btn" @click="removeFromSupplier">Remove</button>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
});

// Dependencies
const { removeSupplierSubcollectionItem } = useSupplier();

// Remove ingredient from the supplier's catalog
const removeFromSupplier = async () => {
  try {
    await removeSupplierSubcollectionItem(props.supplierId, "catalog", props.ingredient.id);
    console.log(`Ingredient "${props.ingredient.name}" removed successfully.`);
  } catch (error) {
    console.error(`Error removing ingredient "${props.ingredient.name}":`, error.message);
  }
};
</script>
