//server/utils/utilityFunctions.js
import { firestore, FieldValue } from './firebase';

// Utility functions to generate unique handles and codes
export async function isFieldValueUnique(collection, field, value) {
  const snapshot = await firestore.collection(collection).where(field, '==', value).get();
  return snapshot.empty;
}
export async function generateHandle(email) {
  const baseHandle = email ? email.split('@')[0].replace(/\s+/g, '').toLowerCase() : 'user';
  let handle = baseHandle;
  let suffix = 1;
  while (!await isFieldValueUnique('misebox-users', 'handle', handle)) {
    handle = `${baseHandle}${suffix}`;
    suffix++;
  }
  return handle;
}

export async function generateMiseCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let miseCode;
  do {
    miseCode = "MISO" + Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  } while (!await isFieldValueUnique('misebox-user-profiles', 'mise_code', miseCode));
  return miseCode;
}


export async function addAppToUser(userId, app) {
  const userRef = firestore.doc(`misebox-users/${userId}`);
  await userRef.update({
    user_apps: FieldValue.arrayUnion(app)
  });
}
