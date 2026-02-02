#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============================================
// CONFIGURATION
// ============================================
const MCP_NAME = "bamboohr";
const MCP_VERSION = "1.0.0";

// ============================================
// API CLIENT
// ============================================
class BambooHRClient {
  private apiKey: string;
  private companyDomain: string;
  private baseUrl: string;

  constructor(apiKey: string, companyDomain: string) {
    this.apiKey = apiKey;
    this.companyDomain = companyDomain;
    this.baseUrl = `https://api.bamboohr.com/api/gateway.php/${companyDomain}/v1`;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const authHeader = Buffer.from(`${this.apiKey}:x`).toString("base64");
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Basic ${authHeader}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`BambooHR API error: ${response.status} ${response.statusText} - ${text}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Employee methods
  async listEmployees() {
    // Returns the employee directory with standard fields
    return this.get("/employees/directory");
  }

  async getEmployee(employeeId: string, fields?: string[]) {
    const fieldList = fields?.join(",") || "firstName,lastName,department,jobTitle,workEmail,workPhone,location,photoUrl,status";
    return this.get(`/employees/${employeeId}?fields=${fieldList}`);
  }

  async getDirectory() {
    return this.get("/employees/directory");
  }

  // Time Off methods
  async listTimeOffRequests(options?: {
    start?: string;
    end?: string;
    status?: string;
    employeeId?: string;
  }) {
    const params = new URLSearchParams();
    if (options?.start) params.append("start", options.start);
    if (options?.end) params.append("end", options.end);
    if (options?.status) params.append("status", options.status);
    if (options?.employeeId) params.append("employeeId", options.employeeId);
    
    const query = params.toString();
    return this.get(`/time_off/requests${query ? `?${query}` : ""}`);
  }

  async requestTimeOff(data: {
    employeeId: string;
    timeOffTypeId: string;
    start: string;
    end: string;
    amount?: number;
    notes?: string;
    status?: string;
  }) {
    return this.put(`/employees/${data.employeeId}/time_off/request`, {
      timeOffTypeId: data.timeOffTypeId,
      start: data.start,
      end: data.end,
      amount: data.amount,
      notes: data.notes,
      status: data.status || "requested",
    });
  }

  // Goals methods
  async listGoals(employeeId: string) {
    return this.get(`/employees/${employeeId}/goals`);
  }

  // Files methods
  async listFiles(employeeId: string) {
    return this.get(`/employees/${employeeId}/files/view`);
  }
}

// ============================================
// TOOL DEFINITIONS
// ============================================
const tools = [
  {
    name: "list_employees",
    description: "List all employees from the BambooHR directory",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_employee",
    description: "Get detailed information about a specific employee",
    inputSchema: {
      type: "object" as const,
      properties: {
        employee_id: { type: "string", description: "Employee ID" },
        fields: { 
          type: "array", 
          items: { type: "string" },
          description: "Specific fields to retrieve (e.g., firstName, lastName, department, jobTitle, workEmail, hireDate)"
        },
      },
      required: ["employee_id"],
    },
  },
  {
    name: "list_time_off_requests",
    description: "List time off requests from BambooHR",
    inputSchema: {
      type: "object" as const,
      properties: {
        start: { type: "string", description: "Start date (YYYY-MM-DD)" },
        end: { type: "string", description: "End date (YYYY-MM-DD)" },
        status: { 
          type: "string", 
          description: "Filter by status",
          enum: ["approved", "denied", "superceded", "requested", "canceled"]
        },
        employee_id: { type: "string", description: "Filter by employee ID" },
      },
    },
  },
  {
    name: "request_time_off",
    description: "Submit a time off request for an employee",
    inputSchema: {
      type: "object" as const,
      properties: {
        employee_id: { type: "string", description: "Employee ID" },
        time_off_type_id: { type: "string", description: "Time off type ID (e.g., vacation, sick)" },
        start: { type: "string", description: "Start date (YYYY-MM-DD)" },
        end: { type: "string", description: "End date (YYYY-MM-DD)" },
        amount: { type: "number", description: "Number of days/hours" },
        notes: { type: "string", description: "Request notes" },
      },
      required: ["employee_id", "time_off_type_id", "start", "end"],
    },
  },
  {
    name: "list_goals",
    description: "List goals for an employee",
    inputSchema: {
      type: "object" as const,
      properties: {
        employee_id: { type: "string", description: "Employee ID" },
      },
      required: ["employee_id"],
    },
  },
  {
    name: "get_directory",
    description: "Get the full employee directory with contact information",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "list_files",
    description: "List files associated with an employee",
    inputSchema: {
      type: "object" as const,
      properties: {
        employee_id: { type: "string", description: "Employee ID" },
      },
      required: ["employee_id"],
    },
  },
];

// ============================================
// TOOL HANDLERS
// ============================================
async function handleTool(client: BambooHRClient, name: string, args: any) {
  switch (name) {
    case "list_employees": {
      return await client.listEmployees();
    }
    case "get_employee": {
      return await client.getEmployee(args.employee_id, args.fields);
    }
    case "list_time_off_requests": {
      return await client.listTimeOffRequests({
        start: args.start,
        end: args.end,
        status: args.status,
        employeeId: args.employee_id,
      });
    }
    case "request_time_off": {
      return await client.requestTimeOff({
        employeeId: args.employee_id,
        timeOffTypeId: args.time_off_type_id,
        start: args.start,
        end: args.end,
        amount: args.amount,
        notes: args.notes,
      });
    }
    case "list_goals": {
      return await client.listGoals(args.employee_id);
    }
    case "get_directory": {
      return await client.getDirectory();
    }
    case "list_files": {
      return await client.listFiles(args.employee_id);
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ============================================
// SERVER SETUP
// ============================================
async function main() {
  const apiKey = process.env.BAMBOOHR_API_KEY;
  const companyDomain = process.env.BAMBOOHR_COMPANY_DOMAIN;
  
  if (!apiKey) {
    console.error("Error: BAMBOOHR_API_KEY environment variable required");
    process.exit(1);
  }
  if (!companyDomain) {
    console.error("Error: BAMBOOHR_COMPANY_DOMAIN environment variable required");
    process.exit(1);
  }

  const client = new BambooHRClient(apiKey, companyDomain);

  const server = new Server(
    { name: `${MCP_NAME}-mcp`, version: MCP_VERSION },
    { capabilities: { tools: {} } }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools,
  }));

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      const result = await handleTool(client, name, args || {});
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${MCP_NAME} MCP server running on stdio`);
}

main().catch(console.error);
