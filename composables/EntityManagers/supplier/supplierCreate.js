// composables/EntityManagers/supplier/supplierCreate.js
import { arrayUnion } from "firebase/firestore";

export function useSupplierCreate() {

  const processSupplier = async (supplier) => {
  const { updateMiseboxUser } = useMiseboxUser();

    try {
      if (!supplier || typeof supplier !== "object") {
        throw new Error("[processSupplier] Invalid input.");
      }
      if (supplier.source === "firestore" && supplier.id) {
        return supplier.id;
      }
      const config = {
        source: "firestore",
        search_terms: `${supplier.name || ""} ${supplier.formatted_address || ""}`
          .toLowerCase()
          .trim(),
      };
      const processedSupplier = {
        ...supplier,
        ...config,
      };

      let supplierId;
      try {
        const { createEntity } = useMiseboxFirestore();
        supplierId = await createEntity("suppliers", processedSupplier);
      } catch (createError) {
        console.error("[processSupplier] Error creating supplier entity:", createError.message);
        throw createError;
      }

      try {
        await updateMiseboxUser({ user_apps: arrayUnion("suppliers") });
      } catch (miseboxError) {
        console.error("[processSupplier] Error updating misebox user:", miseboxError.message);
        throw miseboxError;
      }

      let imageData;
      try {
        imageData = await processSupplierPhoto(supplierId, supplier.image_url);
      } catch (photoError) {
        console.error("[processSupplier] Error processing supplier photo:", photoError.message);
        throw photoError;
      }

      try {
        const { updateSupplier } = useSupplier();
        await updateSupplier({ image_url: imageData.image_url });
      } catch (updateError) {
        console.error("[processSupplier] Error updating supplier:", updateError.message);
        throw updateError;
      }

      return supplierId;
    } catch (error) {
      console.error("[processSupplier] Error:", error.message);
      throw error;
    }
  };

  return { processSupplier };
}
