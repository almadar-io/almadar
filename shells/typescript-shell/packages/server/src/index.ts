import { createServer } from 'http';
import { app } from './app';
import { env, setupEventBroadcast } from '@/lib';
import { logger } from '@/lib/logger';
import type { Socket } from 'net';

// Create HTTP server from Express app
const server = createServer(app);

// Setup WebSocket for cross-client event broadcast
setupEventBroadcast(server);

server.listen(env.PORT, '0.0.0.0', () => {
  logger.info(`🚀 Server running at http://localhost:${env.PORT}`);
  logger.info(`📝 Environment: ${env.NODE_ENV}`);
  logger.info(`🔌 WebSocket events at ws://localhost:${env.PORT}/ws/events`);
});

// Track connections for graceful shutdown
const connections = new Set<Socket>();

server.on('connection', (conn: Socket) => {
  connections.add(conn);
  conn.on('close', () => connections.delete(conn));
});

// Graceful shutdown
const shutdown = (signal: string) => {
  logger.info(`\n${signal} received, shutting down gracefully...`);

  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  // Force close connections after timeout
  setTimeout(() => {
    logger.warn('Forcing connections closed...');
    connections.forEach((conn) => conn.destroy());
  }, 5000);

  // Force exit after longer timeout
  setTimeout(() => {
    logger.error('Forced exit');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
// Note: SIGHUP is not handled to prevent issues with background processes

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err);
  shutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
});
