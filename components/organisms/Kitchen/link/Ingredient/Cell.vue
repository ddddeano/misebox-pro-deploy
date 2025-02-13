<template>
  <div class="cell kitchen-link-ingredient-cell">
    <NuxtLink 
      v-if="localIngredient && localIngredient.id"
      :to="isDisabled ? null : `/ingredients/${localIngredient.id}`" 
      class="cell-main"
    >
      <div class="image-wrapper">
        <MoleculesProfileAvatar
          v-if="localIngredient.image_url"
          :url="localIngredient.image_url"
          size="small"
          altText="Ingredient Image"
          class="main-avatar"
        />
      </div>
      <div class="cell-content">
        <span class="display-name" v-if="localIngredient.name">
          {{ localIngredient.name }}
        </span>
        <span class="handle" v-if="localIngredient.category">
          {{ localIngredient.category }}
        </span>
      </div>
    </NuxtLink>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script setup>
import { watchEffect, ref } from 'vue';

const { fetchIngredient } = useIngredient();

const props = defineProps({
  ingredient: {
    type: [Object, Number, String],
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

const localIngredient = ref({
  name: 'Loading...',
  image_url: '',
  category: ''
});

const fetchedIngredient = ref(null); // Will store the fetched ref

if (typeof props.ingredient === 'object' && props.ingredient !== null && props.ingredient.id) {
  console.log("Using provided ingredient object:", props.ingredient);
  localIngredient.value = props.ingredient;
} else {
  const id = String(props.ingredient);
  console.log("Fetching ingredient with ID:", id);
  fetchedIngredient.value = fetchIngredient(id); // Stores the VueFire ref
}

// 🛠 Watch the VueFire ref and update when it resolves
watchEffect(() => {
  if (fetchedIngredient.value?.value) {
    console.log("Fetched ingredient result:", fetchedIngredient.value.value);
    localIngredient.value = fetchedIngredient.value.value;
  }
});
</script>
