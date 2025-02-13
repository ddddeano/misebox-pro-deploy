// composables/ObjectManagers/kitchen/useKitchen.js
import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";
import { useKitchenMenus } from "./kitchenMenus";

export function useKitchen() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Fetch a specific kitchen by its ID
  function fetchKitchen(id) {
    const kitchenRef = computed(() => currentUser.value && id ? doc(db, "kitchens", id) : null);
    const { data: kitchen } = useDocument(kitchenRef);
    return kitchen;
  };

  // Fetch kitchens by an array of IDs (e.g., from chef's kitchens list)
 
  const kitchensCollection = () => {
    const kitchensRef = computed(() => currentUser.value ? collection(db, "kitchens") : null);
    const { data: kitchens } = useCollection(kitchensRef);
    return kitchens;
  };

  return {
    fetchKitchen,
    kitchensCollection,
    ...useKitchenCreate(),
    ...useKitchenUpdate(),
    ...useKitchenDelete(),
    ...useKitchenSearch(),
    ...useKitchenTeam(),
    ...useKitchenIngredients(), 
    ...useKitchenMenus(),
   };
}
