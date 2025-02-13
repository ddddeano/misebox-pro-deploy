<template>
  <div class="form-field">
    <label>{{ label }}</label>
    
    <div class="select-container">
      <select
        v-model="localValue"
        class="editable-input"
        @change="updateField"
        @focus="isDropdownOpen = true"
        @blur="isDropdownOpen = false"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.title" :value="option.title">
          {{ option.title }} - {{ option.description }}
        </option>
      </select>
    </div>

    <!-- Debug: Show whether dropdown is open -->

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

// Props
const props = defineProps({
  label: { type: String, default: "" },
  collectionName: { type: String, required: true },
  target: { type: String, required: true },
  firebaseValue: { type: String, default: "" },
  placeholder: { type: String, default: "Select category" },
  documentID: { type: String, required: true },
});

// Firestore setup
const firestore = useFirestore();
const errorMessage = ref("");
const localValue = ref(props.firebaseValue);
const isDropdownOpen = ref(false); // Debug flag

// Ingredient categories
const options = [
  { title: "Produce", description: "Fresh fruits, vegetables, and herbs." },
  { title: "Baked Goods", description: "Breads, Buns, Loaves." },
  { title: "Dairy", description: "Milk, cheese, butter, yogurt, etc." },
  { title: "Meat & Seafood", description: "Red meat, poultry, fish, shellfish." },
  { title: "Grains & Cereals", description: "Rice, pasta, bread, oats, and other cereal products." },
  { title: "Dry Store", description: "Oils, spices, condiments, canned goods, and sauces." },
  { title: "Frozen", description: "Frozen vegetables, fruits, meats, desserts, and prepared meals." },
  { title: "Beverages", description: "Juices, sodas, water, coffee, tea, and other drinks." },
  { title: "Baking & Sweets", description: "Flour, sugar, baking powder, cocoa, chocolate, and similar items." },
  { title: "Prepared Foods / Ready-to-Eat", description: "Pre-cooked meals, soups, salads, and other ready-made items." }
];

// Keep local value in sync with Firestore
watch(() => props.firebaseValue, (newVal) => {
  localValue.value = newVal;
});

// Update Firestore when selection changes
const updateField = async () => {
  if (!props.documentID || !props.collectionName || !props.target) {
    errorMessage.value = "Missing Firestore configuration.";
    return;
  }

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, { [props.target]: localValue.value });
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = "Failed to update field.";
    console.error("Firestore update error:", error);
  }
};
</script>

<style scoped>
@import "@/assets/design-system/molecules/dropdown.scss";

/* Debugging text */
.debug {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}
</style>
