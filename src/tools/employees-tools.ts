import { BambooHRClient } from '../clients/bamboohr.js';
import type { Employee, EmployeeDirectory, CustomField } from '../types/index.js';

export const employeesTools = {
  list_employees: {
    description: 'List all employees with basic information',
    parameters: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['Active', 'Inactive', 'All'],
          description: 'Filter by employee status',
          default: 'Active',
        },
      },
    },
    handler: async (client: BambooHRClient, args: { status?: string }) => {
      try {
        const directory = await client.get<EmployeeDirectory>('/employees/directory');
        let employees = directory.employees || [];
        
        if (args.status && args.status !== 'All') {
          employees = employees.filter(emp => emp.status === args.status);
        }
        
        return {
          success: true,
          employees,
          count: employees.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_employee: {
    description: 'Get detailed information about a specific employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific fields to retrieve (optional, returns all if not specified)',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; fields?: string[] }) => {
      try {
        const fieldsParam = args.fields?.join(',') || '';
        const employee = await client.get<Employee>(
          `/employees/${args.employee_id}`,
          fieldsParam ? { fields: fieldsParam } : {}
        );
        
        return {
          success: true,
          employee,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  create_employee: {
    description: 'Create a new employee record',
    parameters: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
          description: 'First name',
        },
        last_name: {
          type: 'string',
          description: 'Last name',
        },
        email: {
          type: 'string',
          description: 'Work email',
        },
        employee_data: {
          type: 'object',
          description: 'Additional employee data (job title, department, hire date, etc.)',
        },
      },
      required: ['first_name', 'last_name'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const employeeData = {
          firstName: args.first_name,
          lastName: args.last_name,
          workEmail: args.email,
          ...args.employee_data,
        };
        
        const result = await client.post('/employees', employeeData);
        
        return {
          success: true,
          employee_id: result.id || result,
          message: 'Employee created successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  update_employee: {
    description: 'Update employee information',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        employee_data: {
          type: 'object',
          description: 'Employee data to update',
        },
      },
      required: ['employee_id', 'employee_data'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; employee_data: any }) => {
      try {
        await client.post(`/employees/${args.employee_id}`, args.employee_data);
        
        return {
          success: true,
          message: 'Employee updated successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_employee_directory: {
    description: 'Get the employee directory with all fields',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const directory = await client.get<EmployeeDirectory>('/employees/directory');
        
        return {
          success: true,
          directory,
          employee_count: directory.employees?.length || 0,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_custom_fields: {
    description: 'Get list of all custom employee fields',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const fields = await client.get<{ field: CustomField[] }>('/meta/fields');
        
        return {
          success: true,
          fields: fields.field || fields,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_employee_field_values: {
    description: 'Get specific field values for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        field_list: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of field IDs to retrieve',
        },
      },
      required: ['employee_id', 'field_list'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; field_list: string[] }) => {
      try {
        const fields = args.field_list.join(',');
        const values = await client.get(`/employees/${args.employee_id}`, { fields });
        
        return {
          success: true,
          employee_id: args.employee_id,
          values,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_employee_photo: {
    description: 'Get employee photo',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        size: {
          type: 'string',
          enum: ['small', 'medium', 'large', 'original'],
          description: 'Photo size',
          default: 'medium',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; size?: string }) => {
      try {
        const size = args.size || 'medium';
        const photo = await client.downloadFile(`/employees/${args.employee_id}/photo/${size}`);
        
        return {
          success: true,
          photo: photo.toString('base64'),
          size,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  upload_employee_photo: {
    description: 'Upload employee photo',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        photo_base64: {
          type: 'string',
          description: 'Base64 encoded photo data',
        },
        filename: {
          type: 'string',
          description: 'Filename for the photo',
          default: 'photo.jpg',
        },
      },
      required: ['employee_id', 'photo_base64'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; photo_base64: string; filename?: string }) => {
      try {
        const photoBuffer = Buffer.from(args.photo_base64, 'base64');
        const filename = args.filename || 'photo.jpg';
        
        await client.uploadFile(`/employees/${args.employee_id}/photo`, photoBuffer, filename);
        
        return {
          success: true,
          message: 'Photo uploaded successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
