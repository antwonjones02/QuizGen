import { User } from './user.model';
import { Document } from './document.model';
import { Quiz } from './quiz.model';
import { QuizAttempt } from './quizAttempt.model';

// Re-export all models
export {
  User,
  Document,
  Quiz,
  QuizAttempt
};

// Export interfaces for type checking
export type { IUser } from './user.model';
export type { IDocument } from './document.model';
export type { IQuiz } from './quiz.model';
export type { IQuestion } from './question.model';
export type { IQuizAttempt } from './quizAttempt.model';