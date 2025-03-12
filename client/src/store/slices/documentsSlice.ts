import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  contentPreview?: string;
  userId: string;
}

interface DocumentsState {
  selectedDocument: Document | null;
  uploadProgress: number;
  isUploading: boolean;
  uploadError: string | null;
}

const initialState: DocumentsState = {
  selectedDocument: null,
  uploadProgress: 0,
  isUploading: false,
  uploadError: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    selectDocument: (state, action: PayloadAction<Document | null>) => {
      state.selectedDocument = action.payload;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
      if (action.payload === false) {
        state.uploadProgress = 0;
      }
    },
    setUploadError: (state, action: PayloadAction<string | null>) => {
      state.uploadError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.uploadDocument.matchPending,
        (state) => {
          state.isUploading = true;
          state.uploadError = null;
        }
      )
      .addMatcher(
        api.endpoints.uploadDocument.matchFulfilled,
        (state) => {
          state.isUploading = false;
          state.uploadProgress = 0;
        }
      )
      .addMatcher(
        api.endpoints.uploadDocument.matchRejected,
        (state, { error }) => {
          state.isUploading = false;
          state.uploadProgress = 0;
          state.uploadError = error.message || 'Upload failed';
        }
      )
      .addMatcher(
        api.endpoints.getDocument.matchFulfilled,
        (state, { payload }) => {
          state.selectedDocument = payload;
        }
      );
  },
});

export const {
  selectDocument,
  setUploadProgress,
  setIsUploading,
  setUploadError,
} = documentsSlice.actions;

export default documentsSlice.reducer;