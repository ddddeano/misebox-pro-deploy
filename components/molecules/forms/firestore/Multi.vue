<!-- components/molecules/forms/firestore/Multi.vue -->
<!-- components/molecules/forms/MultiField.vue -->
<template>
  <div class="form-field">
    <div class="top">
      <label>{{ label }}</label>
      <div class="component-icons">
        <PencilIcon
          v-if="!isEditing"
          class="icon edit-icon"
          @click="pencilButtonClicked"
        />
        <template v-else>
          <CheckCircleIcon
            class="icon confirm-icon"
            @click="checkButtonClicked"
          />
          <MinusCircleIcon 
            class="icon cancel-icon"
            @click="minusButtonClicked"
          />
          <XCircleIcon
            v-if="Object.values(localValue).some(Boolean)"
            class="icon clear-icon"
            @click="deleteButtonClicked"
          />
        </template>
      </div>
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="display">
      <span>{{ formattedValue }}</span>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing">
      <div
        v-for="key in Object.keys(placeholders)"
        :key="key"
        class="input-group"
      >
        <input
          v-model="localValue[key]"
          :placeholder="placeholders[key]"
          class="editable-input"
        />
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  firebaseValue: {
    type: Object,
    default: () => ({}),
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
  placeholders: {
    type: Object,
    required: true, // Ensures an ordered structure
  },
  formattingFunction: Function,
  validationFunction: Function,
});

const emit = defineEmits(["fieldChanged"]);
const firestore = useFirestore();

const isEditing = ref(false);
const localValue = ref({ ...props.firebaseValue });
const errorMessage = ref("");

// Preserve placeholder order from the parent
const formattedValue = computed(() => {
  return Object.keys(props.placeholders)
    .map((key) => localValue.value[key])
    .filter(Boolean)
    .join(", ");
});

const pencilButtonClicked = () => {
  errorMessage.value = "";
  localValue.value = { ...props.firebaseValue };
  isEditing.value = true;
};

const checkButtonClicked = async () => {
  isEditing.value = false;
  await updateField();
};

const minusButtonClicked = () => {
  errorMessage.value = "";
  localValue.value = { ...props.firebaseValue };
  isEditing.value = false;
};

const deleteButtonClicked = async () => {
  Object.keys(localValue.value).forEach((key) => {
    localValue.value[key] = "";
  });
  await updateField();
  isEditing.value = true;
};

const updateField = async () => {
  if (!props.documentID) {
    console.error("No document ID provided");
    return;
  }

  try {
    await updateDoc(doc(firestore, props.collectionName, props.documentID), {
      [props.target]: { ...localValue.value },
    });

    emit("fieldChanged", { target: props.target, value: { ...localValue.value } });
    console.log("[MultiField] Updated:", localValue.value);
  } catch (error) {
    console.error("[MultiField] Firestore Update Error:", error);
  }
};
</script>
