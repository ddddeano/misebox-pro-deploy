<!-- pages/chefs/dashboard/chef-recipes.vue -->
<!-- pages/chefs/[id]/recipe/index.vue -->
<template>
  <div class="recipe-index-page">
    <h1>Recipes</h1>
    <ul class="recipe-list">
      <li v-for="recipe in recipes" :key="recipe.id">
        <NuxtLink :to="`/chefs/${route.params.id}/recipe/${recipe.id}`">{{ recipe.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const recipes = ref([])

onMounted(() => {
  // Fetch the list of recipes for the chef
  fetchChefRecipes()
})

const fetchChefRecipes = async () => {
  // Fetch the recipes from Firestore or another source
  // and assign them to the recipes array
}
</script>

<style scoped>
.recipe-index-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-m);
}

h1 {
  margin-bottom: var(--spacing-m);
}

.recipe-list {
  list-style: none;
  padding: 0;
}

.recipe-list li {
  margin-bottom: var(--spacing-s);
}

.recipe-list a {
  text-decoration: none;
  color: #007bff;
}

.recipe-list a:hover {
  text-decoration: underline;
}
</style>
