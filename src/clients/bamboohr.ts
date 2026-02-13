import axios, { AxiosInstance, AxiosError } from 'axios';
import type { BambooHRConfig, BambooHRError } from '../types/index.js';

export class BambooHRClient {
  private client: AxiosInstance;
  private companyDomain: string;
  private baseURL: string;

  constructor(config: BambooHRConfig) {
    this.companyDomain = config.companyDomain;
    this.baseURL = `https://api.bamboohr.com/api/gateway.php/${this.companyDomain}/v1`;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      auth: {
        username: config.apiKey,
        password: 'x',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): BambooHRError {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      
      switch (status) {
        case 400:
          return {
            message: 'Bad Request: ' + (data?.message || 'Invalid request parameters'),
            status,
            errors: data?.errors,
          };
        case 401:
          return {
            message: 'Unauthorized: Invalid API key or company domain',
            status,
          };
        case 403:
          return {
            message: 'Forbidden: Insufficient permissions',
            status,
          };
        case 404:
          return {
            message: 'Not Found: ' + (data?.message || 'Resource not found'),
            status,
          };
        case 429:
          return {
            message: 'Rate Limit Exceeded: Too many requests',
            status,
          };
        case 500:
          return {
            message: 'Internal Server Error: BambooHR service error',
            status,
          };
        default:
          return {
            message: data?.message || error.message || 'Unknown error occurred',
            status,
          };
      }
    } else if (error.request) {
      return {
        message: 'Network Error: No response received from BambooHR',
      };
    } else {
      return {
        message: error.message || 'Request setup error',
      };
    }
  }

  // Generic GET request
  async get<T = any>(endpoint: string, params?: any): Promise<T> {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }

  // Generic POST request
  async post<T = any>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post(endpoint, data, config);
    return response.data;
  }

  // Generic PUT request
  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.put(endpoint, data);
    return response.data;
  }

  // Generic DELETE request
  async delete<T = any>(endpoint: string): Promise<T> {
    const response = await this.client.delete(endpoint);
    return response.data;
  }

  // GET request with XML format
  async getXML(endpoint: string, params?: any): Promise<any> {
    const response = await this.client.get(endpoint, {
      params,
      headers: { 'Accept': 'application/xml' },
    });
    return response.data;
  }

  // POST with file upload
  async uploadFile(endpoint: string, file: Buffer, fileName: string, shareWithEmployee: boolean = false): Promise<any> {
    const formData = new FormData();
    const blob = new Blob([new Uint8Array(file)]);
    formData.append('file', blob, fileName);
    formData.append('share', shareWithEmployee.toString());

    const response = await this.client.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Download file
  async downloadFile(endpoint: string): Promise<Buffer> {
    const response = await this.client.get(endpoint, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data);
  }

  getCompanyDomain(): string {
    return this.companyDomain;
  }

  getBaseURL(): string {
    return this.baseURL;
  }
}
