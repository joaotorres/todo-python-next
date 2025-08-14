// TypeScript interfaces for TODO items and API requests/responses

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
}

export interface CreateTodoRequest {
  text: string;
}

export interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
