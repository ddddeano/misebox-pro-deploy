
// Supplier Update Functions
export function useSupplierUpdate() {
  const { addItem, updateItem, removeItem, updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const addSupplierArrayItem = async (fieldName, item) => {
    const supplierId = currentUser.value?.uid;
    if (!supplierId) throw new Error("No authenticated user found.");
    return await addItem("suppliers", supplierId, fieldName, item);
  };

  const updateSupplierArrayItem = async (fieldName, index, updatedItem) => {
    const supplierId = currentUser.value?.uid;
    if (!supplierId) throw new Error("No authenticated user found.");
    return await updateItem("suppliers", supplierId, fieldName, index, updatedItem);
  };

  const removeSupplierArrayItem = async (fieldName, index) => {
    const supplierId = currentUser.value?.uid;
    if (!supplierId) throw new Error("No authenticated user found.");
    return await removeItem("suppliers", supplierId, fieldName, index);
  };

  const updateSupplier = async (updates) => {
    try {
      if (!updates || typeof updates !== "object") {
        throw new Error("[updateSupplier] Updates must be a valid object.");
      }
      await updateEntity("suppliers", updates);
      console.log("[updateSupplier] Supplier updated.");
    } catch (error) {
      console.error("[updateSupplier] Error updating supplier:", error.message);
      throw error;
    }
  };

  return {
    addSupplierArrayItem,
    updateSupplierArrayItem,
    removeSupplierArrayItem,
    updateSupplier,
  };
}
