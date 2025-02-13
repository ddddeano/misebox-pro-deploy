// composables/Utils/useDocumentUpload.js
// composables/utils/useDocumentUpload.js
import { ref } from 'vue';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export function useDocumentUpload() {
  const firestore = useFirestore();
  const storage = getStorage();
  const isUploading = ref(false);
  const uploadProgress = ref(0);

  const uploadDocumentToStorage = async (file, storagePath) => {
    return new Promise((resolve, reject) => {
      try {
        const storageReference = storageRef(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageReference, file);

        isUploading.value = true;
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Update progress as upload progresses
            uploadProgress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            isUploading.value = false;
            reject(new Error('Failed to upload document: ' + error.message));
          },
          async () => {
            // On successful upload, retrieve download URL
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              isUploading.value = false;
              uploadProgress.value = 100;
              resolve(downloadURL);
            } catch (error) {
              isUploading.value = false;
              reject(new Error('Failed to retrieve document URL'));
            }
          }
        );
      } catch (error) {
        isUploading.value = false;
        reject(new Error('Failed to initiate upload'));
      }
    });
  };

  const updateDocumentURLInFirestore = async (collectionName, documentID, documentURL, targetField) => {
    try {
      const documentRef = doc(firestore, `${collectionName}/${documentID}`);
      await updateDoc(documentRef, { [targetField]: documentURL });
    } catch (error) {
      throw new Error('Failed to update Firestore document URL: ' + error.message);
    }
  };

  const resetUploadProgress = () => {
    uploadProgress.value = 0;
    isUploading.value = false;
  };

  return {
    uploadDocumentToStorage,
    updateDocumentURLInFirestore,
    isUploading,
    uploadProgress,
    resetUploadProgress,
  };
}
