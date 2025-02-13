// composables/Firestore/firestoreUpdate.js
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore as vuefireFirestore, useCurrentUser } from "vuefire";

export function useFirestoreUpdate() {
  const db = vuefireFirestore();
  const currentUser = useCurrentUser();

  // Update a document by its collection name and document ID
  async function updateDocument(collectionName, documentId, updates) {
    if (!currentUser.value) {
      return Promise.reject("No authenticated user found. Please sign in first.");
    }

    if (!documentId) {
      return Promise.reject("[updateDocument] Document ID is required.");
    }

    try {
      await updateDoc(doc(db, collectionName, documentId), updates);
      console.log(`[updateDocument] Document updated in '${collectionName}' with ID: ${documentId}`);
    } catch (error) {
      console.error(`[updateDocument] Error updating document in '${collectionName}':`, error);
      throw error;
    }
  }

  // Update a document for the current user in the specified collection
  async function updateEntity(collectionName, updates) {
 
    const documentId = currentUser.value.uid; // Use the current user's UID as the document ID

    try {
      await updateDoc(doc(db, collectionName, documentId), updates);
      console.log(`[updateEntity] Entity updated in '${collectionName}' for user ID: ${documentId}`);
    } catch (error) {
      console.error(`[updateEntity] Error updating entity in '${collectionName}':`, error);
      throw error;
    }
  }

  return {
    updateDocument,
    updateEntity,
  };
}
