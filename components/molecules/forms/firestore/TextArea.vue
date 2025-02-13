<!-- components/molecules/forms/firestore/TextArea.vue -->
<template>
  <div class="form-field">
    <div class="top">
      <label>{{ label }}</label>
      <div class="component-icons">
        <PencilIcon v-if="!isEditing" class="icon edit-icon" @click="startEditing" />
        <template v-else>
          <CheckCircleIcon class="icon confirm-icon" @click="updateField" />
          <MinusCircleIcon class="icon cancel-icon" @click="cancelEditing" />
          <XCircleIcon v-if="vModel" class="icon clear-icon" @click="clearField" />
        </template>
      </div>
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="display">
      <span class="bio-text" v-html="formattedText"></span>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing">
      <textarea
        v-model="vModel"
        :placeholder="placeholder"
        class="editable-input editable-textarea"
        :maxlength="maxLength"
        @input="logTextareaValue"
      ></textarea>
    </div>

    <!-- Error Message (Always displayed) -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

const props = defineProps({
  label: { type: String, default: "" },
  firebaseValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  maxLength: { type: Number, default: null },
  collectionName: String,
  documentID: String,
  target: String,
});

const firestore = useFirestore();
const isEditing = ref(false);
const errorMessage = ref("");
const vModel = ref("");

// ✅ Ensure paragraph breaks (`\n`) are displayed correctly
const formattedText = computed(() => {
  if (!props.firebaseValue) return "";
  return props.firebaseValue.replace(/\\n/g, "<br>"); // Convert `\n` for display
});

// **Helper: Encode/Decode Newlines**
function encodeNewlines(text) {
  return text.replace(/\n/g, "\\n"); // Ensure Firestore stores `\n` correctly
}

function decodeNewlines(text) {
  return text.replace(/\\n/g, "\n"); // Convert back when retrieving data
}

// **Initialize vModel with Firestore Value**
watch(() => props.firebaseValue, (newValue) => {
  vModel.value = decodeNewlines(newValue || "");
}, { immediate: true });

// **Start Editing**
const startEditing = () => {
  errorMessage.value = "";
  vModel.value = decodeNewlines(props.firebaseValue || "");
  isEditing.value = true;
};

// **Cancel Editing**
const cancelEditing = () => {
  errorMessage.value = "";
  vModel.value = decodeNewlines(props.firebaseValue || "");
  isEditing.value = false;
};

// **Clear Field**
const clearField = async () => {
  vModel.value = "";
  await updateField();
  isEditing.value = true;
};

// **Update Firestore Field**
const updateField = async () => {
  if (!props.documentID || !props.collectionName || !props.target) {
    errorMessage.value = "Missing Firestore configuration.";
    return;
  }

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    const formattedValue = encodeNewlines(vModel.value);
    

    await updateDoc(documentRef, { [props.target]: formattedValue });


    isEditing.value = false;
  } catch (error) {
    errorMessage.value = "Failed to update field.";
  }
};

// **Log Textarea Value (While Typing)**
const logTextareaValue = () => {
};
</script>
