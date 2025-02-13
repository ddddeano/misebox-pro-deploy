// composables/Utils/useInteraction.js
// composables/useInteraction.js
import { computed } from "vue";
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";

export const useInteraction = () => {
  const db = useFirestore();
  const vueFireUser = useCurrentUser();

  // Reference to the current Misebox user's document
  const miseboxUserDocRef = computed(() =>
    vueFireUser.value ? doc(db, "misebox-users", vueFireUser.value.uid) : null
  );

  // Fetch the current Misebox user data
  const { data: currentUserData } = useDocument(miseboxUserDocRef);

  // Determine if the current user is interacting with their own entity
  const isInteractingWithSelf = (entityId) =>
    computed(() => vueFireUser.value?.uid === entityId);

  // Check if the current user is following a specific target user
  const isFollowing = (targetEntityId) =>
    computed(() =>
      currentUserData.value?.following?.includes(targetEntityId) ?? false
    );

  return {
    isInteractingWithSelf,
    isFollowing,
  };
};
