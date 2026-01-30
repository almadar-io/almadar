/**
 * WebSocket Event Broadcast - Cross-client event synchronization
 *
 * Broadcasts server-side events to all connected clients via WebSocket.
 * This enables real-time updates across multiple browser clients.
 *
 * @packageDocumentation
 */

import { WebSocketServer, WebSocket, type RawData } from 'ws';
import type { Server, IncomingMessage } from 'http';
import { serverEventBus } from './eventBus.js';
import { logger } from './logger.js';

/**
 * Event structure for broadcasting
 */
interface BroadcastEvent {
  type: string;
  payload?: unknown;
  timestamp?: number;
  source?: Record<string, unknown>;
}

/**
 * WebSocket server instance (singleton)
 */
let wss: WebSocketServer | null = null;

/**
 * Setup WebSocket server for event broadcasting.
 *
 * Listens to all server events via wildcard and broadcasts to connected clients.
 *
 * @param server - HTTP server to attach WebSocket to
 * @param path - WebSocket endpoint path (default: '/ws/events')
 *
 * @example
 * ```typescript
 * import { createServer } from 'http';
 * import { setupEventBroadcast } from '@/lib/websocket';
 *
 * const server = createServer(app);
 * setupEventBroadcast(server);
 * ```
 */
export function setupEventBroadcast(server: Server, path: string = '/ws/events'): WebSocketServer {
  if (wss) {
    logger.warn('[WebSocket] Server already initialized');
    return wss;
  }

  wss = new WebSocketServer({ server, path });

  logger.info(`[WebSocket] Server listening at ${path}`);

  // Handle new connections
  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const clientId = req.headers['sec-websocket-key'] || 'unknown';
    logger.debug(`[WebSocket] Client connected: ${clientId}`);

    // Send welcome message
    ws.send(
      JSON.stringify({
        type: 'CONNECTED',
        timestamp: Date.now(),
        message: 'Connected to event stream',
      })
    );

    // Handle client messages (for future bidirectional communication)
    ws.on('message', (data: RawData) => {
      try {
        const message = JSON.parse(data.toString());
        logger.debug(`[WebSocket] Received from ${clientId}:`, message);

        // Handle client-to-server events if needed
        if (message.type && message.payload) {
          // Emit to server event bus with client source
          serverEventBus.emit(message.type, message.payload, {
            orbital: 'client',
            entity: clientId,
          });
        }
      } catch (error) {
        logger.error(`[WebSocket] Failed to parse message:`, error);
      }
    });

    ws.on('close', () => {
      logger.debug(`[WebSocket] Client disconnected: ${clientId}`);
    });

    ws.on('error', (error: Error) => {
      logger.error(`[WebSocket] Client error:`, error);
    });
  });

  // Subscribe to all server events and broadcast to clients
  serverEventBus.on('*', (event: unknown) => {
    if (!wss) return;

    const typedEvent = event as BroadcastEvent;
    const message = JSON.stringify({
      type: typedEvent.type,
      payload: typedEvent.payload,
      timestamp: typedEvent.timestamp,
      source: typedEvent.source,
    });

    let broadcastCount = 0;
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
        broadcastCount++;
      }
    });

    if (broadcastCount > 0) {
      logger.debug(`[WebSocket] Broadcast ${typedEvent.type} to ${broadcastCount} client(s)`);
    }
  });

  return wss;
}

/**
 * Get the WebSocket server instance (for testing or advanced usage)
 */
export function getWebSocketServer(): WebSocketServer | null {
  return wss;
}

/**
 * Close the WebSocket server
 */
export function closeWebSocketServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!wss) {
      resolve();
      return;
    }

    wss.close((err?: Error) => {
      if (err) {
        reject(err);
      } else {
        wss = null;
        resolve();
      }
    });
  });
}

/**
 * Get connected client count
 */
export function getConnectedClientCount(): number {
  if (!wss) return 0;
  return wss.clients.size;
}
