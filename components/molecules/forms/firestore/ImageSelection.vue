<!-- components/molecules/forms/firestore/ImageSelection.vue -->
<template>
  <div class="form-field">
    <div class="avatar-container">
      <!-- Display the current image using a generic avatar component -->
      <MoleculesProfileAvatar :url="item.image_url" size="large" altText="Profile Image" />
      <label class="camera">
        <CameraIcon class="icon" />
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
    </div>
  </div>
</template>

<script setup>
// Define required props: item and collectionName.
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
});

// Import your generic avatar processing function and Firestore update function.

const { updateDocument } = useFirestoreUpdate();

// Generic function to process and upload the avatar file.
const processAvatarFile = async (collectionName, entityId, file) => {
  if (!entityId) throw new Error("[processAvatarFile] Missing entity ID.");
  if (!file) throw new Error("[processAvatarFile] No file provided for upload.");

  // Build a storage path based on the provided collection name and entity ID.
  const storagePath = `${collectionName}/${entityId}/image_url.jpg`;
  console.log(`[processAvatarFile] Uploading avatar to ${storagePath}`);

  // Process and upload the image file.
  return { avatar: await processAndUploadImageFromFile(file, storagePath) };
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const entityId = props.item.id;
    if (!entityId) throw new Error("[handleFileChange] No entity ID provided.");

    // Process and upload the image file. This returns an object with the new avatar URL.
    const result = await processAvatarFile(props.collectionName, entityId, file);

    // Update the Firestore document with the new avatar URL.
    await updateDocument(props.collectionName, entityId, { image_url: result.avatar });
    console.log("Image updated successfully:", result);
  } catch (error) {
    console.error("Error updating image:", error);
  }
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
}

.camera {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: var(--text-secondary);
  background-color: var(--background-strong);
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera:hover {
  color: var(--text-primary);
  background-color: var(--hover);
}

.camera input {
  display: none;
}
</style>
