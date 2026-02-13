import { BambooHRClient } from '../clients/bamboohr.js';
import type { Table, TableRow } from '../types/index.js';

export const tablesTools = {
  list_tables: {
    description: 'List all custom tables in BambooHR',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const tables = await client.get<Table[]>('/meta/tables');
        
        return {
          success: true,
          tables,
          count: tables.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_table_rows: {
    description: 'Get all rows from a custom table for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        table_name: {
          type: 'string',
          description: 'Table name or alias',
        },
      },
      required: ['employee_id', 'table_name'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; table_name: string }) => {
      try {
        const rows = await client.get<TableRow[]>(
          `/employees/${args.employee_id}/tables/${args.table_name}`
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          table_name: args.table_name,
          rows,
          count: rows.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  add_table_row: {
    description: 'Add a new row to a custom table',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        table_name: {
          type: 'string',
          description: 'Table name or alias',
        },
        row_data: {
          type: 'object',
          description: 'Row data as key-value pairs',
        },
      },
      required: ['employee_id', 'table_name', 'row_data'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; table_name: string; row_data: any }) => {
      try {
        const result = await client.post(
          `/employees/${args.employee_id}/tables/${args.table_name}`,
          args.row_data
        );
        
        return {
          success: true,
          row_id: result.id || result,
          message: 'Table row added successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  update_table_row: {
    description: 'Update an existing row in a custom table',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        table_name: {
          type: 'string',
          description: 'Table name or alias',
        },
        row_id: {
          type: 'string',
          description: 'Row ID',
        },
        row_data: {
          type: 'object',
          description: 'Updated row data',
        },
      },
      required: ['employee_id', 'table_name', 'row_id', 'row_data'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        await client.post(
          `/employees/${args.employee_id}/tables/${args.table_name}/${args.row_id}`,
          args.row_data
        );
        
        return {
          success: true,
          message: 'Table row updated successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
