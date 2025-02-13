// composables/Firestore/firestoreDelete.js
import { doc, deleteDoc } from "firebase/firestore";
import { useFirestore as vuefireFirestore, useCurrentUser } from "vuefire";

export function useFirestoreDelete() {
  const db = vuefireFirestore();
  const currentUser = useCurrentUser();

  async function deleteDocument(collectionName, documentId) {
    return currentUser.value
      ? deleteDoc(doc(db, collectionName, documentId))
      : Promise.reject("No authenticated user found. Please sign in first.");
  }

  return {
    deleteDocument,
  };
}
 