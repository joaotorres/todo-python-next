# TODO Application - Next.js + FastAPI

A full-stack TODO application built with Next.js 14 frontend and FastAPI backend. This project demonstrates modern web development practices with TypeScript, Tailwind CSS, and Python.

## 🚀 Features

- **Frontend**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Backend**: FastAPI with Python, in-memory storage
- **Full CRUD Operations**: Create, Read, Update, Delete TODO items
- **Real-time Updates**: Immediate UI updates when data changes
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Type Safety**: Full TypeScript support for better development experience

## 📁 Project Structure

```
todo-node/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/       # Next.js App Router pages
│   │   ├── components/ # React components
│   │   ├── services/  # API services
│   │   └── types/     # TypeScript types
│   ├── package.json
│   └── README.md
├── backend/           # FastAPI backend application
│   ├── main.py       # FastAPI application
│   ├── requirements.txt
│   └── README.md
└── README.md         # This file
```

## 🛠️ Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.8+ (for backend)
- **npm** or **yarn** (for frontend dependencies)
- **pip** (for Python dependencies)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Navigate to the project directory
cd todo-node

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### 2. Start the Backend

```bash
# From the backend directory
cd backend
python main.py
```

The FastAPI server will start at http://localhost:8000

**Optional**: Visit http://localhost:8000/docs to see the interactive API documentation.

### 3. Start the Frontend

```bash
# From the frontend directory (in a new terminal)
cd frontend
npm run dev
```

The Next.js application will start at http://localhost:3000

### 4. Use the Application

Open http://localhost:3000 in your browser and start managing your TODO items!

## 📚 API Endpoints

The FastAPI backend provides the following REST endpoints:

- `GET /` - API information
- `GET /todos` - Get all TODO items
- `POST /todos` - Create a new TODO item
- `PUT /todos/{id}` - Update a TODO item
- `DELETE /todos/{id}` - Delete a TODO item

## 🎨 Features Explained

### Frontend (Next.js)
- **App Router**: Uses Next.js 14's new App Router for better performance
- **TypeScript**: Full type safety for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Error Handling**: User-friendly error messages and loading states
- **Responsive Design**: Works on all screen sizes

### Backend (FastAPI)
- **FastAPI**: Modern, fast web framework for building APIs
- **Pydantic**: Data validation using Python type annotations
- **CORS**: Configured to allow requests from the Next.js frontend
- **In-memory Storage**: Simple storage solution (no database required)
- **Auto-documentation**: Interactive API docs at `/docs`

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
```

### Backend Development
```bash
cd backend
python main.py                    # Start server
uvicorn main:app --reload        # Start with auto-reload
```

## 🧪 Testing the API

You can test the API endpoints using curl or any API client:

```bash
# Get all todos
curl http://localhost:8000/todos

# Create a new todo
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Learn Next.js and FastAPI"}'

# Update a todo
curl -X PUT http://localhost:8000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo
curl -X DELETE http://localhost:8000/todos/{id}
```

## 📖 Learning Resources

This project is designed to help you learn:

- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **FastAPI**: Modern Python web framework
- **REST APIs**: Building and consuming REST endpoints
- **Full-stack Development**: Connecting frontend and backend

## 🤝 Contributing

Feel free to enhance this project by:

1. Adding a database (PostgreSQL, SQLite, etc.)
2. Implementing user authentication
3. Adding due dates to TODO items
4. Creating categories/tags for TODO items
5. Adding search and filtering functionality
6. Implementing real-time updates with WebSockets

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Happy coding! 🎉
