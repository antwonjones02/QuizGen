import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface ErrorResponse extends Error {
  statusCode?: number;
  code?: number;
  errors?: any[];
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log the error for server-side debugging
  logger.error(`${err.name}: ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new Error(message) as ErrorResponse;
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message) as ErrorResponse;
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {})
      .map((val: any) => val.message)
      .join(', ');
    error = new Error(message) as ErrorResponse;
    error.statusCode = 400;
  }

  // Express validator errors
  if (err.name === 'ExpressValidationError') {
    const message = 'Validation failed';
    error = new Error(message) as ErrorResponse;
    error.statusCode = 400;
    error.errors = err.errors;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new Error(message) as ErrorResponse;
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new Error(message) as ErrorResponse;
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(error.errors && { errors: error.errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};