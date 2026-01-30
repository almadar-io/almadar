import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  sendSignInLinkToEmail as firebaseSendSignInLinkToEmail,
  isSignInWithEmailLink as firebaseIsSignInWithEmailLink,
  signInWithEmailLink as firebaseSignInWithEmailLink,
  ActionCodeSettings,
} from 'firebase/auth';
import { auth, isPreviewMode } from '../../config/firebase';

const googleProvider = new GoogleAuthProvider();

/**
 * Auth service - provides authentication methods.
 * In preview mode (no Firebase config), these methods are no-ops.
 */
export const authService = {
  // Google Sign In
  signInWithGoogle: async () => {
    if (isPreviewMode || !auth) {
      console.info('Preview mode: signInWithGoogle is disabled');
      return null;
    }
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  // Email/Password Sign In
  signInWithEmail: async (email: string, password: string) => {
    if (isPreviewMode || !auth) {
      console.info('Preview mode: signInWithEmail is disabled');
      return null;
    }
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  // Email/Password Sign Up
  signUpWithEmail: async (email: string, password: string, displayName?: string) => {
    if (isPreviewMode || !auth) {
      console.info('Preview mode: signUpWithEmail is disabled');
      return null;
    }
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) {
      await updateProfile(result.user, { displayName });
    }

    return result.user;
  },

  // Sign Out
  signOut: async () => {
    if (isPreviewMode || !auth) {
      console.info('Preview mode: signOut is disabled');
      return;
    }
    await firebaseSignOut(auth);
  },

  // Email Link Authentication
  sendSignInLinkToEmail: async (email: string, actionCodeSettings: ActionCodeSettings) => {
    if (isPreviewMode || !auth) {
      console.info('Preview mode: sendSignInLinkToEmail is disabled');
      return;
    }
    await firebaseSendSignInLinkToEmail(auth, email, actionCodeSettings);
  },

  isSignInWithEmailLink: (emailLink: string): boolean => {
    if (isPreviewMode || !auth) {
      return false;
    }
    return firebaseIsSignInWithEmailLink(auth, emailLink);
  },

  signInWithEmailLink: async (email: string, emailLink: string) => {
    if (isPreviewMode || !auth) {
      console.info('Preview mode: signInWithEmailLink is disabled');
      return null;
    }
    const result = await firebaseSignInWithEmailLink(auth, email, emailLink);
    return result.user;
  },
};
