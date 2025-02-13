<!-- components/organisms/Supplier/link/Ingredient/Cell.vue -->
<template>
  <div v-if="ingredient" class="cell">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="ingredient.image_url"
          :url="ingredient.image_url"
          size="small"
          :altText="ingredient.name"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name">{{ ingredient.name }}</span>
        <span class="handle">{{ ingredient.category || "Uncategorized" }}</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  id: { type: String, required: true },
  isDisabled: { type: Boolean, default: false }
});
const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(props.id);
const route = computed(() => props.isDisabled ? null : `/ingredients/${ingredient.id}`);
</script>
