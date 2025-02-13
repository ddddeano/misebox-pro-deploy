// composables/Utils/useField.js
// composables/utils/useField.js
import { ref } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

export function useField(props) {
  const firestore = useFirestore();
  const isEditing = ref(false);
  const errorMessage = ref("");
  const vModel = ref(props.firebaseValue || ""); // Ensure vModel is reactive

  const startEditing = () => {
    errorMessage.value = "";
    vModel.value = props.firebaseValue || "";
    isEditing.value = true;
  };

  const cancelEditing = () => {
    errorMessage.value = "";
    vModel.value = props.firebaseValue || "";
    isEditing.value = false;
  };

  const validateInput = async () => {
    errorMessage.value = "";
    const value = vModel.value;

    if (props.validationFunction) {
      const validationResult = await props.validationFunction(value);
      if (validationResult) {
        errorMessage.value = validationResult;
        return false;
      }
    }
    return true;
  };

  const updateField = async () => {
    if (!props.documentID || !props.collectionName || !props.target) {
      console.error("Missing required props for Firestore update");
      errorMessage.value = "Configuration error.";
      return;
    }

    const isValid = await validateInput();
    if (!isValid) return;

    // Ensure that newlines are stored correctly in Firestore
    const formattedValue = props.formattingFunction
      ? props.formattingFunction(vModel.value)
      : vModel.value.replace(/\r\n/g, "\n");

    try {
      const documentRef = doc(firestore, props.collectionName, props.documentID);
      await updateDoc(documentRef, { [props.target]: formattedValue });
      errorMessage.value = "";
    } catch (error) {
      console.error("Error updating document:", error);
      errorMessage.value = "Failed to update field.";
    }
  };

  const deleteField = async () => {
    vModel.value = "";
    await updateField();
    isEditing.value = true;
  };

  return {
    isEditing,
    vModel,
    errorMessage,
    startEditing,
    cancelEditing,
    updateField,
    deleteField,
  };
}
