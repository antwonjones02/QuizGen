import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth';
import { 
  uploadDocument, 
  getDocuments, 
  getDocument, 
  updateDocument, 
  deleteDocument,
  processDocument
} from '../controllers/document.controller';
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

// File filter to only allow certain file types
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedFileTypes = ['.pdf', '.docx', '.txt', '.md'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported. Please upload PDF, DOCX, TXT, or MD files.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // Default 10MB
  }
});

const router = express.Router();

// Upload document
router.post(
  '/',
  protect,
  upload.single('file'),
  uploadDocument
);

// Process document (extract text, create vectors, etc.)
router.post(
  '/:id/process',
  protect,
  processDocument
);

// Get all documents for current user
router.get(
  '/',
  protect,
  getDocuments
);

// Get single document
router.get(
  '/:id',
  protect,
  getDocument
);

// Update document
router.put(
  '/:id',
  protect,
  [
    body('title', 'Title is required').optional().not().isEmpty(),
  ],
  updateDocument
);

// Delete document
router.delete(
  '/:id',
  protect,
  deleteDocument
);

export default router;