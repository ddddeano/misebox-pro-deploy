// composables/EntityManagers/chef/chefDelete.js
// ============================
// composables/EntityManagers/chef/chefDelete.js
// ============================

export function useChefDelete() {
  const { deleteEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const deleteChef = async () => {
    try {
      const chefId = currentUser.value?.uid;
      if (!chefId) throw new Error("[deleteChef] No authenticated user found.");

      // Delete the chef document
      await deleteEntity("chefs", chefId);

      console.log("[deleteChef] Chef profile deleted successfully.");
    } catch (error) {
      console.error("[deleteChef] Error deleting chef profile:", error.message);
      throw error;
    }
  };

  return { deleteChef };
}
