<!-- components/organisms/Ingredient/List.vue -->
<template>
  <div class="list">
    <template v-if="ingredients?.length">
      <div
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="list-item"
      >
        <OrganismsIngredientCell :ingredient="ingredient" />
      </div>
      <pre>{{ ingredients }}</pre>
    </template>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
const { ingredientsCollection } = useIngredient();
const ingredients = ingredientsCollection();
</script>
