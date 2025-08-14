// API service for communicating with the FastAPI backend

import { TodoItem, CreateTodoRequest, UpdateTodoRequest, ApiResponse } from '@/types/todo';

const API_BASE_URL = 'http://localhost:8000';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

// TODO API functions
export const todoApi = {
  // Get all TODO items
  async getTodos(): Promise<ApiResponse<TodoItem[]>> {
    return apiRequest<TodoItem[]>('/todos');
  },

  // Create a new TODO item
  async createTodo(todo: CreateTodoRequest): Promise<ApiResponse<TodoItem>> {
    return apiRequest<TodoItem>('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  },

  // Update a TODO item
  async updateTodo(id: string, updates: UpdateTodoRequest): Promise<ApiResponse<TodoItem>> {
    return apiRequest<TodoItem>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete a TODO item
  async deleteTodo(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiRequest<{ message: string }>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};
