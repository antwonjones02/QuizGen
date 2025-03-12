import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
  MATCHING = 'MATCHING',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
}

export enum BloomLevel {
  KNOWLEDGE = 'KNOWLEDGE',
  COMPREHENSION = 'COMPREHENSION',
  APPLICATION = 'APPLICATION',
  ANALYSIS = 'ANALYSIS',
  SYNTHESIS = 'SYNTHESIS',
  EVALUATION = 'EVALUATION',
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  bloomLevel: BloomLevel;
  options?: QuestionOption[];
  correctAnswer?: string;
  explanation: string;
  sourceReference: string;
  difficultyScore: number;
  tags: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  documentId: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface QuizGenerationOptions {
  documentId: string;
  questionCount: number;
  bloomLevels: BloomLevel[];
  questionTypes: QuestionType[];
  topics?: string[];
  difficultyRange: {
    min: number;
    max: number;
  };
  includeExplanations: boolean;
  includeSourceReferences: boolean;
}

interface QuizState {
  currentQuiz: Quiz | null;
  generatedQuestions: Question[];
  generationOptions: QuizGenerationOptions;
  isGenerating: boolean;
  generationError: string | null;
}

const initialState: QuizState = {
  currentQuiz: null,
  generatedQuestions: [],
  generationOptions: {
    documentId: '',
    questionCount: 10,
    bloomLevels: [
      BloomLevel.KNOWLEDGE,
      BloomLevel.COMPREHENSION,
      BloomLevel.APPLICATION,
      BloomLevel.ANALYSIS,
    ],
    questionTypes: [
      QuestionType.MULTIPLE_CHOICE,
      QuestionType.SHORT_ANSWER,
      QuestionType.ESSAY,
    ],
    difficultyRange: {
      min: 1,
      max: 5,
    },
    includeExplanations: true,
    includeSourceReferences: true,
  },
  isGenerating: false,
  generationError: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
    },
    setGeneratedQuestions: (state, action: PayloadAction<Question[]>) => {
      state.generatedQuestions = action.payload;
    },
    updateGenerationOptions: (
      state,
      action: PayloadAction<Partial<QuizGenerationOptions>>
    ) => {
      state.generationOptions = {
        ...state.generationOptions,
        ...action.payload,
      };
    },
    addQuestionToQuiz: (state, action: PayloadAction<Question>) => {
      if (state.currentQuiz) {
        state.currentQuiz.questions.push(action.payload);
      }
    },
    removeQuestionFromQuiz: (state, action: PayloadAction<string>) => {
      if (state.currentQuiz) {
        state.currentQuiz.questions = state.currentQuiz.questions.filter(
          (q) => q.id !== action.payload
        );
      }
    },
    updateQuestionInQuiz: (state, action: PayloadAction<Question>) => {
      if (state.currentQuiz) {
        const index = state.currentQuiz.questions.findIndex(
          (q) => q.id === action.payload.id
        );
        if (index !== -1) {
          state.currentQuiz.questions[index] = action.payload;
        }
      }
    },
    clearGeneratedQuestions: (state) => {
      state.generatedQuestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.generateQuestions.matchPending,
        (state) => {
          state.isGenerating = true;
          state.generationError = null;
        }
      )
      .addMatcher(
        api.endpoints.generateQuestions.matchFulfilled,
        (state, { payload }) => {
          state.isGenerating = false;
          state.generatedQuestions = payload;
        }
      )
      .addMatcher(
        api.endpoints.generateQuestions.matchRejected,
        (state, { error }) => {
          state.isGenerating = false;
          state.generationError = error.message || 'Generation failed';
        }
      )
      .addMatcher(
        api.endpoints.getQuiz.matchFulfilled,
        (state, { payload }) => {
          state.currentQuiz = payload;
        }
      );
  },
});

export const {
  setCurrentQuiz,
  setGeneratedQuestions,
  updateGenerationOptions,
  addQuestionToQuiz,
  removeQuestionFromQuiz,
  updateQuestionInQuiz,
  clearGeneratedQuestions,
} = quizSlice.actions;

export default quizSlice.reducer;