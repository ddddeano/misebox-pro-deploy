// composables/EntityManagers/miseboxUser/miseboxUserDelete.js

export function useMiseboxUserDelete() {
  const { deleteDocument } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const deleteMiseboxUser = async () => {
    const id = currentUser.value?.uid;
    if (!id) throw new Error("[deleteMiseboxUser] No authenticated user found.");
    try {
      await deleteDocument("misebox-users", id);
      console.log("[deleteMiseboxUser] Misebox User deleted successfully.");
    } catch (error) {
      console.error("[deleteMiseboxUser] Error deleting Misebox User:", error);
      throw error;
    }
  };

  return { deleteMiseboxUser };
}
