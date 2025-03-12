import { User } from './user.model';
import { Document } from './document.model';
import { Quiz } from './quiz.model';
import { QuizAttempt } from './quizAttempt.model';
import { Feedback } from './feedback.model';

// Re-export all models
export {
  User,
  Document,
  Quiz,
  QuizAttempt,
  Feedback
};

// Export interfaces for type checking
export type { IUser } from './user.model';
export type { IDocument } from './document.model';
export type { IQuiz } from './quiz.model';
export type { IQuestion } from './question.model';
export type { IQuizAttempt } from './quizAttempt.model';
export type { IFeedback } from './feedback.model';