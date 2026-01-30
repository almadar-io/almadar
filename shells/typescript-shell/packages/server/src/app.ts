import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from '@/lib';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import { logger } from '@/lib/logger';
import { registerRoutes } from './routes.js';
import { initializeMockData } from './seedMockData.js';

export const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
  });
}

// Initialize mock data if enabled
if (env.USE_MOCK_DATA) {
  logger.info('Mock mode enabled - initializing in-memory data store');
  initializeMockData().catch((error) => {
    logger.error('Failed to initialize mock data:', error);
  });
}

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    mockMode: env.USE_MOCK_DATA,
  });
});

// Register all API routes
registerRoutes(app);

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);
