<template>
  <div class="gallery-item">
    <!-- Create Mode -->
    <div v-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="image" class="label">Upload Image</label>
        <div
          class="dropzone"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <input
            ref="fileInput"
            type="file"
            id="image"
            class="file-input"
            accept="image/*"
            @change="handleImageUpload"
            hidden
          />
          <span v-if="!localFile">Drag and drop or click to select an image</span>
          <span v-else>{{ localFile.name }}</span>
        </div>
        <div class="doc-upload-meta">
          <label for="name" class="label">Image Name</label>
          <input
            type="text"
            id="name"
            v-model="imageName"
            placeholder="Enter image name"
            class="editable-input"
          />
        </div>
      </div>
      <button class="btn" @click="submitCreate">Save</button>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="gallery-edit">
        <img :src="image.image_url" alt="Gallery Image" class="thumbnail" />
        <div v-if="image.name" class="image-name">{{ image.name }}</div>
        <TrashIcon class="icon delete-icon" @click="submitDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (v) => ["edit", "create"].includes(v),
  },
  index: {
    type: Number,
    required: false,
  },
  collectionName: {
    type: String,
    required: true,
  },
  documentID: {
    type: String,
    required: true,
  },
});

// Local state for file selection and image naming
const localFile = ref(null);
const fileInput = ref(null);
const imageName = ref("");

// Open the hidden file input when the dropzone is clicked
function triggerFileInput() {
  fileInput.value && fileInput.value.click();
}

// Handle file selection via file input
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    localFile.value = file;
    if (!imageName.value) {
      imageName.value = file.name.replace(/\.[^/.]+$/, "");
    }
  }
}

// Handle file selection via drag and drop
function handleDrop(event) {
  const file = event.dataTransfer.files[0];
  if (file) {
    localFile.value = file;
    if (!imageName.value) {
      imageName.value = file.name.replace(/\.[^/.]+$/, "");
    }
  }
}

// Submit create: process the file upload and update Firestore
async function submitCreate() {
  try {
    if (!localFile.value) {
      throw new Error("No image file selected.");
    }
    if (!imageName.value.trim()) {
      throw new Error("Image name is required.");
    }

    // Extract file extension and build final name
    const extension = localFile.value.name.split(".").pop();
    const finalName = `${imageName.value.trim()}.${extension}`;

    // Build the storage path: kitchens/{documentID}/gallery/{finalName} OR chefs/{documentID}/gallery/{finalName}
    const storagePath = `${props.collectionName}/${props.documentID}/gallery/${finalName}`;

    // Upload the image and get the URL
    const uploadedUrl = await processAndUploadImageFromFile(localFile.value, storagePath);

    // Add the new gallery entry to Firestore
    await updateFirestoreArray(props.collectionName, props.documentID, "gallery", {
      name: imageName.value,
      image_url: uploadedUrl,
    });

    console.log("Gallery image added successfully.");

    // Clear the local file and name
    localFile.value = null;
    imageName.value = "";
  } catch (error) {
    console.error("Error adding gallery image:", error);
  }
}

// Submit delete: remove the gallery entry from Firestore using its index
async function submitDelete() {
  try {
    await removeFirestoreArrayItem(props.collectionName, props.documentID, "gallery", props.index);
    console.log("Gallery image deleted successfully.");
  } catch (error) {
    console.error("Error deleting gallery image:", error);
  }
}
</script>

<style scoped>
/* ============================= */
/* 🔹 Local Styles - Form Specific */
/* ============================= */
.gallery-item {
  padding: var(--spacing-m);
}

/* Editable Image */
.gallery-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.thumbnail {
  width: 100px;
  height: auto;
  border-radius: var(--radius-s);
  object-fit: cover;
}

.image-name {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-s);
  color: var(--text-primary);
}
</style>
