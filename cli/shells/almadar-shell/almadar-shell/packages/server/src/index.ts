/**
 * Server Entry Point
 */

import { initializeFirebase, env, logger } from '@almadar/server';

// Initialize Firebase before anything else uses it
initializeFirebase();

import { app } from './app.js';

const PORT = env.PORT || 3030;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
