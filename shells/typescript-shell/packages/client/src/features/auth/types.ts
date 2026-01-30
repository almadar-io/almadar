import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  displayName?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  /** True when running in preview mode without Firebase */
  isPreviewMode: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  sendSignInLinkToEmail: (email: string) => Promise<void>;
  signInWithEmailLink: (email: string, emailLink: string) => Promise<void>;
  isSignInWithEmailLink: (emailLink: string) => boolean;
  onAuthSuccess?: () => void;
  setOnAuthSuccess: (callback: () => void) => void;
}
