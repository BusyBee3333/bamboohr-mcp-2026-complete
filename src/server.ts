import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { BambooHRClient } from './clients/bamboohr.js';
import { employeesTools } from './tools/employees-tools.js';
import { timeOffTools } from './tools/time-off-tools.js';
import { reportsTools } from './tools/reports-tools.js';
import { tablesTools } from './tools/tables-tools.js';
import { benefitsTools } from './tools/benefits-tools.js';
import { payrollTools } from './tools/payroll-tools.js';
import { goalsTools } from './tools/goals-tools.js';
import { trainingTools } from './tools/training-tools.js';
import { filesTools } from './tools/files-tools.js';
import { webhooksTools } from './tools/webhooks-tools.js';

export class BambooHRServer {
  private server: Server;
  private client: BambooHRClient;
  private allTools: Map<string, any>;

  constructor() {
    this.server = new Server(
      {
        name: 'bamboohr-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    // Get config from environment
    const companyDomain = process.env.BAMBOOHR_COMPANY_DOMAIN;
    const apiKey = process.env.BAMBOOHR_API_KEY;

    if (!companyDomain || !apiKey) {
      throw new Error('BAMBOOHR_COMPANY_DOMAIN and BAMBOOHR_API_KEY environment variables are required');
    }

    this.client = new BambooHRClient({ companyDomain, apiKey });

    // Combine all tools
    this.allTools = new Map();
    Object.entries(employeesTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(timeOffTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(reportsTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(tablesTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(benefitsTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(payrollTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(goalsTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(trainingTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(filesTools).forEach(([key, val]) => this.allTools.set(key, val));
    Object.entries(webhooksTools).forEach(([key, val]) => this.allTools.set(key, val));

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools = Array.from(this.allTools.entries()).map(([name, tool]) => ({
        name,
        description: tool.description,
        inputSchema: tool.parameters,
      }));

      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const toolName = request.params.name;
      const tool = this.allTools.get(toolName);

      if (!tool) {
        throw new Error(`Unknown tool: ${toolName}`);
      }

      try {
        const result = await tool.handler(this.client, request.params.arguments || {});
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ success: false, error: error.message }, null, 2),
            },
          ],
          isError: true,
        };
      }
    });

    // List resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'bamboohr://employees',
            name: 'Employee Directory',
            description: 'Access to all employees in the directory',
            mimeType: 'application/json',
          },
          {
            uri: 'bamboohr://time-off',
            name: 'Time Off Requests',
            description: 'All time off requests and balances',
            mimeType: 'application/json',
          },
        ],
      };
    });

    // Read resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;

      if (uri === 'bamboohr://employees') {
        const directory = await this.client.get('/employees/directory');
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(directory, null, 2),
            },
          ],
        };
      } else if (uri === 'bamboohr://time-off') {
        const requests = await this.client.get('/time_off/requests');
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(requests, null, 2),
            },
          ],
        };
      }

      throw new Error(`Unknown resource: ${uri}`);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('BambooHR MCP Server running on stdio');
  }
}
