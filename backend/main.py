from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

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

# In-memory storage for TODO items
# In a real application, this would be a database
todos: List[TodoItem] = []

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
async def get_todos():
    """Get all TODO items"""
    return todos

@app.post("/todos", response_model=TodoItem)
async def create_todo(todo_request: CreateTodoRequest):
    """Create a new TODO item"""
    # Validate that text is not empty
    if not todo_request.text.strip():
        raise HTTPException(status_code=400, detail="Todo text cannot be empty")
    
    # Create new TODO item
    new_todo = TodoItem(
        id=str(uuid.uuid4()),
        text=todo_request.text.strip(),
        completed=False,
        created_at=datetime.now().isoformat()
    )
    
    # Add to in-memory storage
    todos.append(new_todo)
    
    return new_todo

@app.put("/todos/{todo_id}", response_model=TodoItem)
async def update_todo(todo_id: str, todo_request: UpdateTodoRequest):
    """Update a TODO item"""
    # Find the TODO item
    todo_index = None
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            todo_index = i
            break
    
    if todo_index is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    # Update the TODO item
    if todo_request.text is not None:
        if not todo_request.text.strip():
            raise HTTPException(status_code=400, detail="Todo text cannot be empty")
        todos[todo_index].text = todo_request.text.strip()
    
    if todo_request.completed is not None:
        todos[todo_index].completed = todo_request.completed
    
    return todos[todo_index]

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: str):
    """Delete a TODO item"""
    # Find and remove the TODO item
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            deleted_todo = todos.pop(i)
            return {"message": f"Todo '{deleted_todo.text}' deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Todo not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
