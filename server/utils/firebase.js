import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import serviceAccount from '../../config/service-account.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'misebox-78f9c.appspot.com', // Fallback to a hardcoded bucket if env var is missing
});

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Export Storage
export { FieldValue, Timestamp };
