<!-- pages/kitchens/[kitchenId]/ingredients/[ingredientId].vue -->
<!-- pages/kitchens/[id]/ingredients/[ingredientId].vue -->
<!-- components/organisms/Kitchen/ingredients/[ingredientId].vue -->
<template>
  <div class="ingredient-edit">
    <h2>Edit Ingredient</h2>
    <form @submit.prevent="saveChanges">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="ingredient.name" type="text" class="form-input" />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input id="category" v-model="ingredient.category" type="text" class="form-input" />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input id="quantity" v-model="ingredient.quantity" type="number" class="form-input" />
      </div>
      <button type="submit" class="btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const route = useRoute();
const db = useFirestore();

const ingredient = ref({
  name: '',
  category: '',
  quantity: 0,
});

// Fetch ingredient details on mount
onMounted(async () => {
  const docRef = doc(
    db,
    `kitchens/${route.params.kitchenId}/ingredients/${route.params.ingredientId}`
  );
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    ingredient.value = snapshot.data();
  }
});

// Save changes back to Firestore
const saveChanges = async () => {
  const docRef = doc(
    db,
    `kitchens/${route.params.kitchenId}/ingredients/${route.params.ingredientId}`
  );
  await updateDoc(docRef, ingredient.value);
  alert('Ingredient updated!');
};
</script>

