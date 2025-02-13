<template>
  <div class="ingredient-search">
    <input
      type="text"
      v-model="localQuery"
      @input="handleInput"
      placeholder="Search for an ingredient..."
      class="editable-input"
    />
    <transition name="dropdown-transition">
      <div class="dropdown" v-if="searchResults.length > 0">
        <div
          v-for="result in searchResults"
          :key="result.id"
          @click="handleSelectIngredient(result)"
          class="ingredient-cell-wrapper"
        >
          <OrganismsIngredientCell :ingredient="result" :isDisabled="true" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props for v-model support
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
const emits = defineEmits(['update:modelValue', 'select-ingredient', 'no-results']);

// Local query is bound to the parent's v-model.
const localQuery = ref(props.modelValue);

// Import our Firestore search functions from our composable.
const { searchResults, searchFirestore, clearSearch } = useIngredientSearch();

// When localQuery changes, update the parent and perform a search if length >= 3.
watch(localQuery, async (newVal) => {
  emits('update:modelValue', newVal);
  if (newVal.length >= 3) {
    await performSearch();
    emits('no-results', searchResults.value.length === 0);
  } else {
    emits('no-results', false);
  }
});

// Trigger search on input.
const handleInput = async () => {
  await performSearch();
};

// Perform the Firestore search using our composable.
const performSearch = async () => {
  await searchFirestore(localQuery.value);
};

// When an ingredient is selected, emit the selection and clear results.
const handleSelectIngredient = (ingredient) => {
  emits('select-ingredient', ingredient);
  clearSearch();
};
</script>
