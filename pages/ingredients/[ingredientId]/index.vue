<template>
  <client-only>
    <div class="page">
      <MoleculesNavigationBreadcrumbs
        v-if="ingredient"
        baseName="Ingredients"
        basePath="/ingredients"
        :entityId="ingredient?.id"
        :entityName="ingredient?.name"
      />
      <NuxtLink v-if="ingredient" :to="`/ingredients/${ingredient.id}/edit`" class="icon-btn">
        <Cog6ToothIcon class="icon" />
        <span>Edit</span>
      </NuxtLink>
      <OrganismsIngredientView v-if="ingredient" :ingredient="ingredient" />
    </div>
  </client-only>
</template>

<script setup>
const route = useRoute();
const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(route.params.ingredientId);
</script>
