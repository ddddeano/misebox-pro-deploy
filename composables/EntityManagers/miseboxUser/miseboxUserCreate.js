// composables/EntityManagers/miseboxUser/miseboxUserCreate.js
import { generateUserHandle, generateMiseCode, processMiseboxUserAvatarUrl } from "./miseboxUserUtils";

export function useMiseboxUserCreate() {

  const createMiseboxUser = async (miseboxUser) => {
    const { updateMiseboxUser } = useMiseboxUser();

    try {
      if (!miseboxUser || typeof miseboxUser !== "object") {
        throw new Error("[createMiseboxUser] Invalid input.");
      }

      // Generate unique mise code and handle based on the input entity data.
      const mise_code = generateMiseCode();
      const handle = generateUserHandle(miseboxUser.email, miseboxUser.display_name, mise_code);

      // Configuration for the user entity.
      const config = {
        mise_code,
        handle,
        user_apps: ["misebox-users"],
      };

      // Merge the input object with the configuration.
      const processedUser = {
        ...miseboxUser,
        ...config,
      };

      let userId;
      try {
        const { createEntity } = useMiseboxFirestore();
        // Create the user entity first to obtain a valid userId.
        userId = await createEntity("misebox-users", processedUser);

        // Now that we have the userId, process the avatar.
        // The avatar processing function will handle a missing or empty photoURL internally.
        try {
          const avatarData = await processMiseboxUserAvatarUrl(userId, miseboxUser.photoURL);
          // Update the user record with the returned avatar data.
          await updateMiseboxUser(avatarData);
        } catch (avatarError) {
          console.error("[createMiseboxUser] Error processing avatar upload:", avatarError.message);
        }
      } catch (createError) {
        console.error("[createMiseboxUser] Error creating misebox user:", createError.message);
        throw createError;
      }

      console.log("[createMiseboxUser] Misebox User created successfully with ID:", userId);
      return userId;
    } catch (error) {
      console.error("[createMiseboxUser] Error:", error.message);
      throw error;
    }
  };

  return { createMiseboxUser };
}
