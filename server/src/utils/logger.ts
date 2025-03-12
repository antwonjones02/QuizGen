import winston from 'winston';
import path from 'path';

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create the logger
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    logFormat
  ),
  defaultMeta: { service: 'quizgen-api' },
  transports: [
    // Console transport for all environments
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        logFormat
      ),
    }),
    
    // File transport for production
    ...(process.env.NODE_ENV === 'production'
      ? [
          // Error log
          new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 10485760, // 10MB
            maxFiles: 5,
          }),
          // Combined log
          new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 10485760, // 10MB
            maxFiles: 5,
          }),
        ]
      : []),
  ],
  // Handle uncaught exceptions and rejections
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        logFormat
      ),
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: path.join('logs', 'exceptions.log'),
            maxsize: 10485760, // 10MB
            maxFiles: 5,
          }),
        ]
      : []),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        logFormat
      ),
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: path.join('logs', 'rejections.log'),
            maxsize: 10485760, // 10MB
            maxFiles: 5,
          }),
        ]
      : []),
  ],
});

// If we're not in production, also log to the console with colorized output
if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized in development mode');
}