import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB connection string is not defined in environment variables');
    }
    
    const conn = await mongoose.connect(mongoURI);
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    // Set up connection error handlers
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
    
    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};