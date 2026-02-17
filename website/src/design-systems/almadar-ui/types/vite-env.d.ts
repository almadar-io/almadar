/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_WS_URL?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  // Add more env vars as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
