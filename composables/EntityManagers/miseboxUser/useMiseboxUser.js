// composables/EntityManagers/miseboxUser/useMiseboxUser.js
// ============================
// composables/AppManagers/miseboxUser/useMiseboxUser.js
// ============================

import { useFirestore, useDocument, useCurrentUser, useCollection } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useMiseboxUser() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Current Misebox User Document
  const currentMiseboxUserRef = computed(() =>
    currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
  );
  const { data: currentMiseboxUser } = useDocument(currentMiseboxUserRef);

  // Fetch a specific Misebox User by ID
  function fetchMiseboxUser(id) {
    const miseboxUserRef = computed(() =>
      currentUser.value && id ? doc(db, "misebox-users", id) : null
    );
    const { data: miseboxUser } = useDocument(miseboxUserRef);
    return miseboxUser;
  }

  // Fetch all Misebox Users
  function miseboxUsersCollection() {
    const miseboxUsersRef = computed(() =>
      currentUser.value ? collection(db, "misebox-users") : null
    );
    const { data: miseboxUsers } = useCollection(miseboxUsersRef);
    return miseboxUsers;
  }

  // Expose the functionalities
  return {
    ...useMiseboxUserCreate(),
    ...useMiseboxUserUpdate(),
    ...useMiseboxUserDelete(),
    currentMiseboxUser,
    fetchMiseboxUser,
    miseboxUsersCollection,
  };
}
