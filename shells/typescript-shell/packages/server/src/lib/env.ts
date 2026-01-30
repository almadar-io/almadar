import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('{{SERVER_PORT}}')
    .transform((val) => parseInt(val, 10)),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:{{CLIENT_PORT}}')
    .transform((val) => (val.includes(',') ? val.split(',').map((s) => s.trim()) : val)),
  
  // Database (Prisma/SQL) - optional
  DATABASE_URL: z.string().optional(),
  
  // Firebase/Firestore configuration
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  FIREBASE_SERVICE_ACCOUNT_PATH: z.string().optional(),
  FIRESTORE_EMULATOR_HOST: z.string().optional(),
  FIREBASE_AUTH_EMULATOR_HOST: z.string().optional(),
  
  // API configuration
  API_PREFIX: z.string().default('/api'),

  // Mock data configuration
  USE_MOCK_DATA: z.string().default('true').transform((v) => v === 'true'),
  MOCK_SEED: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
