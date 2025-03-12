import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe, updateProfile, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

// Register user
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  register
);

// Login user
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

// Get current user
router.get('/me', protect, getMe);

// Update profile
router.put(
  '/profile',
  protect,
  [
    body('name', 'Name is required').optional().not().isEmpty(),
    body('email', 'Please include a valid email').optional().isEmail(),
    body('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
  ],
  updateProfile
);

// Forgot password
router.post(
  '/forgot-password',
  [
    body('email', 'Please include a valid email').isEmail(),
  ],
  forgotPassword
);

// Reset password
router.put(
  '/reset-password/:resetToken',
  [
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  resetPassword
);

export default router;