# TODO API Backend

A simple FastAPI backend for the TODO application.

## Setup

1. Make sure you have Python 3.8+ installed
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Backend

Start the FastAPI server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## API Endpoints

- `GET /` - API information
- `GET /todos` - Get all TODO items
- `POST /todos` - Create a new TODO item
- `PUT /todos/{id}` - Update a TODO item
- `DELETE /todos/{id}` - Delete a TODO item

## Features

- In-memory storage (no database required)
- CORS configured for Next.js frontend
- Input validation with Pydantic
- Comprehensive error handling
- Auto-generated API documentation
