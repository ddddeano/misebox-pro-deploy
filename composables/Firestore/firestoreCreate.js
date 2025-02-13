// composables/Firestore/firestoreCreate.js
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useFirestore as vuefireFirestore, useCurrentUser } from "vuefire";

export function useFirestoreCreate() {
  const db = vuefireFirestore();
  const currentUser = useCurrentUser();

  // Helper to create a document with a predefined ID (No `created_by`)
  async function createEntity(collectionName, data) {

    if (currentUser.value) {
      const documentId = currentUser.value.uid; // Use current user's UID as the ID
      const docRef = doc(db, collectionName, documentId);
      await setDoc(docRef, {
        ...data,
        id: documentId,
        created_at: new Date().toISOString(),
      });
      return docRef.id; // Return the auto-generated ID only
    }
    return Promise.reject("No authenticated user found. Please sign in first.");
  }

  // Helper to create a document with a Firestore-generated ID
  async function createObject(collectionName, data) {
  const { currentMiseboxUser: miseboxUser } = useMiseboxUser(); // Correct usage

    const collectionRef = collection(db, collectionName);

    // Get user avatar, or fallback to a placeholder
    const avatarUrl = miseboxUser?.avatar || "https://dummyimage.com/100x100/cccccc/ffffff.png&text=Avatar";

    // Create the document in Firestore and get its reference
    const docRef = await addDoc(collectionRef, {
      ...data,
      created_at: new Date().toISOString(),
      created_by: {
        id: currentUser.value.uid,
        avatar: avatarUrl,
      },
    });

    const objectId = docRef.id; // Firestore-generated document ID

    // Set the document's `id` field asynchronously
    await setDoc(docRef, { id: objectId }, { merge: true });

    console.log(`[createObject] Object created with ID: ${objectId}`);
    return objectId; // Return the generated ID for future routing
  }

  return {
    createEntity,
    createObject,
  };
}
