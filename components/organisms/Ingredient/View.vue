<!-- components/organisms/Ingredient/View.vue -->
<template>
  <client-only>
    <div v-if="ingredient" class="view-container">
      <!-- Ingredient Image -->
      <div class="ingredient-image">
        <img :src="ingredient.image_url" :alt="ingredient.name" />
      </div>

      <!-- Ingredient Details -->
      <div class="ingredient-details">
        <h2 class="ingredient-name">{{ ingredient.name }}</h2>

        <!-- Tags -->
        <div v-if="ingredient.tags?.length" class="ingredient-tags">
          <span v-for="tag in ingredient.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>

        <!-- Created By -->
        <div class="created-by">
          <img :src="ingredient.created_by.avatar" alt="Created By" class="avatar" />
          <span>Added by {{ ingredient.created_by.id }}</span>
        </div>
      </div>
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
  },
});
</script>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-m);
  text-align: center;
}

/* 🔹 Ingredient Image */
.ingredient-image img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-xs);
}

/* 🔹 Ingredient Name */
.ingredient-name {
  margin-top: var(--spacing-m);
  font-size: var(--font-size-xl);
  font-weight: bold;
}

/* 🔹 Tags */
.ingredient-tags {
  margin-top: var(--spacing-s);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  justify-content: center;
}

.tag {
  background: var(--background-2);
  padding: var(--spacing-xxs) var(--spacing-s);
  border-radius: var(--radius-s);
  font-size: var(--font-size-m);
  font-weight: bold;
}

/* 🔹 Created By */
.created-by {
  display: flex;
  align-items: center;
  margin-top: var(--spacing-m);
  gap: var(--spacing-s);
  font-size: var(--font-size-m);
  color: var(--text-secondary);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: var(--shadow-xs);
}

/* 🔹 Loading State */
.loading-container {
  text-align: center;
  padding: var(--spacing-m);
}
</style>
