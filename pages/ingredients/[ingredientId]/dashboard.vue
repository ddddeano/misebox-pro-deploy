<template>
  <client-only>
    <div class="page">
      <MoleculesNavigationBreadcrumbs
        v-if="ingredient"
        baseName="Ingredients"
        basePath="/ingredients"
        :entityId="ingredient.id"
        :entityName="ingredient.name"
      />
      <OrganismsIngredientDashboard v-if="ingredient" :ingredient="ingredient" />
    </div>
  </client-only>
</template>

<script setup>
const route = useRoute();
const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(route.params.ingredientId);
</script>
