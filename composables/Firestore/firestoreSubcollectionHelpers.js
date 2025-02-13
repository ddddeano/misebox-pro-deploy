// composables/Firestore/firestoreSubcollectionHelpers.js


export function useFirestoreSubcollectionHelpers() {
  const { createEntity, createObject } = useFirestoreCreate();
  const { updateDocument } = useFirestoreUpdate();
  const { deleteDocument } = useFirestoreDelete();

  function createSubcollectionPath(parentCollection, parentId, subCollectionName) {
    return `${parentCollection}/${parentId}/${subCollectionName}`;
  }

  return {
    async createSubEntity(parentCollection, parentId, subCollectionName, documentId, data) {
      const subCollectionPath = createSubcollectionPath(parentCollection, parentId, subCollectionName);
      return createEntity(subCollectionPath, documentId, data);
    },
    async createSubObject(parentCollection, parentId, subCollectionName, data) {
      const subCollectionPath = createSubcollectionPath(parentCollection, parentId, subCollectionName);
      return createObject(subCollectionPath, data);
    },
    async updateSubDocument(parentCollection, parentId, subCollectionName, documentId, updates) {
      const subCollectionPath = createSubcollectionPath(parentCollection, parentId, subCollectionName);
      return updateDocument(subCollectionPath, documentId, updates);
    },
    async deleteSubDocument(parentCollection, parentId, subCollectionName, documentId) {
      const subCollectionPath = createSubcollectionPath(parentCollection, parentId, subCollectionName);
      return deleteDocument(subCollectionPath, documentId);
    },
  };
}
