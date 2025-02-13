// composables/EntityManagers/supplier/supplierLinking.js
// ============================
// composables/ObjectManagers/supplier/supplierLinking.js
// ============================

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore } from "vuefire";

export function useSupplierLinking() {
  const db = useFirestore();

  // Link a supplier to another entity
  async function linkSupplierToEntity(supplierId, entityId, collectionName) {
    if (!supplierId || !entityId || !collectionName) {
      throw new Error("[linkSupplierToEntity] Missing required parameters.");
    }

    try {
      const supplierRef = doc(db, "suppliers", supplierId);
      await updateDoc(supplierRef, {
        linked_entities: arrayUnion({ id: entityId, collection: collectionName }),
      });
      console.log(`[linkSupplierToEntity] Linked supplier ${supplierId} to entity ${entityId} in ${collectionName}.`);
    } catch (error) {
      console.error("[linkSupplierToEntity] Error linking supplier:", error.message);
      throw error;
    }
  }

  // Unlink a supplier from another entity
  async function unlinkSupplierFromEntity(supplierId, entityId) {
    if (!supplierId || !entityId) {
      throw new Error("[unlinkSupplierFromEntity] Missing required parameters.");
    }

    try {
      const supplierRef = doc(db, "suppliers", supplierId);
      await updateDoc(supplierRef, {
        linked_entities: arrayRemove({ id: entityId }),
      });
      console.log(`[unlinkSupplierFromEntity] Unlinked supplier ${supplierId} from entity ${entityId}.`);
    } catch (error) {
      console.error("[unlinkSupplierFromEntity] Error unlinking supplier:", error.message);
      throw error;
    }
  }

  return {
    linkSupplierToEntity,
    unlinkSupplierFromEntity,
  };
}
