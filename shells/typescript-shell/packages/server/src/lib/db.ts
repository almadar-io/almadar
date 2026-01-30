/**
 * Database Configuration
 * 
 * Supports both Prisma (SQL) and Firebase Admin (Firestore)
 * Generated apps can use either depending on the database option
 */

import admin from 'firebase-admin';
import { env } from './env.js';

// ============ Firebase Admin / Firestore ============

let firebaseApp: admin.app.App | null = null;

/**
 * Initialize Firebase Admin SDK
 */
function initializeFirebase(): admin.app.App {
  if (firebaseApp) {
    return firebaseApp;
  }

  // Check if already initialized
  if (admin.apps.length > 0) {
    firebaseApp = admin.apps[0]!;
    return firebaseApp;
  }

  // Check for emulator mode FIRST (no credentials needed)
  if (env.FIRESTORE_EMULATOR_HOST) {
    // Emulator mode - no credentials needed
    firebaseApp = admin.initializeApp({
      projectId: env.FIREBASE_PROJECT_ID || 'demo-project',
    });
    console.log(`🔧 Firebase Admin initialized for emulator: ${env.FIRESTORE_EMULATOR_HOST}`);
    return firebaseApp;
  }

  // Production mode - need credentials
  const serviceAccountPath = env.FIREBASE_SERVICE_ACCOUNT_PATH;
  
  if (serviceAccountPath) {
    // Use service account file
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const serviceAccount = require(serviceAccountPath);
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  } else if (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
    // Use inline service account credentials
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  } else if (env.FIREBASE_PROJECT_ID) {
    // Use application default credentials (for Cloud Run, etc.)
    firebaseApp = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  } else {
    // Emulator mode - use default credentials
    firebaseApp = admin.initializeApp({
      projectId: 'demo-project',
    });
  }

  return firebaseApp;
}

/**
 * Get Firestore instance
 */
export function getFirestore(): admin.firestore.Firestore {
  const app = initializeFirebase();
  const db = app.firestore();
  
  // Connect to emulator if configured
  if (env.FIRESTORE_EMULATOR_HOST) {
    db.settings({
      host: env.FIRESTORE_EMULATOR_HOST,
      ssl: false,
    });
  }
  
  return db;
}

/**
 * Get Firebase Auth instance
 */
export function getAuth(): admin.auth.Auth {
  const app = initializeFirebase();
  return app.auth();
}

// ============ Prisma (Optional - for SQL databases) ============

// Uncomment if using Prisma with SQL database
/*
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

const createPrismaClient = () => {
  return new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

export const db = globalThis.__db ?? createPrismaClient();

if (env.NODE_ENV !== 'production') {
  globalThis.__db = db;
}
*/

// Re-export admin for convenience
export { admin };

// Export db instance for handler convenience
export const db = getFirestore();
