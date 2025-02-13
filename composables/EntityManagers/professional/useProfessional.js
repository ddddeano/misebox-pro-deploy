// composables/EntityManagers/professional/useProfessional.js
// ============================
// composables/EntityManagers/professional/useProfessional.js
// ============================

import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useProfessional() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Current Professional Document
  const currentProfessionalRef = computed(() =>
    currentUser.value ? doc(db, "professionals", currentUser.value.uid) : null
  );
  const { data: currentProfessional } = useDocument(currentProfessionalRef);

  // Fetch a specific Professional by ID
  function fetchProfessional(id) {
    const professionalRef = computed(() =>
      currentUser.value && id ? doc(db, "professionals", id) : null
    );
    const { data: professional } = useDocument(professionalRef);
    return professional;
  }

  // Fetch all Professionals in the collection
  function professionalsCollection() {
    const professionalsRef = computed(() =>
      currentUser.value ? collection(db, "professionals") : null
    );
    const { data: professionals } = useCollection(professionalsRef);
    return professionals;
  }

  // Expose the functionalities
  return {
    ...useProfessionalCreate(),
    ...useProfessionalUpdate(),
    ...useProfessionalDelete(),
    ...useProfessionalLinking(),
    ...useProfessionalSubcollection(),
    currentProfessional,
    fetchProfessional,
    professionalsCollection,
  };
}
