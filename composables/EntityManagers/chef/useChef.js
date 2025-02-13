// composables/EntityManagers/chef/useChef.js
// ============================
// composables/EntityManagers/chef/useChef.js
// ============================

import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useChef() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Current Chef Document
  const currentChefRef = computed(() =>
    currentUser.value ? doc(db, "chefs", currentUser.value.uid) : null
  );
  const { data: currentChef } = useDocument(currentChefRef);

  // Fetch a specific Chef by ID
  function fetchChef(id) {
    const chefRef = computed(() =>
      currentUser.value && id ? doc(db, "chefs", id) : null
    );
    const { data: chef } = useDocument(chefRef);
    return chef;
  }

  // Fetch all Chefs in the collection
  function chefsCollection() {
    const chefsRef = computed(() =>
      currentUser.value ? collection(db, "chefs") : null
    );
    const { data: chefs } = useCollection(chefsRef);
    return chefs;
  }

  // Expose the functionalities
  return {
    ...useChefCreate(),
    ...useChefUpdate(),
    ...useChefDelete(),
    ...useChefLinking(),
    ...useChefSubcollection(),
    ...useChefGallery(),
    currentChef,
    fetchChef,
    chefsCollection,
  };
}
