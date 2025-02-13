<!-- components/molecules/forms/firestore/DocumentUpload.vue -->
<template>
  <div class="form-group">
    <label class="label">{{ label }}</label>
    <label class="file-upload-container" for="fileInput">
      <span v-if="!file">Click to Upload or Drag & Drop</span>
      <span v-else>{{ file.name }}</span>
      <input type="file" id="fileInput" @change="handleFileUpload" accept=".pdf,.doc,.docx,.jpg,.png" class="file-input" />
    </label>
    <p v-if="uploadProgress > 0" class="upload-progress">Uploading: {{ uploadProgress }}%</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const props = defineProps({
  userId: {
    type: String,
    required: true
  },
  collection: {
    type: String,
    required: true
  },
  storagePath: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: "Upload Document"
  }
});

const emit = defineEmits(["update:documentUrl"]);

const storage = getStorage();
const file = ref(null);
const uploadProgress = ref(0);

function handleFileUpload(event) {
  file.value = event.target.files[0];
  if (!file.value) return;

  const filePath = `${props.collection}/${props.userId}/${props.storagePath}/${file.value.name}`;
  const fileRef = storageRef(storage, filePath);
  const uploadTask = uploadBytesResumable(fileRef, file.value);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      uploadProgress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (error) => {
      console.error("Error uploading file:", error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      emit("update:documentUrl", downloadURL);
    }
  );
}
</script>

<style scoped>
/* File Upload Button Styling */
.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--border);
  padding: var(--spacing-m);
  border-radius: var(--radius-m);
  background-color: var(--background-2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.file-upload-container:hover {
  background-color: var(--background-hover);
  border-color: var(--primary);
}

/* Hidden input */
.file-input {
  display: none;
}

/* Upload Progress */
.upload-progress {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
  margin-top: var(--spacing-s);
}
</style>
