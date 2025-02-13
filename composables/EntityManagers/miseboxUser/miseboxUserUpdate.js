// composables/EntityManagers/miseboxUser/miseboxUserUpdate.js

export function useMiseboxUserUpdate() {
  const { updateEntity } = useMiseboxFirestore();

  const updateMiseboxUser = async (updates) => {
    try {
      if (!updates || typeof updates !== "object") {
        throw new Error("[updateMiseboxUser] Updates must be a valid object.");
      }
      await updateEntity("misebox-users", updates);
      console.log("[updateMiseboxUser] Misebox user updated.");
    } catch (error) {
      console.error("[updateMiseboxUser] Error updating Misebox user:", error.message);
      throw error;
    }
  };

  return { updateMiseboxUser };
}
