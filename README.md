# QuizGen

QuizGen is a full-stack application that allows users to upload documents and automatically generate quizzes based on the content.

## Features

- User authentication and authorization
- Document upload and processing
- AI-powered quiz generation
- Quiz taking and scoring
- Performance analytics
- User feedback collection

## Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **AI Integration**: OpenAI API, Pinecone for vector storage

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)
- Git

## Environment Variables

### Server

Create a `.env` file in the `server` directory with the following variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index
```

### Client

The client uses the proxy setting in package.json to connect to the server in development mode.

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/antwonjones02/QuizGen.git
cd QuizGen
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd ../client
npm install
```

## Running the Application

### Development Mode

1. Start the server:

```bash
cd server
npm run dev
```

2. In a separate terminal, start the client:

```bash
cd client
npm start
```

The client will be available at http://localhost:3000 and the server at http://localhost:5000.

### Production Build

1. Build the client:

```bash
cd client
npm run build
```

2. Build the server:

```bash
cd ../server
npm run build
```

3. Start the production server:

```bash
npm start
```

In production mode, the server will serve the client build files.

## API Documentation

The API endpoints are organized into the following routes:

- `/api/auth` - Authentication routes
- `/api/documents` - Document management
- `/api/quizzes` - Quiz generation and management
- `/api/questions` - Question management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.