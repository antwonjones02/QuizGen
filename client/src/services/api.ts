import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Define base API
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Get token from auth state
      const token = (getState() as RootState).auth.token;
      
      // If token exists, add authorization header
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Document', 'Quiz', 'User'],
  endpoints: (builder) => ({
    // Documents
    getDocuments: builder.query({
      query: () => 'documents',
      providesTags: ['Document'],
    }),
    getDocument: builder.query({
      query: (id) => `documents/${id}`,
      providesTags: (result, error, id) => [{ type: 'Document', id }],
    }),
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: 'documents/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Document'],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Document'],
    }),
    
    // Quizzes
    getQuizzes: builder.query({
      query: () => 'quizzes',
      providesTags: ['Quiz'],
    }),
    getQuiz: builder.query({
      query: (id) => `quizzes/${id}`,
      providesTags: (result, error, id) => [{ type: 'Quiz', id }],
    }),
    createQuiz: builder.mutation({
      query: (quiz) => ({
        url: 'quizzes',
        method: 'POST',
        body: quiz,
      }),
      invalidatesTags: ['Quiz'],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, ...quiz }) => ({
        url: `quizzes/${id}`,
        method: 'PUT',
        body: quiz,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Quiz', id }],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `quizzes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'],
    }),
    
    // Questions
    generateQuestions: builder.mutation({
      query: (params) => ({
        url: 'questions/generate',
        method: 'POST',
        body: params,
      }),
    }),
    
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => 'auth/profile',
      providesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useGetQuizzesQuery,
  useGetQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useGenerateQuestionsMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
} = api;