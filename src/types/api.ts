// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// API Endpoints
export const API_ENDPOINTS = {
  POSTS: 'https://662029f13bf790e070af2cd8.mockapi.io/api/v1/posts',
} as const;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
}
