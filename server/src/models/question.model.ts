import mongoose, { Document, Schema } from 'mongoose';

export interface IOption {
  text: string;
  isCorrect: boolean;
}

const OptionSchema: Schema = new Schema({
  text: {
    type: String,
    required: [true, 'Option text is required'],
    trim: true,
    maxlength: [500, 'Option text cannot be more than 500 characters'],
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export interface IQuestion extends Document {
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: IOption[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  sourceText?: string;
  sourceLocation?: string;
}

export const QuestionSchema: Schema = new Schema({
  text: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    maxlength: [1000, 'Question text cannot be more than 1000 characters'],
  },
  type: {
    type: String,
    required: [true, 'Question type is required'],
    enum: ['multiple-choice', 'true-false', 'short-answer'],
    default: 'multiple-choice',
  },
  options: {
    type: [OptionSchema],
    required: function(this: IQuestion) {
      return this.type === 'multiple-choice' || this.type === 'true-false';
    },
    validate: {
      validator: function(options: IOption[]) {
        if (this.type === 'multiple-choice') {
          // Must have at least 2 options and at least one correct answer
          return options.length >= 2 && options.some(option => option.isCorrect);
        } else if (this.type === 'true-false') {
          // Must have exactly 2 options (true and false) and exactly one correct answer
          return options.length === 2 && options.filter(option => option.isCorrect).length === 1;
        }
        return true; // For short-answer, options are not required
      },
      message: 'Question options are invalid for the selected question type',
    },
  },
  explanation: {
    type: String,
    required: false,
    trim: true,
    maxlength: [2000, 'Explanation cannot be more than 2000 characters'],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  points: {
    type: Number,
    required: true,
    min: [1, 'Points must be at least 1'],
    max: [100, 'Points cannot exceed 100'],
    default: 1,
  },
  sourceText: {
    type: String,
    required: false,
    trim: true,
    maxlength: [2000, 'Source text cannot be more than 2000 characters'],
  },
  sourceLocation: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, 'Source location cannot be more than 500 characters'],
  },
});

// We don't export a model here since this schema is used within the Quiz model
// But we could create a standalone model if needed:
// export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);