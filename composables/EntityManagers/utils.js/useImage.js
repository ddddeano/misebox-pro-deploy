// composables/EntityManagers/utils.js/useImage.js
// File: composables/EntityManagers/utils/useImage.js
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const processAndUploadImage = async (imageUrl, storagePath) => {
  if (!imageUrl) return null;
  try {
    console.log(`[processAndUploadImage] Fetching image from: ${imageUrl}`);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.warn(`[processAndUploadImage] Failed to fetch image from URL: ${imageUrl}`);
      return null;
    }
    const blob = await response.blob();
    const resizedBlob = await resizeImage(blob, 200);
    const uploadedUrl = await uploadFileAndGetURL(storagePath, resizedBlob);
    console.log(`[processAndUploadImage] Uploaded image to: ${uploadedUrl}`);
    return uploadedUrl;
  } catch (error) {
    console.error("[processAndUploadImage] Error:", error.message);
    return null;
  }
};
export const processAndUploadImageFromFile = async (file, storagePath) => {
  if (!file) throw new Error("[processAndUploadImageFromFile] No file provided.");
  if (!storagePath) throw new Error("[processAndUploadImageFromFile] No storage path specified.");

  try {
    console.log(`[processAndUploadImageFromFile] Resizing and uploading file to: ${storagePath}`);
    
    // Resize the image to 200px (same as existing logic)
    const resizedBlob = await resizeImage(file, 200);
    
    // Upload resized image and get the download URL
    const uploadedUrl = await uploadFileAndGetURL(storagePath, resizedBlob);
    
    console.log(`[processAndUploadImageFromFile] Uploaded file to: ${uploadedUrl}`);
    return uploadedUrl;
  } catch (error) {
    console.error("[processAndUploadImageFromFile] Error:", error.message);
    throw error;
  }
};

export const processGooglePhoto = async (photoUrl, storagePath) => {
  if (!photoUrl || !storagePath) {
    throw new Error("[processGooglePhoto] Photo URL and storage path are required.");
  }
  try {
    console.log(`[processGooglePhoto] Requesting Google image with storagePath: ${storagePath} and URL: ${photoUrl}`);
    // Use $fetch to call your server-side proxy endpoint.
    const response = await $fetch("/api/google-photo", {
      params: { photo_url: photoUrl, storagePath }
    });
    console.log("[processGooglePhoto] Received response:", response);
    if (!response || !response.firebaseUrl) {
      throw new Error("[processGooglePhoto] No Firebase URL returned.");
    }
    return response.firebaseUrl;
  } catch (error) {
    console.error("[processGooglePhoto] Error:", error.message);
    throw error;
  }
};

export const processDefaultPhoto = async (imageUrl, storagePath) => {
  if (!imageUrl) return null;
  try {
    console.log(`[processDefaultPhoto] Fetching default image from: ${imageUrl}`);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.warn(`[processDefaultPhoto] Failed to fetch default image from URL: ${imageUrl}`);
      return null;
    }
    const blob = await response.blob();
    // Use the provided storagePath rather than generating a new one.
    const resizedBlob = await resizeImage(blob, 200);
    const uploadedUrl = await uploadFileAndGetURL(storagePath, resizedBlob);
    console.log(`[processDefaultPhoto] Uploaded default image to: ${uploadedUrl}`);
    return uploadedUrl;
  } catch (error) {
    console.error("[processDefaultPhoto] Error:", error.message);
    return null;
  }
};


export const resizeImage = (file, size) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const minDimension = Math.min(img.width, img.height);
      const cropX = (img.width - minDimension) / 2;
      const cropY = (img.height - minDimension) / 2;

      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, cropX, cropY, minDimension, minDimension, 0, 0, size, size);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create Blob from canvas."));
        }
      }, "image/jpeg", 0.7);
    };
  });
};

export const uploadFileAndGetURL = async (path, file) => {
  const storage = getStorage();
  const fileRef = storageRef(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};


export const handleImageUpload = async (file, imagePath, miniImagePath) => {
  try {
    const [standardImage, miniImage] = await Promise.all([
      resizeImage(file, 200),
      resizeImage(file, 50)
    ]);
    const [imageUrl, imageMiniUrl] = await Promise.all([
      uploadFileAndGetURL(imagePath, standardImage),
      uploadFileAndGetURL(miniImagePath, miniImage)
    ]);
    return { image: imageUrl, image_mini: imageMiniUrl };
  } catch (error) {
    console.error("[handleImageUpload] Error uploading image:", error.message);
    throw error;
  }
};


export const handleGalleryImageUpload = async (file, imagePath, thumbnailPath) => {
  try {
    // Assume resizeImageForGallery is defined elsewhere or is similar to resizeImage.
    const [largeImage, thumbnailImage] = await Promise.all([
      resizeImageForGallery(file, 800),
      resizeImageForGallery(file, 150)
    ]);
    const [imageUrl, thumbnailUrl] = await Promise.all([
      uploadFileAndGetURL(imagePath, largeImage),
      uploadFileAndGetURL(thumbnailPath, thumbnailImage)
    ]);
    return { image: imageUrl, thumbnail: thumbnailUrl };
  } catch (error) {
    console.error("[handleGalleryImageUpload] Error uploading image:", error.message);
    throw error;
  }
};
