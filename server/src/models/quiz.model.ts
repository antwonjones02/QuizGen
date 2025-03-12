import mongoose, { Document, Schema } from 'mongoose';
import { IQuestion, QuestionSchema } from './question.model';

export interface IQuiz extends Document {
  title: string;
  description?: string;
  documentId: mongoose.Types.ObjectId;
  questions: IQuestion[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
      validate: {
        validator: function(questions: IQuestion[]) {
          return questions.length > 0;
        },
        message: 'Quiz must have at least one question',
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster queries
QuizSchema.index({ userId: 1 });
QuizSchema.index({ documentId: 1 });
QuizSchema.index({ title: 'text' });

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);