import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth';
import {
  generateQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
  getQuizAttempts,
  getQuizAttempt,
  submitFeedback
} from '../controllers/quiz.controller';

const router = express.Router();

// Generate a new quiz from a document
router.post(
  '/generate',
  protect,
  [
    body('documentId', 'Document ID is required').not().isEmpty(),
    body('title', 'Title is required').not().isEmpty(),
    body('numQuestions', 'Number of questions is required').isInt({ min: 1, max: 50 }),
    body('difficulty', 'Difficulty must be easy, medium, or hard').isIn(['easy', 'medium', 'hard']),
    body('questionTypes', 'Question types must be an array').isArray(),
  ],
  generateQuiz
);

// Get all quizzes for current user
router.get(
  '/',
  protect,
  getQuizzes
);

// Get single quiz
router.get(
  '/:id',
  protect,
  getQuiz
);

// Update quiz
router.put(
  '/:id',
  protect,
  [
    body('title', 'Title is required').optional().not().isEmpty(),
    body('description').optional(),
    body('questions', 'Questions must be an array').optional().isArray(),
  ],
  updateQuiz
);

// Delete quiz
router.delete(
  '/:id',
  protect,
  deleteQuiz
);

// Submit a quiz attempt
router.post(
  '/:id/attempt',
  protect,
  [
    body('answers', 'Answers are required').isArray(),
  ],
  submitQuizAttempt
);

// Get all attempts for a quiz
router.get(
  '/:id/attempts',
  protect,
  getQuizAttempts
);

// Get a specific attempt
router.get(
  '/attempts/:attemptId',
  protect,
  getQuizAttempt
);

// Submit feedback for a quiz
router.post(
  '/:id/feedback',
  protect,
  [
    body('rating', 'Rating is required and must be between 1 and 5').isInt({ min: 1, max: 5 }),
    body('comment').optional(),
    body('questionFeedback').optional().isArray(),
  ],
  submitFeedback
);

export default router;