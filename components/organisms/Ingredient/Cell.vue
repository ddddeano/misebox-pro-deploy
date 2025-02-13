<!-- components/organisms/Ingredient/Cell.vue -->
<template>
  <div class="cell" v-if="ingredient && ingredient.id">
    <NuxtLink :to="route" class="cell-main">
      <div class="image-wrapper">
        <MoleculesProfileImage
          v-if="ingredient.image_url"
          :url="ingredient.image_url"
          size="small"
          altText="Ingredient Image"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name" v-if="ingredient.name">
          {{ ingredient.name }}
        </span>
        <span class="handle" v-if="ingredient.category">
          {{ ingredient.category }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const route = computed(() =>
  props.isDisabled ? null : `/ingredients/${props.ingredient.id}`
);
</script>
