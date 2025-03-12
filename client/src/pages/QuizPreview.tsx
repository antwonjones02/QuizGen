import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  ShareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useGetQuizQuery } from '../services/api';
import { QuestionType } from '../store/slices/quizSlice';

const QuizPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: quiz, isLoading, error } = useGetQuizQuery(id || '');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState('pdf');

  // Mock quiz data for initial UI development
  const mockQuiz = {
    id: '1',
    title: 'Introduction to Machine Learning Quiz',
    description: 'A comprehensive quiz covering the fundamentals of machine learning concepts and algorithms.',
    documentId: '1',
    questions: [
      {
        id: '101',
        text: 'What is the difference between supervised and unsupervised learning?',
        type: QuestionType.ESSAY,
        bloomLevel: 'COMPREHENSION',
        explanation: 'This question tests understanding of the fundamental categorization of machine learning approaches.',
        sourceReference: 'Chapter 1, Page 12',
        difficultyScore: 3,
        tags: ['machine learning', 'fundamentals'],
      },
      {
        id: '102',
        text: 'Which of the following algorithms is NOT a supervised learning algorithm?',
        type: QuestionType.MULTIPLE_CHOICE,
        bloomLevel: 'KNOWLEDGE',
        options: [
          { id: '1', text: 'Linear Regression', isCorrect: false },
          { id: '2', text: 'K-means Clustering', isCorrect: true },
          { id: '3', text: 'Support Vector Machines', isCorrect: false },
          { id: '4', text: 'Decision Trees', isCorrect: false },
        ],
        explanation: 'K-means clustering is an unsupervised learning algorithm used for clustering similar data points.',
        sourceReference: 'Chapter 2, Page 45',
        difficultyScore: 2,
        tags: ['algorithms', 'classification'],
      },
      {
        id: '103',
        text: 'Explain how the backpropagation algorithm works in neural networks.',
        type: QuestionType.ESSAY,
        bloomLevel: 'ANALYSIS',
        explanation: 'This question requires a detailed understanding of how neural networks learn through the backpropagation process.',
        sourceReference: 'Chapter 5, Page 132',
        difficultyScore: 4,
        tags: ['neural networks', 'deep learning'],
      },
    ],
    createdAt: '2023-05-20T15:30:00Z',
    updatedAt: '2023-05-20T15:30:00Z',
    userId: 'user1',
  };

  const displayQuiz = quiz || mockQuiz;

  const toggleQuestion = (questionId: string) => {
    if (expandedQuestions.includes(questionId)) {
      setExpandedQuestions(expandedQuestions.filter(id => id !== questionId));
    } else {
      setExpandedQuestions([...expandedQuestions, questionId]);
    }
  };

  const handleExport = () => {
    // Mock export functionality
    alert(`Exporting quiz as ${exportFormat.toUpperCase()}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Error loading quiz</div>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          There was a problem loading the quiz. Please try again.
        </p>
        <Link to="/documents" className="mt-4 btn btn-primary">
          Back to Documents
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Link to="/documents" className="mr-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{displayQuiz.title}</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Created on {formatDate(displayQuiz.createdAt)}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="relative inline-block">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleExport}
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
          <button
            type="button"
            className="btn btn-outline"
          >
            <PrinterIcon className="h-5 w-5 mr-2" />
            Print
          </button>
          <button
            type="button"
            className="btn btn-outline"
          >
            <ShareIcon className="h-5 w-5 mr-2" />
            Share
          </button>
          <Link
            to={`/edit/${displayQuiz.id}`}
            className="btn btn-primary"
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Edit Quiz
          </Link>
        </div>
      </div>

      {displayQuiz.description && (
        <div className="card p-6">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Description</h2>
          <p className="text-neutral-700 dark:text-neutral-300">{displayQuiz.description}</p>
        </div>
      )}

      <div className="card">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">
              Questions ({displayQuiz.questions.length})
            </h2>
            <div className="flex items-center">
              <select
                className="form-select text-sm"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
              </select>
              <button
                type="button"
                className="ml-2 btn btn-outline"
                onClick={handleExport}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {displayQuiz.questions.map((question, index) => {
            const isExpanded = expandedQuestions.includes(question.id);
            
            return (
              <div key={question.id} className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-lg font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                        {question.text}
                      </h3>
                      <button
                        type="button"
                        className="ml-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                        onClick={() => toggleQuestion(question.id)}
                      >
                        {isExpanded ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    
                    <div className="mt-1 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="mr-3">
                        {question.bloomLevel.charAt(0) + question.bloomLevel.slice(1).toLowerCase()}
                      </span>
                      <span className="mr-3">
                        {question.type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                      </span>
                      <span>
                        Difficulty: {question.difficultyScore}/5
                      </span>
                    </div>
                    
                    {question.type === QuestionType.MULTIPLE_CHOICE && question.options && (
                      <div className="mt-4 space-y-2">
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                              option.isCorrect
                                ? 'bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400'
                                : 'border-neutral-300 dark:border-neutral-600'
                            }`}>
                              {option.isCorrect && (
                                <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="ml-2 text-neutral-700 dark:text-neutral-300">
                              {option.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {isExpanded && (
                      <div className="mt-4 space-y-3">
                        {question.explanation && (
                          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
                            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </p>
                          </div>
                        )}
                        
                        {question.sourceReference && (
                          <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              <span className="font-medium">Source:</span> {question.sourceReference}
                            </p>
                          </div>
                        )}
                        
                        {question.tags && question.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;