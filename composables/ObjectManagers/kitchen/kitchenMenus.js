// composables/ObjectManagers/kitchen/kitchenMenus.js
import { doc, setDoc, deleteDoc, collection } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export function useKitchenMenus() {
  const db = useFirestore();

  // **Real-time reactive kitchen menus collection**
  const useKitchenMenusCollection = (kitchenId) => {
    if (!kitchenId) {
      console.error("[useKitchenMenusCollection] Missing kitchenId.");
      return null;
    }
    return useCollection(collection(db, `kitchens/${kitchenId}/menus`));
  };

  // **Add a menu to the kitchen's menus subcollection**
  const addKitchenMenu = async ({ kitchenId, menu }) => {
    if (!kitchenId || !menu) {
      console.error("[addKitchenMenu] Missing kitchenId or menu data.");
      return;
    }
    try {
      // Create a new document in the menus subcollection with an auto-generated ID.
      const menuRef = doc(collection(db, `kitchens/${kitchenId}/menus`));
      await setDoc(menuRef, {
        ...menu,
        createdAt: new Date().toISOString(),
      });
      console.log(`[addKitchenMenu] Menu added to kitchen ${kitchenId} with id: ${menuRef.id}`);
      return menuRef.id;
    } catch (error) {
      console.error("[addKitchenMenu] Error:", error.message);
      throw error;
    }
  };

  // **Remove a menu from the kitchen's menus subcollection**
  const removeKitchenMenu = async (kitchenId, menuId) => {
    if (!kitchenId || !menuId) {
      console.error("[removeKitchenMenu] Missing kitchenId or menuId.");
      return;
    }
    try {
      const menuRef = doc(collection(db, `kitchens/${kitchenId}/menus`), menuId);
      await deleteDoc(menuRef);
      console.log(`[removeKitchenMenu] Menu ${menuId} removed from kitchen ${kitchenId}`);
    } catch (error) {
      console.error("[removeKitchenMenu] Error:", error.message);
      throw error;
    }
  };

  return { useKitchenMenusCollection, addKitchenMenu, removeKitchenMenu };
}
