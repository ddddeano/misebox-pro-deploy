<template>
  <div class="form-field">
    <!-- Top Section -->
    <div class="top">
      <label>{{ label }}</label>
      <PencilIcon
        v-if="!isEditing"
        class="icon edit-icon"
        @click="startEditing"
      />
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="display">
      <span v-if="Array.isArray(firebaseValue) && firebaseValue.length">
        {{ firebaseValue.join(" | ") }}
      </span>
      <p v-else>No tags available</p>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing-item">
      <!-- Recommended Tags -->
      <div class="recommended-tags" v-if="recommendedTags.length">
        <h3>Recommended Tags</h3>
        <ul>
          <li
            v-for="tag in recommendedTags"
            :key="tag"
            @click="handleRecommendedTagClick(tag)"
          >
            {{ tag }}
          </li>
        </ul>
      </div>

      <!-- Editable Tags List -->
      <ul v-if="Array.isArray(firebaseValue)" class="editable-tags">
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="editing-list-item"
        >
          <div class="item-content">
            <span>{{ item }}</span>
            <div class="list-icons">
              <XCircleIcon
                class="icon delete-icon"
                @click="removeItem(index)"
              />
            </div>
          </div>
        </li>
      </ul>
      <p v-else>No tags to edit</p>
      <!-- Input for adding a new tag (create mode) -->
      <div class="input-container">
        <input
          v-model="newItem"
          :placeholder="itemPlaceholder"
          class="editable-input"
        />
        <div class="list-icons-2">
        <CheckCircleIcon
      v-if="newItem.length >= 3"
      class="icon confirm-icon"
      @click="addItem"
    />
          <MinusCircleIcon
            class="icon cancel-icon"
            @click="cancelEditing"
          />
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore } from "vuefire";

const label = "Tags";
const target = "tags";

const props = defineProps({
  firebaseValue: { type: Array, default: () => [] },
  itemPlaceholder: { type: String, default: "Add new tag" },
  collectionName: { type: String, required: true },
  documentID: { type: String, required: true },
});

const firestore = useFirestore();
const errorMessage = ref("");
const isEditing = ref(false);
const newItem = ref("");

// Local formatting function that trims and converts the string to title case.
function toTitleCase(str) {
  if (typeof str !== "string") {
    str = String(str);
  }
  return str.trim().toLowerCase().split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

// Start editing mode.
const startEditing = () => {
  isEditing.value = true;
  errorMessage.value = "";
};

// Cancel editing mode.
const cancelEditing = () => {
  isEditing.value = false;
  newItem.value = "";
  errorMessage.value = "";
};

// Remove a tag from Firestore.
const removeItem = async (index) => {
  const itemToRemove = props.firebaseValue[index];
  const documentRef = doc(firestore, props.collectionName, props.documentID);
  try {
    await updateDoc(documentRef, { [target]: arrayRemove(itemToRemove) });
  } catch (error) {
    console.error("Error removing tag:", error);
    errorMessage.value = "Failed to remove tag";
  }
};

// Add a new tag to Firestore.
const addItem = async (tag) => {
  let newTag = tag ? tag : newItem.value;
  newTag = toTitleCase(newTag);

  // Validate: Ensure tag is at least 3 characters long
  if (!newTag || newTag.length < 3) {
    errorMessage.value = "Tag must be at least 3 characters long.";
    return;
  }
  const documentRef = doc(firestore, props.collectionName, props.documentID);
  try {
    await updateDoc(documentRef, { [target]: arrayUnion(newTag) });
    newItem.value = "";
    errorMessage.value = ""; // Clear error on success
  } catch (error) {
    console.error("Error adding new tag:", error);
    errorMessage.value = "Failed to add tag.";
  }
};

// Recommended Tags: Compute a unique list of tags from the global ingredients.
const { ingredientsCollection } = useIngredient();
const globalIngredients = ingredientsCollection();

const recommendedTags = computed(() => {
  const tagSet = new Set();
  if (globalIngredients.value && Array.isArray(globalIngredients.value)) {
    globalIngredients.value.forEach((ing) => {
      if (Array.isArray(ing.tags)) {
        ing.tags.forEach((tag) => tagSet.add(tag));
      }
    });
  }
  return Array.from(tagSet);
});

// When a recommended tag is clicked, add it if not already present.
const handleRecommendedTagClick = (tag) => {
  if (props.firebaseValue.includes(tag)) return;
  addItem(tag);
};
</script>

<style scoped>

.recommended-tags {
  margin-bottom: 1rem;
}
.recommended-tags ul {
  list-style: none;
  padding: 0;
}
.recommended-tags li {
  display: inline-block;
  background: var(--background-strong);
  color: var(--text-primary);
  margin: 0 4px 4px 0;
  padding: 4px 8px;
  border-radius: var(--radius-m);
  cursor: pointer;
}
.item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.list-icons {
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
}

.list-icons-2 {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
</style>
