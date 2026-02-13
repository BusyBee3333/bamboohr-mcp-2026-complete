import { BambooHRClient } from '../clients/bamboohr.js';
import type { TimeOffRequest, TimeOffPolicy, TimeOffBalance, TimeOffType } from '../types/index.js';

export const timeOffTools = {
  list_time_off_requests: {
    description: 'List time off requests with filtering',
    parameters: {
      type: 'object',
      properties: {
        start_date: {
          type: 'string',
          description: 'Start date (YYYY-MM-DD)',
        },
        end_date: {
          type: 'string',
          description: 'End date (YYYY-MM-DD)',
        },
        status: {
          type: 'string',
          enum: ['approved', 'denied', 'superceded', 'requested', 'canceled'],
          description: 'Filter by status',
        },
        employee_id: {
          type: 'string',
          description: 'Filter by specific employee',
        },
        type_id: {
          type: 'string',
          description: 'Filter by time off type ID',
        },
      },
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const params: any = {};
        if (args.start_date) params.start = args.start_date;
        if (args.end_date) params.end = args.end_date;
        if (args.status) params.status = args.status;
        if (args.employee_id) params.employeeId = args.employee_id;
        if (args.type_id) params.type = args.type_id;
        
        const requests = await client.get<TimeOffRequest[]>('/time_off/requests', params);
        
        return {
          success: true,
          requests,
          count: requests.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_time_off_request: {
    description: 'Get details of a specific time off request',
    parameters: {
      type: 'object',
      properties: {
        request_id: {
          type: 'string',
          description: 'Time off request ID',
        },
      },
      required: ['request_id'],
    },
    handler: async (client: BambooHRClient, args: { request_id: string }) => {
      try {
        const request = await client.get<TimeOffRequest>(`/time_off/requests/${args.request_id}`);
        
        return {
          success: true,
          request,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  create_time_off_request: {
    description: 'Create a new time off request',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        type_id: {
          type: 'string',
          description: 'Time off type ID',
        },
        start_date: {
          type: 'string',
          description: 'Start date (YYYY-MM-DD)',
        },
        end_date: {
          type: 'string',
          description: 'End date (YYYY-MM-DD)',
        },
        amount: {
          type: 'number',
          description: 'Amount in hours or days',
        },
        notes: {
          type: 'string',
          description: 'Employee notes',
        },
      },
      required: ['employee_id', 'type_id', 'start_date', 'end_date'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const requestData = {
          employeeId: args.employee_id,
          timeOffTypeId: args.type_id,
          start: args.start_date,
          end: args.end_date,
          amount: args.amount,
          notes: args.notes,
        };
        
        const result = await client.post('/time_off/requests', requestData);
        
        return {
          success: true,
          request_id: result.id || result,
          message: 'Time off request created successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  update_time_off_request_status: {
    description: 'Approve or deny a time off request',
    parameters: {
      type: 'object',
      properties: {
        request_id: {
          type: 'string',
          description: 'Time off request ID',
        },
        status: {
          type: 'string',
          enum: ['approved', 'denied', 'canceled'],
          description: 'New status',
        },
        note: {
          type: 'string',
          description: 'Manager note',
        },
      },
      required: ['request_id', 'status'],
    },
    handler: async (client: BambooHRClient, args: { request_id: string; status: string; note?: string }) => {
      try {
        const data = {
          status: args.status,
          note: args.note,
        };
        
        await client.put(`/time_off/requests/${args.request_id}/status`, data);
        
        return {
          success: true,
          message: `Time off request ${args.status} successfully`,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_time_off_policies: {
    description: 'List all time off policies',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const policies = await client.get<TimeOffPolicy[]>('/time_off/policies');
        
        return {
          success: true,
          policies,
          count: policies.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_time_off_balances: {
    description: 'Get time off balances for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        as_of_date: {
          type: 'string',
          description: 'Calculate balance as of this date (YYYY-MM-DD)',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; as_of_date?: string }) => {
      try {
        const params = args.as_of_date ? { end: args.as_of_date } : {};
        const balances = await client.get<TimeOffBalance[]>(
          `/employees/${args.employee_id}/time_off/calculator`,
          params
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          balances,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_time_off_types: {
    description: 'List all time off types',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const types = await client.get<TimeOffType[]>('/meta/time_off/types');
        
        return {
          success: true,
          types,
          count: types.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  estimate_future_balance: {
    description: 'Estimate future time off balance for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        end_date: {
          type: 'string',
          description: 'Future date to estimate balance (YYYY-MM-DD)',
        },
      },
      required: ['employee_id', 'end_date'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; end_date: string }) => {
      try {
        const balances = await client.get<TimeOffBalance[]>(
          `/employees/${args.employee_id}/time_off/calculator`,
          { end: args.end_date }
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          as_of_date: args.end_date,
          balances,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
