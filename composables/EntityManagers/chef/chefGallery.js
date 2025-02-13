// composables/EntityManagers/chef/chefGallery.js
// composables/Chef/chefGallery.js
export function useChefGallery() {
  const { updateEntity } = useMiseboxFirestore();

  const addGalleryImage = async (chefId, file) => {
    if (!chefId || !file) {
      throw new Error("[addGalleryImage] Missing chefId or file.");
    }

    try {
      const imagePath = `chefs/${chefId}/gallery/${Date.now()}-large.jpg`;
      const thumbnailPath = `chefs/${chefId}/gallery/${Date.now()}-thumbnail.jpg`;

      const { image, thumbnail } = await handleGalleryImageUpload(file, imagePath, thumbnailPath);

      // Add the gallery entry to the chef's Firestore document
      await updateEntity("chefs", chefId, {
        gallery: arrayUnion({ image_url: image, thumbnail_url: thumbnail }),
      });

      console.log(`[addGalleryImage] Image added to chef ${chefId}'s gallery.`);
    } catch (error) {
      console.error("[addGalleryImage] Error adding image to gallery:", error.message);
      throw error;
    }
  };

  const removeGalleryImage = async (chefId, galleryItem) => {
    if (!chefId || !galleryItem) {
      throw new Error("[removeGalleryImage] Missing chefId or galleryItem.");
    }

    try {
      // Remove the gallery item from Firestore
      await updateEntity("chefs", chefId, {
        gallery: arrayRemove(galleryItem),
      });

      console.log(`[removeGalleryImage] Image removed from chef ${chefId}'s gallery.`);
    } catch (error) {
      console.error("[removeGalleryImage] Error removing image from gallery:", error.message);
      throw error;
    }
  };

  return { addGalleryImage, removeGalleryImage };
}
