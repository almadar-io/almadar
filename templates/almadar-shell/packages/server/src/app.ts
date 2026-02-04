/**
 * Express Application Setup
 */

import express from 'express';
import {
  env,
  logger,
  errorHandler,
  notFoundHandler,
} from '@almadar/server';
import { registerRoutes } from './routes.js';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Register generated routes
registerRoutes(app);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);
