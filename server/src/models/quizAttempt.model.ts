import mongoose, { Document, Schema } from 'mongoose';

interface IAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedOptions?: string[];
  textAnswer?: string;
  isCorrect: boolean;
  points: number;
}

const AnswerSchema: Schema = new Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  selectedOptions: {
    type: [String],
    required: false,
  },
  textAnswer: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, 'Text answer cannot be more than 1000 characters'],
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
});

export interface IQuizAttempt extends Document {
  quizId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answers: IAnswer[];
  score: number;
  maxScore: number;
  percentageScore: number;
  startedAt: Date;
  completedAt?: Date;
  timeSpent?: number; // in seconds
  status: 'in-progress' | 'completed' | 'abandoned';
  createdAt: Date;
  updatedAt: Date;
}

const QuizAttemptSchema: Schema = new Schema(
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
    answers: {
      type: [AnswerSchema],
      required: true,
      default: [],
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    maxScore: {
      type: Number,
      required: true,
      default: 0,
    },
    percentageScore: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    timeSpent: {
      type: Number, // in seconds
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
QuizAttemptSchema.index({ userId: 1, quizId: 1 });
QuizAttemptSchema.index({ quizId: 1 });
QuizAttemptSchema.index({ userId: 1, status: 1 });

// Pre-save middleware to calculate percentageScore
QuizAttemptSchema.pre('save', function(next) {
  if (this.maxScore > 0) {
    this.percentageScore = Math.round((this.score / this.maxScore) * 100);
  }
  
  // Calculate timeSpent if completedAt is set
  if (this.completedAt && this.startedAt) {
    this.timeSpent = Math.round((this.completedAt.getTime() - this.startedAt.getTime()) / 1000);
  }
  
  next();
});

export const QuizAttempt = mongoose.model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);