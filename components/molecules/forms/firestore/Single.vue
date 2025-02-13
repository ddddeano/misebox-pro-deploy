<!-- components/molecules/forms/firestore/Single.vue -->
<!-- components/molecules/forms/SingleField.vue -->
<template>
  <div class="form-field">
    <div class="top">
      <label>{{ label }}</label>
      <div class="component-icons">
        <PencilIcon
          v-if="!isEditing"
          class="icon"
          @click="pencilButtonClicked"
        />
        <template v-else>
          <CheckCircleIcon
            class="icon"
            @click="checkButtonClicked"
          />
          <MinusCircleIcon
            class="icon"
            @click="minusButtonClicked"
          />
          <XCircleIcon
            v-if="vModel"
            class="icon"
            @click="deleteButtonClicked"
          />
        </template>
      </div>
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="display">
      <span>{{ firebaseValue || placeholder }}</span>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing">
      <input
        v-model="vModel"
        :placeholder="placeholder"
        class="editable-input"
      />
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  firebaseValue: {
    type: String,
    default: '',
  },
  collectionName: {
    type: String,
    required: true,
  },
  documentID: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  formattingFunction: {
    type: Function,
    required: false, // Formatting function is optional
    default: null, // No formatting by default
  },
  validationFunction: {
    type: Function,
    required: false, // Validation function is optional
    default: null, // No validation by default
  },
  disabled: {
    type: Boolean,
    default: false, // Field is enabled by default
  },
  readonly: {
    type: Boolean,
    default: false, // Field is editable by default
  },
  maxlength: {
    type: Number,
    default: null, // No character limit by default
  },
  inputType: {
    type: String,
    default: 'text', // Default to a text input
  },
});

const {
  isEditing,
  vModel,
  errorMessage,
  startEditing,
  cancelEditing,
  updateField,
  deleteField,
} = useField(props);

const pencilButtonClicked = () => {
  startEditing();
};

const checkButtonClicked = async () => {
  await updateField();
  isEditing.value = false;
};

const minusButtonClicked = () => {
  cancelEditing();
};

const deleteButtonClicked = async () => {
  await deleteField();
};
</script>

<style scoped>
/* No local styles - all styles are moved to shared/global */
</style>
