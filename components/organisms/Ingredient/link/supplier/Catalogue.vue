<!-- components/organisms/Ingredient/link/supplier/Catalogue.vue -->
<template>
  <div class="supplier-catalogue">
    <h3>Supplier Catalog</h3>
    <ul v-if="catalog?.length">
      <li v-for="item in catalog" :key="item.id">
        <OrganismsIngredientLinkSupplierCatalogueCell 
          :ingredient="item" 
          :supplier-id="supplierId" 
        />
      </li>
    </ul>
    <p v-else>No ingredients in the catalog yet.</p>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  supplierId: {
    type: String,
    required: true,
  },
});

// Dependencies
const { fetchSupplierCatalog } = useSupplier();

// Reactive catalog fetch
const catalog = fetchSupplierCatalog(props.supplierId);
</script>

<style scoped>
.supplier-catalogue {
  width: 100%;
}
</style>
