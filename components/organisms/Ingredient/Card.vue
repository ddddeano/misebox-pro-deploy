<!-- components/organisms/Ingredient/Card.vue -->
<template>
  <div class="card ingredient-card" v-if="ingredient && ingredient.id">
    <NuxtLink :to="`/ingredients/${ingredient.id}`" class="card-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="ingredient.image_url"
          :url="ingredient.image_url"
          size="small"
          altText="Ingredient Image"
          class="main-avatar"
        />
      </div>
      <div class="card-content">
        <span class="display-name">
          {{ ingredient.name || 'Unnamed Ingredient' }}
        </span>
        <span class="handle">
          {{ ingredient.type }}
        </span>
      </div>
    </NuxtLink>
    <div class="card-footer">
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>
