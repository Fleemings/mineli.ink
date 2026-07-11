// Shared types between frontend and backend

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User related
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Auth related
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

