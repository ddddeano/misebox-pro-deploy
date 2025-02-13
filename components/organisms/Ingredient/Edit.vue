<template>
  <client-only>
    <div v-if="ingredient" class="edit-profile">
      <!-- Avatar Selection -->
      <MoleculesFormsFirestoreImageSelection
        :item="ingredient"
        collectionName="ingredients"
      />

      <!-- Ingredient Name -->
      <MoleculesFormsFirestoreSingle
        label="Ingredient Name"
        collectionName="ingredients"
        target="name"
        :documentID="ingredient.id"
        :firebaseValue="ingredient.name"
        placeholder="Enter ingredient name"
      />

      <!-- Tags Editing -->
      <MoleculesFormsFirestoreTags
        label="Tags"
        collectionName="ingredients"
        target="tags"
        :firebaseValue="ingredient.tags"
        placeholder="Enter tags"
        :documentID="ingredient.id"
      />

      <!-- Category Selection -->
      <MoleculesFormsFirestoreDropdown
        label="Category"
        collectionName="ingredients"
        target="category"
        :documentID="ingredient.id"
        :firebaseValue="ingredient.category"
        placeholder="Select category"
      />
    </div>

    <div v-else class="loading-container">
      <p>Loading ingredient...</p>
    </div>
  </client-only>
</template>

<script setup>
defineProps({
  ingredient: {
    type: Object,
    required: true,
    default: () => ({})
  }
});
</script>

<style scoped>
.edit-view {
  padding: var(--spacing-m);
}
.loading-container {
  padding: var(--spacing-m);
}
</style>
