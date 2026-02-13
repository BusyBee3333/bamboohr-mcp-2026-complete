import { BambooHRClient } from '../clients/bamboohr.js';
import type { Report, CustomReport } from '../types/index.js';

export const reportsTools = {
  run_custom_report: {
    description: 'Run a custom report with specified fields and filters',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Report title',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Field IDs to include in the report',
        },
        format: {
          type: 'string',
          enum: ['JSON', 'XML', 'CSV', 'PDF', 'XLS'],
          description: 'Report format',
          default: 'JSON',
        },
        filters: {
          type: 'object',
          description: 'Report filters (e.g., {"status": "Active"})',
        },
      },
      required: ['fields'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const reportRequest: CustomReport = {
          title: args.title || 'Custom Report',
          fields: args.fields,
          filters: args.filters,
        };
        
        const format = (args.format || 'JSON').toUpperCase();
        const endpoint = '/reports/custom';
        
        let result;
        if (format === 'JSON') {
          result = await client.post(endpoint, reportRequest, {
            params: { format: 'JSON' },
          });
        } else {
          result = await client.post(endpoint, reportRequest, {
            params: { format },
          });
        }
        
        return {
          success: true,
          report: result,
          format,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_reports: {
    description: 'List all available reports',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const reports = await client.get<Report[]>('/reports');
        
        return {
          success: true,
          reports,
          count: reports.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_company_report: {
    description: 'Get a standard company report by ID',
    parameters: {
      type: 'object',
      properties: {
        report_id: {
          type: 'string',
          description: 'Report ID',
        },
        format: {
          type: 'string',
          enum: ['JSON', 'XML', 'CSV', 'PDF', 'XLS'],
          description: 'Report format',
          default: 'JSON',
        },
      },
      required: ['report_id'],
    },
    handler: async (client: BambooHRClient, args: { report_id: string; format?: string }) => {
      try {
        const format = (args.format || 'JSON').toUpperCase();
        const report = await client.get(`/reports/${args.report_id}`, { format });
        
        return {
          success: true,
          report,
          format,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
