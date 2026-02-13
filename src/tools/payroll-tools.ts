import { BambooHRClient } from '../clients/bamboohr.js';
import type { PayStub, PayrollDeduction } from '../types/index.js';

export const payrollTools = {
  list_pay_stubs: {
    description: 'List pay stubs for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        start_date: {
          type: 'string',
          description: 'Start date filter (YYYY-MM-DD)',
        },
        end_date: {
          type: 'string',
          description: 'End date filter (YYYY-MM-DD)',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const params: any = {};
        if (args.start_date) params.start = args.start_date;
        if (args.end_date) params.end = args.end_date;
        
        const payStubs = await client.get<PayStub[]>(
          `/employees/${args.employee_id}/pay_stubs`,
          params
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          pay_stubs: payStubs,
          count: payStubs.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_payroll_data: {
    description: 'Get payroll data for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string }) => {
      try {
        const payroll = await client.get(`/employees/${args.employee_id}/payroll`);
        
        return {
          success: true,
          employee_id: args.employee_id,
          payroll,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_payroll_deductions: {
    description: 'List payroll deductions for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string }) => {
      try {
        const deductions = await client.get<PayrollDeduction[]>(
          `/employees/${args.employee_id}/payroll/deductions`
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          deductions,
          count: deductions.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
