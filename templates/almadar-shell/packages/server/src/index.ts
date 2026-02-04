/**
 * Server Entry Point
 */

import { app } from './app.js';
import { env, logger } from '@almadar/server';

const PORT = env.PORT || 3030;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
