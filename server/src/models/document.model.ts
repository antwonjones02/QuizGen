import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  contentText: string;
  contentMarkdown: string;
  contentPreview: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  processingError?: string;
  vectorIds: string[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    fileName: {
      type: String,
      required: [true, 'Please add a file name'],
      trim: true,
    },
    fileType: {
      type: String,
      required: [true, 'Please add a file type'],
      enum: ['pdf', 'docx', 'doc', 'txt', 'md'],
    },
    fileSize: {
      type: Number,
      required: [true, 'Please add a file size'],
    },
    filePath: {
      type: String,
      required: [true, 'Please add a file path'],
    },
    contentText: {
      type: String,
      required: false,
    },
    contentMarkdown: {
      type: String,
      required: false,
    },
    contentPreview: {
      type: String,
      required: false,
      maxlength: [1000, 'Preview cannot be more than 1000 characters'],
    },
    processingStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    processingError: {
      type: String,
      required: false,
    },
    vectorIds: {
      type: [String],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster queries
DocumentSchema.index({ userId: 1 });
DocumentSchema.index({ title: 'text', contentText: 'text' });

export const Document = mongoose.model<IDocument>('Document', DocumentSchema);