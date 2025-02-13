<!-- components/molecules/forms/KitchenImageSelection.vue -->
<template>
  <div class="form-field">
    <div class="image-container">
      <!-- Display the current kitchen image -->
      <img :src="kitchen.photo_url" alt="Kitchen Image" class="kitchen-image" />

      <!-- Camera icon overlay -->
      <label class="camera">
        <CameraIcon class="icon" />
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser, useFirestore } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

const firestore = useFirestore();
const storage = getStorage();

// Handle file input change for updating the kitchen image
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      // Resize and optimize the image before uploading
      const resizedImage = await resizeImage(file, 800, 600); // Resize to 800x600 (adjust as needed)

      const kitchenId = props.kitchen.id; // Kitchen's unique identifier
      const path = `kitchens/${kitchenId}/images/${file.name}`;

      // Upload the resized image to Firebase Storage
      const fileRef = storageRef(storage, path);
      await uploadBytes(fileRef, resizedImage);
      const downloadURL = await getDownloadURL(fileRef);

      // Update the kitchen document in Firestore with the new image URL
      const kitchenDocRef = doc(firestore, 'kitchens', kitchenId);
      await updateDoc(kitchenDocRef, { photo_url: downloadURL });

      // Optionally update the local kitchen object to reflect the new image immediately
      props.kitchen.photo_url = downloadURL;
    } catch (error) {
      console.error('Error uploading kitchen image:', error);
      // Handle the error (e.g., display a notification to the user)
    }
  }
};

// Function to resize and compress the image before uploading
const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.onerror = reject;

    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate new dimensions
      const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * scaleFactor;
      const height = img.height * scaleFactor;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        'image/jpeg',
        0.7 // Adjust the quality to reduce file size
      );
    };
  });
};
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.kitchen-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
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
