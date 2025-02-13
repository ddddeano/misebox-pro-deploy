// composables/Firestore/useMiseboxFirestore.js
// ============================
// composables/useMiseboxFirestore.js (PRIMITIVE)
// ============================

export function useMiseboxFirestore() {

  const firestoreCreate = useFirestoreCreate();
  const firestoreUpdate = useFirestoreUpdate();
  const firestoreDelete = useFirestoreDelete();
  const firestoreArrayFieldHelpers = useFirestoreArrayFieldHelpers();
  const firestoreSubcollectionHelpers = useFirestoreSubcollectionHelpers();

  return {
    ...firestoreCreate,
    ...firestoreUpdate,
    ...firestoreDelete,
    ...firestoreArrayFieldHelpers,
    ...firestoreSubcollectionHelpers,
  };
}


