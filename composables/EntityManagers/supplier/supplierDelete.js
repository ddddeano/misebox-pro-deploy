// composables/EntityManagers/supplier/supplierDelete.js
// ============================
// composables/EntityManagers/supplier/supplierDelete.js
// ============================

export function useSupplierDelete() {
  const { deleteEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const deleteSupplier = async () => {
    try {
      const supplierId = currentUser.value?.uid;
      if (!supplierId) throw new Error("[deleteSupplier] No authenticated user found.");

      // Delete the supplier document
      await deleteEntity("suppliers", supplierId);

      console.log("[deleteSupplier] Supplier profile deleted successfully.");
    } catch (error) {
      console.error("[deleteSupplier] Error deleting Supplier profile:", error.message);
      throw error;
    }
  };

  return { deleteSupplier };
}
