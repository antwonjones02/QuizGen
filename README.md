# QuizGen

A comprehensive web application that transforms learning content into thought-provoking quiz questions. QuizGen analyzes uploaded documents, extracts key concepts, and generates questions that require critical thinking rather than simple recall.

## Features

### Document Processing
- Upload and process PDF, DOCX, TXT, and other document formats
- Advanced document parsing with accurate text extraction
- Conversion of all document formats to structured markdown
- Vector database for document content embeddings
- Preservation of document structure including headings, tables, and lists

### AI-Powered Question Generation
- Integration with OpenAI's GPT-4o
- Question hierarchy based on Bloom's Taxonomy
- Focus on open-ended, scenario-based, and application-focused questions
- Rationales and explanations for each question
- Direct references to source material
- Question quality scoring

### User Interface
- Intuitive, professional dashboard
- Document library management with version control
- Clean quiz creation workspace
- Interactive chat interface for customization
- Visualization tools for question analysis
- Export functionality in multiple formats

### Customization Controls
- Learning objectives and target audience specification
- Controls for question complexity, quantity, and format
- Topic filtering for specific sections or concepts
- Custom question templates and formatting
- Question validation tools

## Technical Stack

### Frontend
- React.js with TypeScript
- Responsive design
- Tailwind CSS
- Progressive web app functionality
- Redux for state management
- WCAG 2.1 AA accessibility compliance

### Backend
- Node.js and Express
- Document processing pipeline
- Vector database (Pinecone)
- OpenAI API integration
- Authentication and role-based access controls

### Data Management
- MongoDB for document storage
- Vector database for semantic search
- Secure data handling with encryption

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB
- OpenAI API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/antwonjones02/QuizGen.git
   cd QuizGen
   ```

2. Install dependencies
   ```
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory
   - Add your MongoDB connection string, OpenAI API key, and other configuration

4. Start the development servers
   ```
   # Start backend server
   cd server
   npm run dev
   
   # In a new terminal, start frontend
   cd client
   npm start
   ```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── store/          # Redux store
│       ├── styles/         # CSS and styling
│       └── utils/          # Utility functions
├── server/                 # Backend Node.js application
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
└── shared/                 # Shared code between client and server
    ├── types/              # TypeScript type definitions
    └── constants/          # Shared constants
```

## License

MIT