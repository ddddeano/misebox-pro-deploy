<!-- components/organisms/Ingredient/Dashboard.vue -->
<template>
  <div class="ingredient-dashboard">
    <header>
      <h1>Ingredient Dashboard</h1>
      <p>Manage your ingredient lists and associated data.</p>
    </header>

    <section v-if="miseboxUser && ingredients">
      <p><strong>User:</strong> {{ miseboxUser.display_name }}</p>
      <p><strong>Total Ingredients:</strong> {{ ingredients?.length || 0 }}</p>
    </section>

    <nav>
      <ul>
        <li>
          <router-link :to="`/ingredients`">View All Ingredients</router-link>
        </li>
        <li>
          <router-link :to="`/ingredients`">Add New Ingredient</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { ingredientsCollection: ingredients } = useIngredient();
</script>
