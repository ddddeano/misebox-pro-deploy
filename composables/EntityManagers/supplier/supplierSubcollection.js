// composables/EntityManagers/supplier/supplierSubcollection.js
import { useCurrentUser, useFirestore, useCollection } from "vuefire";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export function useSupplierSubcollection() {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const { createSubObject } = useFirestoreSubcollectionHelpers();

  // General-purpose function to fetch a supplier's subcollection
  function fetchSupplierSubCollection(subCollectionName, supplierId = null) {
    const resolvedSupplierId = computed(() => supplierId || currentUser.value?.uid);

    if (!resolvedSupplierId.value) {
      console.warn(`[fetchSupplierSubCollection] Supplier ID not resolved for ${subCollectionName}.`);
      return null;
    }

    const subCollectionRef = computed(() =>
      collection(db, `suppliers/${resolvedSupplierId.value}/${subCollectionName}`)
    );

    const { data: subCollection } = useCollection(subCollectionRef);
    return subCollection;
  }

  // Dedicated functions for specific subcollections
  function fetchSupplierCatalog(supplierId = null) {
    return fetchSupplierSubCollection("catalog", supplierId);
  }

  function fetchSupplierKitchens(supplierId = null) {
    return fetchSupplierSubCollection("kitchens", supplierId);
  }

  function fetchSupplierOrders(supplierId = null) {
    return fetchSupplierSubCollection("orders", supplierId);
  }

  function fetchSupplierArchive(supplierId = null) {
    return fetchSupplierSubCollection("archive", supplierId);
  }

  // Add an item to the supplier's subcollection
  async function addSupplierSubcollectionItem(supplierId, subCollectionName, data) {
    if (!supplierId || !subCollectionName || !data) {
      throw new Error("[addSupplierSubcollectionItem] Missing required parameters.");
    }

    try {
      const result = await createSubObject("suppliers", supplierId, subCollectionName, data);
      console.log(`[addSupplierSubcollectionItem] Added item to ${subCollectionName} for supplier ${supplierId}.`);
      return result;
    } catch (error) {
      console.error(`[addSupplierSubcollectionItem] Error adding item:`, error.message);
      throw error;
    }
  }

  // Simplified function to add an ingredient to the "catalog"
  async function addIngredientToSupplier(data) {
    if (!currentUser.value?.uid) {
      throw new Error("[addIngredientToSupplier] User must be logged in to add ingredients.");
    }

    const supplierId = currentUser.value.uid;
    return await addSupplierSubcollectionItem(supplierId, "catalog", data);
  }

  // Remove an item from the supplier's subcollection
  async function removeSupplierSubcollectionItem(supplierId, subCollectionName, itemId) {
    if (!supplierId || !subCollectionName || !itemId) {
      throw new Error("[removeSupplierSubcollectionItem] Missing required parameters.");
    }

    try {
      const itemRef = doc(db, `suppliers/${supplierId}/${subCollectionName}`, itemId);
      await deleteDoc(itemRef);
      console.log(`[removeSupplierSubcollectionItem] Removed item ${itemId} from ${subCollectionName} for supplier ${supplierId}.`);
    } catch (error) {
      console.error(`[removeSupplierSubcollectionItem] Error removing item:`, error.message);
      throw error;
    }
  }

  // Fetch a supplier's subcollection as a one-time snapshot (e.g., catalog)
  async function fetchSupplierSubcollectionOnce(supplierId, subCollectionName) {
    if (!supplierId || !subCollectionName) {
      throw new Error("[fetchSupplierSubcollectionOnce] Missing required parameters.");
    }

    try {
      const subcollectionRef = collection(
        db,
        `suppliers/${supplierId}/${subCollectionName}`
      );
      const snapshot = await getDocs(subcollectionRef);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(`[fetchSupplierSubcollectionOnce] Fetched ${data.length} items from ${subCollectionName} for supplier ${supplierId}.`);
      return data;
    } catch (error) {
      console.error(`[fetchSupplierSubcollectionOnce] Error fetching items:`, error.message);
      throw error;
    }
  }

  return {
    fetchSupplierCatalog,
    fetchSupplierKitchens,
    fetchSupplierOrders,
    fetchSupplierArchive,
    addSupplierSubcollectionItem,
    addIngredientToSupplier,
    removeSupplierSubcollectionItem,
    fetchSupplierSubcollectionOnce,
  };
}
