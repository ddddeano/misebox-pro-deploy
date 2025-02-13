<!-- components/molecules/forms/firestore/ArrayOfStrings.vue -->
<!-- components/molecules/forms/ArrayOfStrings.vue -->
<template>
  <div class="form-field">
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
      <span v-if="Array.isArray(firebaseValue)">
        {{ firebaseValue.join(" | ") }}
      </span>
      <p v-else>No tags available</p>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing-item">
      <ul v-if="Array.isArray(firebaseValue)">
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="editing-list-item"
        >
          <div class="item-content">
            <input
              v-if="editingIndex === index"
              v-model="viewModel[index]"
              class="editable-input"
            />
            <span v-else>{{ item }}</span>

            <div class="list-icons">
              <PencilIcon
                v-if="editingIndex !== index"
                class="icon edit-icon"
                @click="editItem(index)"
              />
              <XCircleIcon
                class="icon delete-icon"
                @click="removeItem(index)"
              />
            </div>
          </div>
        </li>
      </ul>
      <p v-else>No tags to edit</p>

      <!-- Input for adding a new item (create mode) -->
      <div class="input-container">
        <input
          v-model="newItem"
          :placeholder="itemPlaceholder"
          class="editable-input"
        />
        <div class="list-icons-2">
          <CheckCircleIcon
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
import { ref, watch } from "vue";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore } from "vuefire";

const props = defineProps({
  label: String,
  firebaseValue: {
    type: Array,
    default: () => [],
  },
  placeholder: String,
  itemPlaceholder: String,
  collectionName: String,
  documentID: String,
  target: String,
  formattingFunction: {
    type: Function,
    required: false,
  },
  validationFunction: {
    type: Function,
    required: false,
  },
});

const firestore = useFirestore();
const errorMessage = ref("");
const isEditing = ref(false);
const editingIndex = ref(null);
const viewModel = ref([...props.firebaseValue]);
const newItem = ref("");

// Sync viewModel with firebaseValue when it changes
watch(
  () => props.firebaseValue,
  (newVal) => {
    viewModel.value = [...newVal];
  }
);

// Start editing a specific item
const editItem = (index) => {
  editingIndex.value = index;
  errorMessage.value = "";
};

// Cancel editing mode for the currently selected item
const cancelInlineEditing = () => {
  editingIndex.value = null;
  errorMessage.value = "";
  viewModel.value = [...props.firebaseValue];
};

// Save the edited item back to Firestore

// Add a new item to Firestore
const addItem = async () => {
  try {
    let newItemValue = newItem.value.trim();

    if (props.formattingFunction) {
      newItemValue = props.formattingFunction(newItemValue);
    }

    if (props.validationFunction) {
      const validationError = props.validationFunction(newItemValue);
      if (validationError) {
        errorMessage.value = validationError;
        return;
      }
    }

    if (!newItemValue) {
      errorMessage.value = "Item cannot be empty.";
      return;
    }

    const documentRef = doc(
      firestore,
      props.collectionName,
      props.documentID
    );
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(newItemValue),
    });

    newItem.value = "";
  } catch (error) {
    console.error("Error adding new item to Firestore:", error);
  }
};

// Remove an item from Firestore
const removeItem = async (index) => {
  try {
    const itemToRemove = props.firebaseValue[index];

    const documentRef = doc(
      firestore,
      props.collectionName,
      props.documentID
    );
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove),
    });
  } catch (error) {
    console.error("Error removing item from Firestore:", error);
  }
};

// Start editing mode
const startEditing = () => {
  isEditing.value = true;
  errorMessage.value = "";
};

// Cancel editing mode entirely
const cancelEditing = () => {
  isEditing.value = false;
  newItem.value = "";
  errorMessage.value = "";
};
</script>

<style scoped>
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
