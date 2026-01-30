import { env } from './env.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const colors = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m', // Green
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
  reset: '\x1b[0m',
};

const shouldLog = (level: LogLevel): boolean => {
  const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  const minLevel = env.NODE_ENV === 'production' ? 'info' : 'debug';
  return levels.indexOf(level) >= levels.indexOf(minLevel);
};

const formatMessage = (level: LogLevel, message: string, meta?: unknown): string => {
  const timestamp = new Date().toISOString();
  const color = colors[level];
  const prefix = `${color}[${level.toUpperCase()}]${colors.reset}`;
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} ${prefix} ${message}${metaStr}`;
};

export const logger = {
  debug: (message: string, meta?: unknown) => {
    if (shouldLog('debug')) {
      console.log(formatMessage('debug', message, meta));
    }
  },
  info: (message: string, meta?: unknown) => {
    if (shouldLog('info')) {
      console.log(formatMessage('info', message, meta));
    }
  },
  warn: (message: string, meta?: unknown) => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message, meta));
    }
  },
  error: (message: string, meta?: unknown) => {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message, meta));
    }
  },
};
