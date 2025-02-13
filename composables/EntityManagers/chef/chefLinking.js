// composables/EntityManagers/chef/chefLinking.js
// composables/chefLinking.js
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore } from "vuefire";

export function useChefLinking() {
  const db = useFirestore();

  async function addKitchenToChef(chefId, kitchen) {
    if (!chefId || !kitchen) {
      throw new Error("[addKitchenToChef] Chef ID or Kitchen data is missing.");
    }

    try {
      const chefRef = doc(db, "chefs", chefId);
      await updateDoc(chefRef, {
        kitchens: arrayUnion({ id: kitchen.id }),
      });
      console.log(`[addKitchenToChef] Kitchen ${kitchen.id} added to chef ${chefId}`);
    } catch (error) {
      console.error("[addKitchenToChef] Error:", error);
      throw error;
    }
  }

  async function removeKitchenFromChef(chefId, kitchenId) {
    if (!chefId || !kitchenId) {
      throw new Error("[removeKitchenFromChef] Chef ID or Kitchen ID is missing.");
    }

    try {
      const chefRef = doc(db, "chefs", chefId);
      await updateDoc(chefRef, {
        kitchens: arrayRemove({ id: kitchenId }),
      });
      console.log(`[removeKitchenFromChef] Kitchen ${kitchenId} removed from chef ${chefId}`);
    } catch (error) {
      console.error("[removeKitchenFromChef] Error:", error);
      throw error;
    }
  }

  return { addKitchenToChef, removeKitchenFromChef };
}
