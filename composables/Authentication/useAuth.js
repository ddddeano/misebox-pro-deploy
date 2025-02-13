// composables/Authentication/useAuth.js

import { useRouter, useNuxtApp } from '#app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  linkWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

// Import useMiseboxUser from its proper location

// Reactive state for the auth composable
const user = ref(null);
const loading = ref(false);
const error = ref(null);

export function useAuth() {
  const router = useRouter();
  const { $firebase } = useNuxtApp();

  // Ensure that Firebase auth is only accessed on the client.
  let auth;
  if (process.client && $firebase) {
    auth = $firebase.auth;
  } else {
    auth = null;
    console.warn('Firebase auth is not available during SSR.');
  }

  const { createMiseboxUser } = useMiseboxUser();

  const successfulSignUp = async () => {
    try {
      console.log('User Info for createMiseboxUser:', user.value);
      await createMiseboxUser({
        email: user.value.email,
        display_name: user.value.displayName || `User-${user.value.uid}`,
      });
      router.push(`/misebox-users/edit`);
    } catch (err) {
      console.error('Error during successfulSignUp:', err);
      throw err;
    }
  };

  const successfulSignIn = () => {
    if (user.value) {
      router.push(`/misebox-users/${user.value.uid}`);
    }
  };

  const signUp = async (email, password) => {
    if (!auth) return; // Avoid execution if auth is unavailable.
    loading.value = true;
    error.value = null;
    try {
      const credential = EmailAuthProvider.credential(email, password);

      // If the user is anonymous, link the account instead of signing out.
      if (auth.currentUser?.isAnonymous) {
        await linkWithCredential(auth.currentUser, credential);
        user.value = auth.currentUser; // Update the user ref.
        console.log('[useAuth] updating user ref:', user.value);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        user.value = result.user;
      }

      await successfulSignUp();
    } catch (err) {
      error.value = handleFirebaseError(err.code);
      console.error('Sign-up error:', err);
    } finally {
      loading.value = false;
    }
  };

  const logIn = async (email, password) => {
    if (!auth) return; // Avoid execution if auth is unavailable.
    loading.value = true;
    error.value = null;
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      user.value = result.user;
      successfulSignIn();
    } catch (err) {
      error.value = handleFirebaseError(err.code);
      console.error('Login error:', err);
    } finally {
      loading.value = false;
    }
  };

  const googleSignIn = async () => {
    if (!auth) return; // Avoid execution if auth is unavailable.
    const provider = new GoogleAuthProvider();
    loading.value = true;
    error.value = null;
    try {
      const result = await signInWithPopup(auth, provider);
      user.value = result.user;
      successfulSignIn();
    } catch (err) {
      error.value = 'Google sign-in failed. Please try again.';
      console.error('Google Sign-In Error:', err);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    if (!auth) return; // Avoid execution if auth is unavailable.
    try {
      await signOut(auth);
      user.value = null;
      router.push('/auth');
    } catch (err) {
      error.value = 'Error logging out.';
      console.error(err);
    }
  };

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email is already in use. Please log in or use a different email.';
      case 'auth/weak-password':
        return 'Password is too weak. It should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please provide a valid email.';
      case 'auth/user-not-found':
        return 'User not found. Please check your credentials or sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    logIn,
    googleSignIn,
    logout,
  };
}
