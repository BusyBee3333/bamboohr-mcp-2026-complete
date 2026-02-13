import { BambooHRClient } from '../clients/bamboohr.js';
import type { File, FileCategory } from '../types/index.js';

export const filesTools = {
  list_employee_files: {
    description: 'List files for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        category_id: {
          type: 'string',
          description: 'Filter by category ID',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; category_id?: string }) => {
      try {
        const params = args.category_id ? { categoryId: args.category_id } : {};
        const files = await client.get<File[]>(
          `/employees/${args.employee_id}/files`,
          params
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          files,
          count: files.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_employee_file: {
    description: 'Download a specific file',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        file_id: {
          type: 'string',
          description: 'File ID',
        },
      },
      required: ['employee_id', 'file_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; file_id: string }) => {
      try {
        const file = await client.downloadFile(
          `/employees/${args.employee_id}/files/${args.file_id}`
        );
        
        return {
          success: true,
          file_id: args.file_id,
          file_data: file.toString('base64'),
          message: 'File downloaded successfully (base64 encoded)',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  upload_employee_file: {
    description: 'Upload a file for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        file_base64: {
          type: 'string',
          description: 'Base64 encoded file data',
        },
        filename: {
          type: 'string',
          description: 'Filename',
        },
        category_id: {
          type: 'string',
          description: 'File category ID',
        },
        share_with_employee: {
          type: 'boolean',
          description: 'Share file with employee',
          default: false,
        },
      },
      required: ['employee_id', 'file_base64', 'filename'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const fileBuffer = Buffer.from(args.file_base64, 'base64');
        
        const result = await client.uploadFile(
          `/employees/${args.employee_id}/files/${args.category_id || ''}`,
          fileBuffer,
          args.filename,
          args.share_with_employee || false
        );
        
        return {
          success: true,
          file_id: result.id || result,
          message: 'File uploaded successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_file_categories: {
    description: 'List all file categories',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const categories = await client.get<FileCategory[]>('/meta/files/categories');
        
        return {
          success: true,
          categories,
          count: categories.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
