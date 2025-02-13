// composables/ObjectManagers/kitchen/kitchenTeam.js
import { doc, setDoc, deleteDoc, collection, getDocs, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore as vuefireFirestore } from "vuefire";

export function useKitchenTeam() {
  const db = vuefireFirestore();
  const { updateMiseboxUser } = useMiseboxUser();

  // **Add a team member to the kitchen's subcollection**
  const addTeamMember = async (kitchenId, user) => {
    if (!kitchenId || !user || !user.id) {
      console.error("[addTeamMember] Missing kitchenId or user data.");
      return;
    }

    try {
      // Add user to the team's subcollection
      const teamRef = doc(collection(db, `kitchens/${kitchenId}/team`), user.id);
      await setDoc(teamRef, user, { merge: true });

      // Update user's profile to include this kitchen
      await updateMiseboxUser({ kitchens: arrayUnion(kitchenId) });

      console.log(`[addTeamMember] User ${user.id} added to kitchen ${kitchenId}`);
    } catch (error) {
      console.error("[addTeamMember] Error:", error.message);
      throw error;
    }
  };

  // **Remove a team member from the kitchen's subcollection**
  const removeTeamMember = async (kitchenId, userId) => {
    if (!kitchenId || !userId) {
      console.error("[removeTeamMember] Missing kitchenId or userId.");
      return;
    }

    try {
      // Remove user from the team's subcollection
      const teamRef = doc(collection(db, `kitchens/${kitchenId}/team`), userId);
      await deleteDoc(teamRef);

      // Remove the kitchen from the user's profile
      await updateMiseboxUser({ kitchens: arrayRemove(kitchenId) });

      console.log(`[removeTeamMember] User ${userId} removed from kitchen ${kitchenId}`);
    } catch (error) {
      console.error("[removeTeamMember] Error:", error.message);
      throw error;
    }
  };

  // **Fetch all team members from the subcollection**
  const fetchTeamMembers = async (kitchenId) => {
    if (!kitchenId) {
      console.error("[fetchTeamMembers] Missing kitchenId.");
      return [];
    }

    try {
      const teamCollection = collection(db, `kitchens/${kitchenId}/team`);
      const querySnapshot = await getDocs(teamCollection);

      const teamMembers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(`[fetchTeamMembers] Retrieved ${teamMembers.length} team members for kitchen ${kitchenId}`);
      return teamMembers;
    } catch (error) {
      console.error("[fetchTeamMembers] Error:", error.message);
      throw error;
    }
  };

  return { addTeamMember, removeTeamMember, fetchTeamMembers };
}
