<!-- components/molecules/forms/firestore/Select.vue -->
<template>
  <div class="form-field">
    <div class="top">
      <label>{{ label }}</label>
    </div>

    <!-- Configurable Action Button -->
    <button 
      @click="updateField" 
      :disabled="shouldBeDisabled"
      class="btn"
    >
      {{ shouldBeDisabled ? disabledLabel : actionLabel }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Action",
  },
  firebaseValue: {
    type: [String, Boolean, Number, null],
    default: null,
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
  actionValue: {
    type: [String, Boolean, Number],
    required: true, // The value Firestore will be updated to
  },
  actionLabel: {
    type: String,
    required: true, // Button label when action is possible
  },
  disabledLabel: {
    type: String,
    required: true, // Button label when action is disabled
  },
  disableWhen: {
    type: [String, Boolean, Number, null],
    default: null, // Condition to disable button when firebaseValue matches this
  },
});

const emit = defineEmits(["fieldChanged"]);
const { updateMiseboxUser } = useMiseboxUserUpdate();

// Compute whether button should be disabled
const shouldBeDisabled = computed(() => props.firebaseValue === props.disableWhen);

// Update Firestore when button is clicked
const updateField = async () => {
  try {
    await updateMiseboxUser({ id: props.documentID, [props.target]: props.actionValue });
    emit("fieldChanged", { target: props.target, value: props.actionValue });
    console.log(`[MoleculesFormsFirestoreButton] Updated ${props.target} to:`, props.actionValue);
  } catch (error) {
    console.error(`[MoleculesFormsFirestoreButton] Error updating ${props.target}:`, error);
  }
};
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.top {
  display: flex;
  justify-content: space-between;
}

.firestore-button {
  padding: var(--spacing-s) var(--spacing-m);
  border-radius: var(--radius-m);
  font-size: var(--font-size-m);
  font-weight: bold;
  cursor: pointer;
  background-color: var(--primary);
  color: var(--text-light);
  border: none;
  transition: background-color 0.2s ease-in-out;
}

.firestore-button:hover {
  background-color: var(--primary-hover);
}

.firestore-button:disabled {
  background-color: var(--success);
  cursor: default;
}
</style>
