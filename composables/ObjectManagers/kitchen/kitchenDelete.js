// composables/ObjectManagers/kitchen/kitchenDelete.js
import { getDocs, arrayRemove } from "firebase/firestore";


export function useKitchenDelete() {
  const { deleteDocument } = useMiseboxFirestore();
  const { updateChef } = useChef();

  const deleteKitchen = async (kitchenId) => {
    try {
      if (!kitchenId) {
        throw new Error("[deleteKitchen] Kitchen ID is required.");
      }

      console.log(`[deleteKitchen] Deleting kitchen with ID: ${kitchenId}`);

      const teamCollectionPath = `kitchens/${kitchenId}/team`;
      const teamMembersSnapshot = await getDocs(useMiseboxFirestore().db.collection(teamCollectionPath));
      const teamMembers = teamMembersSnapshot.docs.map((doc) => doc.id);

      // Remove kitchen reference from each chef's kitchens array
      await Promise.all(
        teamMembers.map(async (chefId) => {
          await updateChef(chefId, {
            kitchens: arrayRemove(kitchenId),
          });
        })
      );

      // Delete the team subcollection documents
      await Promise.all(
        teamMembers.map(async (chefId) => {
          await deleteDocument(teamCollectionPath, chefId);
        })
      );

      // Finally, delete the kitchen document itself
      await deleteDocument("kitchens", kitchenId);

      console.log(`[deleteKitchen] Kitchen ${kitchenId} successfully deleted.`);
    } catch (error) {
      console.error("[deleteKitchen] Error:", error.message);
      throw error;  // Rethrow error for handling in the caller
    }
  };

  return { deleteKitchen };  // Expose the deleteKitchen function
}
