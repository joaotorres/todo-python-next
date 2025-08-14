from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from database import get_db, create_tables, Todo

# Create FastAPI app instance
app = FastAPI(title="TODO API", description="A simple TODO API with FastAPI", version="1.0.0")

# Configure CORS to allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response validation
class TodoItem(BaseModel):
    id: str
    text: str
    completed: bool
    created_at: str

class CreateTodoRequest(BaseModel):
    text: str

class UpdateTodoRequest(BaseModel):
    text: Optional[str] = None
    completed: Optional[bool] = None

# Create database tables on startup
create_tables()

@app.get("/")
async def root():
    """Root endpoint - returns API information"""
    return {
        "message": "TODO API is running!",
        "version": "1.0.0",
        "endpoints": {
            "GET /todos": "Get all TODO items",
            "POST /todos": "Create a new TODO item",
            "PUT /todos/{id}": "Update a TODO item",
            "DELETE /todos/{id}": "Delete a TODO item"
        }
    }

@app.get("/todos", response_model=List[TodoItem])
async def get_todos(db: Session = Depends(get_db)):
    """Get all TODO items"""
    todos = db.query(Todo).all()
    return [
        TodoItem(
            id=todo.id,
            text=todo.text,
            completed=todo.completed,
            created_at=todo.created_at.isoformat()
        )
        for todo in todos
    ]

@app.post("/todos", response_model=TodoItem)
async def create_todo(todo_request: CreateTodoRequest, db: Session = Depends(get_db)):
    """Create a new TODO item"""
    # Validate that text is not empty
    if not todo_request.text.strip():
        raise HTTPException(status_code=400, detail="Todo text cannot be empty")
    
    # Create new TODO item in database
    db_todo = Todo(
        id=str(uuid.uuid4()),
        text=todo_request.text.strip(),
        completed=False
    )
    
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    
    return TodoItem(
        id=db_todo.id,
        text=db_todo.text,
        completed=db_todo.completed,
        created_at=db_todo.created_at.isoformat()
    )

@app.put("/todos/{todo_id}", response_model=TodoItem)
async def update_todo(todo_id: str, todo_request: UpdateTodoRequest, db: Session = Depends(get_db)):
    """Update a TODO item"""
    # Find the TODO item in database
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    # Update the TODO item
    if todo_request.text is not None:
        if not todo_request.text.strip():
            raise HTTPException(status_code=400, detail="Todo text cannot be empty")
        db_todo.text = todo_request.text.strip()
    
    if todo_request.completed is not None:
        db_todo.completed = todo_request.completed
    
    db.commit()
    db.refresh(db_todo)
    
    return TodoItem(
        id=db_todo.id,
        text=db_todo.text,
        completed=db_todo.completed,
        created_at=db_todo.created_at.isoformat()
    )

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: str, db: Session = Depends(get_db)):
    """Delete a TODO item"""
    # Find and remove the TODO item from database
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    deleted_text = db_todo.text
    db.delete(db_todo)
    db.commit()
    
    return {"message": f"Todo '{deleted_text}' deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
