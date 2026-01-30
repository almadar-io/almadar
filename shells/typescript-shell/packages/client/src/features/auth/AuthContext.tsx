import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, isPreviewMode } from '../../config/firebase';
import { authService } from './authService';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Mock user for preview mode
const PREVIEW_USER = {
  uid: 'preview-user',
  email: 'preview@example.com',
  displayName: 'Preview User',
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
} as unknown as User;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // In preview mode, use mock user; otherwise null until Firebase auth loads
  const [user, setUserState] = useState<User | null>(isPreviewMode ? PREVIEW_USER : null);
  const [loading, setLoading] = useState(!isPreviewMode);
  const [error, setError] = useState<string | null>(null);
  const [onAuthSuccess, setOnAuthSuccess] = useState<(() => void) | undefined>(undefined);

  useEffect(() => {
    // Skip Firebase auth listener in preview mode
    if (isPreviewMode || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserState(user);
      setLoading(false);

      // Call the auth success callback if it exists
      if (user && onAuthSuccess) {
        onAuthSuccess();
      }
    });

    return () => unsubscribe();
  }, [onAuthSuccess]);

  const clearError = () => setError(null);

  const signInWithGoogle = async () => {
    // In preview mode, auth methods are no-ops (user is already set)
    if (isPreviewMode) {
      console.info('Preview mode: signInWithGoogle skipped');
      return;
    }
    try {
      setLoading(true);
      clearError();
      await authService.signInWithGoogle();
    } catch (err: unknown) {
      setLoading(false);
      const error = err as { code?: string; message?: string };
      const isUserCancellation = error.code === 'auth/popup-closed-by-user' ||
                                  error.code === 'auth/cancelled-popup-request' ||
                                  error.code === 'auth/popup-blocked';
      if (!isUserCancellation) {
        setError(error.message || 'Sign in failed');
      } else {
        clearError();
      }
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (isPreviewMode) {
      console.info('Preview mode: signInWithEmail skipped');
      return;
    }
    try {
      setLoading(true);
      clearError();
      await authService.signInWithEmail(email, password);
    } catch (err: unknown) {
      setLoading(false);
      const error = err as { message?: string };
      setError(error.message || 'Sign in failed');
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    if (isPreviewMode) {
      console.info('Preview mode: signUpWithEmail skipped');
      return;
    }
    try {
      setLoading(true);
      clearError();
      await authService.signUpWithEmail(email, password, displayName);
    } catch (err: unknown) {
      setLoading(false);
      const error = err as { message?: string };
      setError(error.message || 'Sign up failed');
    }
  };

  const sendSignInLinkToEmail = async (email: string) => {
    if (isPreviewMode) {
      console.info('Preview mode: sendSignInLinkToEmail skipped');
      return;
    }
    try {
      setLoading(true);
      clearError();
      const actionCodeSettings = {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      };
      await authService.sendSignInLinkToEmail(email, actionCodeSettings);
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      const error = err as { message?: string };
      setError(error.message || 'Failed to send sign-in link');
    }
  };

  const signInWithEmailLink = async (email: string, emailLink: string) => {
    if (isPreviewMode) {
      console.info('Preview mode: signInWithEmailLink skipped');
      return;
    }
    try {
      setLoading(true);
      clearError();
      await authService.signInWithEmailLink(email, emailLink);
    } catch (err: unknown) {
      setLoading(false);
      const error = err as { message?: string };
      setError(error.message || 'Sign in failed');
    }
  };

  const isSignInWithEmailLink = (emailLink: string): boolean => {
    if (isPreviewMode) return false;
    return authService.isSignInWithEmailLink(emailLink);
  };

  const signOut = async () => {
    if (isPreviewMode) {
      console.info('Preview mode: signOut skipped');
      return;
    }
    try {
      setLoading(true);
      await authService.signOut();
      setUserState(null);
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      const error = err as { message?: string };
      setError(error.message || 'Sign out failed');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isPreviewMode,
    signInWithGoogle,
    signOut,
    signInWithEmail,
    signUpWithEmail,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    onAuthSuccess,
    setOnAuthSuccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
