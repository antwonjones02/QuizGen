import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  DocumentTextIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { useGetDocumentsQuery, useDeleteDocumentMutation } from '../services/api';

const DocumentLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: documents, isLoading, error } = useGetDocumentsQuery();
  const [deleteDocument] = useDeleteDocumentMutation();

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

  const onDrop = (acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log('Accepted files:', acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
  });

  const handleCreateQuiz = (documentId: string) => {
    navigate(`/create?documentId=${documentId}`);
  };

  const handleDeleteDocument = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id).unwrap();
      } catch (err) {
        console.error('Failed to delete document:', err);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <DocumentTextIcon className="h-8 w-8 text-red-500" />;
      case 'docx':
      case 'doc':
        return <DocumentTextIcon className="h-8 w-8 text-blue-500" />;
      case 'txt':
        return <DocumentTextIcon className="h-8 w-8 text-neutral-500" />;
      case 'md':
        return <DocumentTextIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <DocumentIcon className="h-8 w-8 text-neutral-500" />;
    }
  };

  const filteredDocuments = displayDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Document Library</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Upload and manage your documents for quiz generation.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <div {...getRootProps()} className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-6 text-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
          <input {...getInputProps()} />
          <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-neutral-400" />
          <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag and drop files here, or click to select files'}
          </p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Supported formats: PDF, DOCX, DOC, TXT, MD
          </p>
        </div>
      </div>

      <div className="card">
        <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Your Documents</h2>
            <div className="mt-3 md:mt-0 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="form-input pl-10"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Uploaded
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    Loading documents...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-red-500">
                    Error loading documents. Please try again.
                  </td>
                </tr>
              ) : filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    No documents found.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getFileIcon(document.fileType)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900 dark:text-white">
                            {document.title}
                          </div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            {document.fileName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      {formatFileSize(document.fileSize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      {formatDate(document.uploadDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        document.processingStatus === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : document.processingStatus === 'processing'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : document.processingStatus === 'failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
                      }`}>
                        {document.processingStatus.charAt(0).toUpperCase() + document.processingStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                          title="View"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          title="Create Quiz"
                          onClick={() => handleCreateQuiz(document.id)}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete"
                          onClick={() => handleDeleteDocument(document.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentLibrary;