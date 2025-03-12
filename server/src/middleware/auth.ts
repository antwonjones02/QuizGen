import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { logger } from '../utils/logger';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      });
      return;
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret'
      ) as JwtPayload;

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      // Set user in request object
      req.user = user;
      next();
    } catch (error) {
      logger.error('JWT verification failed', { error });
      res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

// Admin middleware
export const admin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: 'Not authorized as an admin',
    });
  }
};