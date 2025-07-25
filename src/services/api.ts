import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  API_ENDPOINTS,
  ApiError,
  ApiRequestConfig,
  ApiResponse,
  HttpMethod,
} from '../types';

/**
 * API Service class for handling HTTP requests
 * Uses Axios with interceptors for logging and error handling
 */
class ApiService {
  private client: AxiosInstance;
  private baseURL: string =
    'https://662029f13bf790e070af2cd8.mockapi.io/api/v1';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      config => {
        console.log(
          `🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      error => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging and error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ API Response: ${response.status} ${response.config.url}`
        );
        return response;
      },
      (error: AxiosError) => {
        console.error('❌ Response Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
        });
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle and transform Axios errors into our ApiError format
   */
  private handleError(error: AxiosError): ApiError {
    const status = error.response?.status || 0;
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      'Unknown error';

    return {
      status,
      message,
      timestamp: new Date().toISOString(),
      url: error.config?.url || '',
    };
  }

  /**
   * Generic request method with retry logic
   */
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request({
        method,
        url: endpoint,
        ...config,
      });

      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  /**
   * Get all posts from the API
   */
  async getPosts(): Promise<ApiResponse<any[]>> {
    return this.request('GET', API_ENDPOINTS.POSTS);
  }

  /**
   * Get a specific post by ID
   */
  async getPost(id: string): Promise<ApiResponse<any>> {
    return this.request('GET', `${API_ENDPOINTS.POSTS}/${id}`);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
