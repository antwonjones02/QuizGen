import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import DocumentLibrary from './pages/DocumentLibrary';
import QuizCreator from './pages/QuizCreator';
import QuizPreview from './pages/QuizPreview';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="documents" element={<DocumentLibrary />} />
          <Route path="create" element={<QuizCreator />} />
          <Route path="preview/:id" element={<QuizPreview />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;