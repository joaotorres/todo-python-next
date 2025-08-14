'use client';

import { useState, useEffect } from 'react';
import { TodoItem } from '@/types/todo';
import { todoApi } from '@/services/api';

export default function TodoList() {
  // State for TODO items and form input
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load TODO items on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Function to load all TODO items from the API
  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    
    const response = await todoApi.getTodos();
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos(response.data);
    }
    
    setLoading(false);
  };

  // Function to add a new TODO item
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTodoText.trim()) return;
    
    const response = await todoApi.createTodo({ text: newTodoText.trim() });
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos(prev => [...prev, response.data!]);
      setNewTodoText(''); // Clear the input
      setError(null);
    }
  };

  // Function to toggle TODO completion status
  const toggleTodo = async (todo: TodoItem) => {
    const response = await todoApi.updateTodo(todo.id, { completed: !todo.completed });
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos(prev => prev.map(t => t.id === todo.id ? response.data! : t));
      setError(null);
    }
  };

  // Function to delete a TODO item
  const deleteTodo = async (id: string) => {
    const response = await todoApi.deleteTodo(id);
    
    if (response.error) {
      setError(response.error);
    } else {
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    }
  };

  // Function to update TODO text (for future enhancement)
  const updateTodoText = async (id: string, newText: string) => {
    if (!newText.trim()) return;
    
    const response = await todoApi.updateTodo(id, { text: newText.trim() });
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos(prev => prev.map(t => t.id === id ? response.data! : t));
      setError(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My TODO List</h1>
        <p className="text-gray-600">Keep track of your tasks</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Add TODO Form */}
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!newTodoText.trim() || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </form>

      {/* TODO List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No TODO items yet. Add one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm ${
                todo.completed ? 'opacity-75' : ''
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              
              {/* TODO Text */}
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              
              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                title="Delete TODO"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            {todos.filter(t => t.completed).length} of {todos.length} completed
          </p>
        </div>
      )}
    </div>
  );
}
