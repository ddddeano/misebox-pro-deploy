
// ============================
// pages/ingredients/[ingredientId]/dashboard.vue
// ============================

<!-- pages/ingredients/[ingredientId]/dashbaord.vue -->
<!-- pages/ingredients/[id]/dashbaord.vue -->
<!-- ============================
pages/ingredients/[id]/dashboard.vue
============================ -->

<template>
  <client-only>
    <OrganismsIngredientDashboard
      v-if="ingredient"
      :ingredient="ingredient"
    />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(route.params.id);
</script>


// ============================
// pages/ingredients/[ingredientId]/edit.vue
// ============================

<!-- pages/ingredients/[ingredientId]/edit.vue -->
<template>
  <client-only>   
      <OrganismsIngredientEdit v-if="ingredient" :ingredient="ingredient" />
  </client-only>
</template>

<script setup>
const route = useRoute()
const { fetchIngredient } = useIngredient()
const ingredient = fetchIngredient(route.params.ingredientId)
</script>


// ============================
// pages/ingredients/[ingredientId]/index.vue
// ============================

<!-- pages/ingredients/[ingredientId]/index.vue -->
<template>
  <client-only>
    <div class="page" v-if="ingredient">
            <NuxtLink  :to="`/ingredients/${ingredient.id}/edit`" class="icon-btn">
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
      <OrganismsIngredientView v-if="ingredient" :ingredient="ingredient" />
    </div>
  </client-only>
</template>

<script setup>
const route = useRoute()
const { fetchIngredient } = useIngredient()
const ingredient = fetchIngredient(route.params.ingredientId)
</script>


// ============================
// pages/ingredients/create.vue
// ============================

<!-- pages/ingredients/create.vue -->
<template>
  <client-only>
    <div class="page">
      <!-- Ensure access control via Ingredient CTA -->
      <OrganismsIngredientCTA />

      <!-- Show ingredient creation form if user is authorized -->
      <OrganismsIngredientCreate v-if="chef || supplier" />
    </div>
  </client-only>
</template>

<script setup>

const { currentChef: chef } = useChef();
const { currentSupplier: supplier } = useSupplier();
</script>


// ============================
// pages/ingredients/index.vue
// ============================

<!-- pages/ingredients/index.vue -->
<template>
  <client-only>
    <div class="page">
      <OrganismsIngredientCTA />
      <OrganismsIngredientList />
    </div>
  </client-only>
</template>

