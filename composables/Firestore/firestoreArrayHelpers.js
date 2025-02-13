// composables/Firestore/firestoreArrayHelpers.js
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFirestore as vuefireFirestore, useCurrentUser } from "vuefire";

export function useFirestoreArrayFieldHelpers() {
  const db = vuefireFirestore();
  const currentUser = useCurrentUser();

  async function getArrayField(collectionName, documentId, fieldName) {
    if (!currentUser.value) return [];
    const docRef = doc(db, collectionName, documentId);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) return [];
    const fieldValue = docSnapshot.data()[fieldName];
    return Array.isArray(fieldValue) ? fieldValue : [];
  }

  async function modifyArray(collectionName, documentId, fieldName, modifyFn) {
    const currentArray = await getArrayField(collectionName, documentId, fieldName);
    if (!Array.isArray(currentArray)) {
      throw new Error(`Field ${fieldName} is not an array.`);
    }
    const updatedArray = modifyFn(currentArray);
    await updateDoc(doc(db, collectionName, documentId), { [fieldName]: updatedArray });
    return updatedArray;
  }

  return {
    async addItem(collectionName, documentId, fieldName, item) {
      return modifyArray(collectionName, documentId, fieldName, (currentArray) => [...currentArray, item]);
    },
    async updateItem(collectionName, documentId, fieldName, index, updatedItem) {
      return modifyArray(collectionName, documentId, fieldName, (currentArray) => {
        if (index < 0 || index >= currentArray.length) {
          throw new Error("Invalid index for updating array item.");
        }
        currentArray[index] = updatedItem;
        return currentArray;
      });
    },
    async removeItem(collectionName, documentId, fieldName, index) {
      return modifyArray(collectionName, documentId, fieldName, (currentArray) => {
        if (index < 0 || index >= currentArray.length) {
          throw new Error("Invalid index for removing array item.");
        }
        return currentArray.filter((_, i) => i !== index);
      });
    },
    async replaceArray(collectionName, documentId, fieldName, newArray) {
      if (!Array.isArray(newArray)) {
        throw new Error("The new array must be a valid array.");
      }
      return modifyArray(collectionName, documentId, fieldName, () => newArray);
    },
  };
}
