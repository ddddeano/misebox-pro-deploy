// File: server/api/google-photo.js
import { defineEventHandler, getQuery, createError } from 'h3';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default defineEventHandler(async (event) => {
  // Now we expect "photo_url" and "storagePath" as query parameters.
  const { photo_url, storagePath } = getQuery(event);

  if (!photo_url || !storagePath) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Both "photo_url" and "storagePath" are required.',
    });
  }

  try {
    console.log('[Google Photo Proxy] Fetching:', photo_url);

    // Send request from your Nuxt server (not the browser)
    const response = await fetch(photo_url, { redirect: "follow" });

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Google API Error: ${response.statusText}`,
      });
    }

    const imageBuffer = await response.arrayBuffer();

    // Upload image to Firebase Storage using the provided storagePath.
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, Buffer.from(imageBuffer), {
      contentType: response.headers.get("Content-Type") || "image/jpeg",
    });

    const firebaseUrl = await getDownloadURL(storageRef);

    console.log(`[Google Photo Proxy] Uploaded: ${firebaseUrl}`);

    return { firebaseUrl };
  } catch (error) {
    console.error('[Google Photo Proxy Error]', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch/process image.',
    });
  }
});
