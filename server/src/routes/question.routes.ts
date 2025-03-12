import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth';
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  validateQuestion
} from '../controllers/question.controller';

const router = express.Router();

// Create a new question (add to existing quiz)
router.post(
  '/',
  protect,
  [
    body('quizId', 'Quiz ID is required').not().isEmpty(),
    body('text', 'Question text is required').not().isEmpty(),
    body('type', 'Question type must be multiple-choice, true-false, or short-answer')
      .isIn(['multiple-choice', 'true-false', 'short-answer']),
    body('options', 'Options are required for multiple-choice and true-false questions')
      .custom((options, { req }) => {
        if (['multiple-choice', 'true-false'].includes(req.body.type) && (!options || !Array.isArray(options))) {
          return false;
        }
        return true;
      }),
    body('difficulty', 'Difficulty must be easy, medium, or hard')
      .isIn(['easy', 'medium', 'hard']),
    body('points', 'Points must be a positive number').isInt({ min: 1 }),
  ],
  createQuestion
);

// Update a question
router.put(
  '/:id',
  protect,
  [
    body('text', 'Question text is required').optional().not().isEmpty(),
    body('type', 'Question type must be multiple-choice, true-false, or short-answer')
      .optional()
      .isIn(['multiple-choice', 'true-false', 'short-answer']),
    body('options', 'Options must be an array').optional().isArray(),
    body('difficulty', 'Difficulty must be easy, medium, or hard')
      .optional()
      .isIn(['easy', 'medium', 'hard']),
    body('points', 'Points must be a positive number').optional().isInt({ min: 1 }),
  ],
  updateQuestion
);

// Delete a question
router.delete(
  '/:id',
  protect,
  deleteQuestion
);

// Validate a question (check if it's well-formed)
router.post(
  '/validate',
  protect,
  [
    body('text', 'Question text is required').not().isEmpty(),
    body('type', 'Question type must be multiple-choice, true-false, or short-answer')
      .isIn(['multiple-choice', 'true-false', 'short-answer']),
    body('options', 'Options must be an array').isArray(),
  ],
  validateQuestion
);

export default router;