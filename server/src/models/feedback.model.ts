import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  quizId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  questionFeedback?: {
    questionId: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionFeedbackSchema: Schema = new Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  comment: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters'],
  },
});

const FeedbackSchema: Schema = new Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: false,
      trim: true,
      maxlength: [2000, 'Comment cannot be more than 2000 characters'],
    },
    questionFeedback: {
      type: [QuestionFeedbackSchema],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
FeedbackSchema.index({ quizId: 1 });
FeedbackSchema.index({ userId: 1 });
FeedbackSchema.index({ quizId: 1, userId: 1 }, { unique: true }); // One feedback per user per quiz

export const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);