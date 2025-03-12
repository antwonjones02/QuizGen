import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  LightBulbIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { RootState } from '../store';
import {
  updateGenerationOptions,
  BloomLevel,
  QuestionType,
  setGeneratedQuestions,
  clearGeneratedQuestions,
} from '../store/slices/quizSlice';
import { useGetDocumentsQuery, useGenerateQuestionsMutation, useCreateQuizMutation } from '../services/api';

const QuizCreator: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentIdFromUrl = queryParams.get('documentId');

  const { generationOptions, generatedQuestions, isGenerating } = useSelector(
    (state: RootState) => state.quiz
  );
  
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState(documentIdFromUrl || '');
  const [activeTab, setActiveTab] = useState('options');
  
  const { data: documents, isLoading: isLoadingDocuments } = useGetDocumentsQuery();
  const [generateQuestions, { isLoading: isGeneratingQuestions }] = useGenerateQuestionsMutation();
  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();

  // Mock documents for initial UI development
  const mockDocuments = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      fileName: 'intro-to-ml.pdf',
      fileType: 'pdf',
      fileSize: 2500000,
      uploadDate: '2023-05-15T10:30:00Z',
      processingStatus: 'completed',
      userId: 'user1',
    },
    {
      id: '2',
      title: 'Data Structures and Algorithms',
      fileName: 'data-structures.docx',
      fileType: 'docx',
      fileSize: 1800000,
      uploadDate: '2023-05-10T14:20:00Z',
      processingStatus: 'completed',
      userId: 'user1',
    },
    {
      id: '3',
      title: 'Web Development Fundamentals',
      fileName: 'web-dev.pdf',
      fileType: 'pdf',
      fileSize: 3200000,
      uploadDate: '2023-05-05T09:15:00Z',
      processingStatus: 'completed',
      userId: 'user1',
    },
  ];

  const displayDocuments = documents || mockDocuments;

  useEffect(() => {
    if (documentIdFromUrl) {
      setSelectedDocumentId(documentIdFromUrl);
      dispatch(updateGenerationOptions({ documentId: documentIdFromUrl }));
    }
  }, [documentIdFromUrl, dispatch]);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const docId = e.target.value;
    setSelectedDocumentId(docId);
    dispatch(updateGenerationOptions({ documentId: docId }));
  };

  const handleQuestionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count > 0) {
      dispatch(updateGenerationOptions({ questionCount: count }));
    }
  };

  const handleBloomLevelChange = (level: BloomLevel) => {
    const currentLevels = [...generationOptions.bloomLevels];
    const index = currentLevels.indexOf(level);
    
    if (index === -1) {
      currentLevels.push(level);
    } else {
      currentLevels.splice(index, 1);
    }
    
    dispatch(updateGenerationOptions({ bloomLevels: currentLevels }));
  };

  const handleQuestionTypeChange = (type: QuestionType) => {
    const currentTypes = [...generationOptions.questionTypes];
    const index = currentTypes.indexOf(type);
    
    if (index === -1) {
      currentTypes.push(type);
    } else {
      currentTypes.splice(index, 1);
    }
    
    dispatch(updateGenerationOptions({ questionTypes: currentTypes }));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>, bound: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      const difficultyRange = { ...generationOptions.difficultyRange };
      difficultyRange[bound] = value;
      
      // Ensure min <= max
      if (bound === 'min' && difficultyRange.min > difficultyRange.max) {
        difficultyRange.max = difficultyRange.min;
      } else if (bound === 'max' && difficultyRange.max < difficultyRange.min) {
        difficultyRange.min = difficultyRange.max;
      }
      
      dispatch(updateGenerationOptions({ difficultyRange }));
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedDocumentId) {
      alert('Please select a document first.');
      return;
    }
    
    try {
      const result = await generateQuestions(generationOptions).unwrap();
      dispatch(setGeneratedQuestions(result));
      setActiveTab('questions');
    } catch (error) {
      console.error('Failed to generate questions:', error);
    }
  };

  const handleSaveQuiz = async () => {
    if (!quizTitle.trim()) {
      alert('Please enter a quiz title.');
      return;
    }
    
    if (generatedQuestions.length === 0) {
      alert('Please generate questions first.');
      return;
    }
    
    try {
      const newQuiz = {
        title: quizTitle,
        description: quizDescription,
        documentId: selectedDocumentId,
        questions: generatedQuestions,
      };
      
      const result = await createQuiz(newQuiz).unwrap();
      dispatch(clearGeneratedQuestions());
      navigate(`/preview/${result.id}`);
    } catch (error) {
      console.error('Failed to save quiz:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Create Quiz</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Generate thought-provoking questions from your documents.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="border-b border-neutral-200 dark:border-neutral-700">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'options'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('options')}
            >
              <AdjustmentsHorizontalIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              Generation Options
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'questions'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('questions')}
            >
              <LightBulbIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              Generated Questions
              {generatedQuestions.length > 0 && (
                <span className="ml-2 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 py-0.5 px-2 rounded-full text-xs">
                  {generatedQuestions.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'options' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="quizTitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    id="quizTitle"
                    className="mt-1 form-input"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <label htmlFor="document" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Source Document
                  </label>
                  <select
                    id="document"
                    className="mt-1 form-select"
                    value={selectedDocumentId}
                    onChange={handleDocumentChange}
                  >
                    <option value="">Select a document</option>
                    {isLoadingDocuments ? (
                      <option disabled>Loading documents...</option>
                    ) : (
                      displayDocuments.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.title}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quizDescription" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Quiz Description
                </label>
                <textarea
                  id="quizDescription"
                  rows={3}
                  className="mt-1 form-input"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Enter quiz description"
                />
              </div>

              <div>
                <label htmlFor="questionCount" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Number of Questions
                </label>
                <input
                  type="number"
                  id="questionCount"
                  min="1"
                  max="50"
                  className="mt-1 form-input w-full md:w-1/4"
                  value={generationOptions.questionCount}
                  onChange={handleQuestionCountChange}
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Bloom's Taxonomy Levels
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                  {Object.values(BloomLevel).map((level) => (
                    <label key={level} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={generationOptions.bloomLevels.includes(level)}
                        onChange={() => handleBloomLevelChange(level)}
                      />
                      <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                        {level.charAt(0) + level.slice(1).toLowerCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Question Types
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                  {Object.values(QuestionType).map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={generationOptions.questionTypes.includes(type)}
                        onChange={() => handleQuestionTypeChange(type)}
                      />
                      <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                        {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Difficulty Range (1-5)
                </span>
                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="minDifficulty" className="block text-sm text-neutral-500 dark:text-neutral-400">
                      Minimum
                    </label>
                    <input
                      type="number"
                      id="minDifficulty"
                      min="1"
                      max="5"
                      className="mt-1 form-input"
                      value={generationOptions.difficultyRange.min}
                      onChange={(e) => handleDifficultyChange(e, 'min')}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxDifficulty" className="block text-sm text-neutral-500 dark:text-neutral-400">
                      Maximum
                    </label>
                    <input
                      type="number"
                      id="maxDifficulty"
                      min="1"
                      max="5"
                      className="mt-1 form-input"
                      value={generationOptions.difficultyRange.max}
                      onChange={(e) => handleDifficultyChange(e, 'max')}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={generationOptions.includeExplanations}
                      onChange={(e) => dispatch(updateGenerationOptions({ includeExplanations: e.target.checked }))}
                    />
                    <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                      Include explanations
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={generationOptions.includeSourceReferences}
                      onChange={(e) => dispatch(updateGenerationOptions({ includeSourceReferences: e.target.checked }))}
                    />
                    <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                      Include source references
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerateQuestions}
                  disabled={isGeneratingQuestions || !selectedDocumentId}
                >
                  {isGeneratingQuestions ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <LightBulbIcon className="h-5 w-5 mr-2" />
                      Generate Questions
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {generatedQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <LightBulbIcon className="mx-auto h-12 w-12 text-neutral-400" />
                  <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">No questions generated</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Configure your options and generate questions to see them here.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setActiveTab('options')}
                    >
                      Configure Options
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                      Generated Questions ({generatedQuestions.length})
                    </h3>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleGenerateQuestions}
                    >
                      <ArrowPathIcon className="h-5 w-5 mr-2" />
                      Regenerate
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {generatedQuestions.map((question, index) => (
                      <div key={question.id} className="card p-4 border border-neutral-200 dark:border-neutral-700">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="ml-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                              {question.bloomLevel.charAt(0) + question.bloomLevel.slice(1).toLowerCase()} | 
                              {question.type.split('_').map(word => ' ' + word.charAt(0) + word.slice(1).toLowerCase())}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                              title="Include in quiz"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Exclude from quiz"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-neutral-900 dark:text-white font-medium">
                            {question.text}
                          </p>
                          
                          {question.type === QuestionType.MULTIPLE_CHOICE && question.options && (
                            <div className="mt-3 space-y-2">
                              {question.options.map((option) => (
                                <div key={option.id} className="flex items-start">
                                  <div className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                                    option.isCorrect
                                      ? 'bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400'
                                      : 'border-neutral-300 dark:border-neutral-600'
                                  }`}>
                                    {option.isCorrect && (
                                      <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                                    )}
                                  </div>
                                  <span className="ml-2 text-neutral-700 dark:text-neutral-300">
                                    {option.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.explanation && (
                            <div className="mt-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
                              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                <span className="font-medium">Explanation:</span> {question.explanation}
                              </p>
                            </div>
                          )}
                          
                          {question.sourceReference && (
                            <div className="mt-2">
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                <span className="font-medium">Source:</span> {question.sourceReference}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveQuiz}
                      disabled={isCreatingQuiz || !quizTitle.trim()}
                    >
                      {isCreatingQuiz ? 'Saving...' : 'Save Quiz'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;