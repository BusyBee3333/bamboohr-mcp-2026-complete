# BambooHR MCP Server

A complete Model Context Protocol (MCP) server for BambooHR with 47 tools and 18 React-based UI apps.

## Features

### 🔧 47 MCP Tools

#### Employee Management (9 tools)
- `list_employees` - List all employees with filtering
- `get_employee` - Get detailed employee information
- `create_employee` - Create new employee records
- `update_employee` - Update employee information
- `get_employee_directory` - Get full employee directory
- `get_custom_fields` - List all custom fields
- `get_employee_field_values` - Get specific field values
- `get_employee_photo` - Download employee photos
- `upload_employee_photo` - Upload employee photos

#### Time Off (8 tools)
- `list_time_off_requests` - List time off requests with filtering
- `get_time_off_request` - Get specific request details
- `create_time_off_request` - Create new time off requests
- `update_time_off_request_status` - Approve/deny requests
- `list_time_off_policies` - List all policies
- `get_time_off_balances` - Get employee balances
- `list_time_off_types` - List all time off types
- `estimate_future_balance` - Estimate future balances

#### Reports (3 tools)
- `run_custom_report` - Run custom reports with filters
- `list_reports` - List all available reports
- `get_company_report` - Get standard company reports

#### Tables (4 tools)
- `list_tables` - List all custom tables
- `get_table_rows` - Get table data
- `add_table_row` - Add new table rows
- `update_table_row` - Update table rows

#### Benefits (4 tools)
- `list_benefit_plans` - List all benefit plans
- `get_benefit_plan` - Get plan details
- `list_benefit_enrollments` - List employee enrollments
- `list_benefit_dependents` - List dependents

#### Payroll (3 tools)
- `list_pay_stubs` - List employee pay stubs
- `get_payroll_data` - Get payroll information
- `list_payroll_deductions` - List deductions

#### Goals (6 tools)
- `list_goals` - List employee goals
- `get_goal` - Get goal details
- `create_goal` - Create new goals
- `update_goal` - Update goals
- `close_goal` - Close/complete goals
- `list_goal_comments` - List goal comments

#### Training (6 tools)
- `list_training_courses` - List courses
- `get_training_course` - Get course details
- `create_training_course` - Assign courses
- `update_training_course` - Update assignments
- `list_training_categories` - List categories
- `list_training_types` - List training types

#### Files (4 tools)
- `list_employee_files` - List employee files
- `get_employee_file` - Download files
- `upload_employee_file` - Upload files
- `list_file_categories` - List file categories

#### Webhooks (3 tools)
- `list_webhooks` - List all webhooks
- `create_webhook` - Create new webhooks
- `delete_webhook` - Delete webhooks

### 🎨 18 React UI Apps

1. **employee-dashboard** - Overview dashboard with key metrics
2. **employee-directory** - Searchable employee directory
3. **employee-detail** - Detailed employee profile view
4. **time-off-calendar** - Visual time off calendar
5. **time-off-requests** - Request management interface
6. **time-off-balances** - Balance tracking and accrual
7. **benefits-overview** - Benefits summary
8. **benefits-enrollment** - Step-by-step enrollment wizard
9. **payroll-dashboard** - Payroll overview and pay stubs
10. **goal-tracker** - Goal management and progress
11. **training-catalog** - Available courses catalog
12. **training-progress** - Course progress and certifications
13. **file-manager** - Document management
14. **org-chart** - Visual organization chart
15. **headcount-analytics** - Workforce analytics
16. **turnover-report** - Turnover tracking and analysis
17. **new-hires** - New hire tracking and onboarding
18. **report-builder** - Custom report builder
19. **custom-report** - Custom report viewer

## Installation

```bash
npm install
```

## Configuration

Set the following environment variables:

```bash
export BAMBOOHR_COMPANY_DOMAIN="your-company"
export BAMBOOHR_API_KEY="your-api-key"
```

## Usage

### As MCP Server

```bash
npm run build
npm start
```

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bamboohr": {
      "command": "node",
      "args": ["/path/to/bamboohr/dist/main.js"],
      "env": {
        "BAMBOOHR_COMPANY_DOMAIN": "your-company",
        "BAMBOOHR_API_KEY": "your-api-key"
      }
    }
  }
}
```

## API Reference

### BambooHR API v1

Base URL: `https://api.bamboohr.com/api/gateway.php/{companyDomain}/v1/`

Authentication: Basic Auth with API key as username, "x" as password

## Architecture

```
src/
├── clients/
│   └── bamboohr.ts          # API client with error handling
├── tools/
│   ├── employees-tools.ts   # Employee management tools
│   ├── time-off-tools.ts    # Time off tools
│   ├── reports-tools.ts     # Reporting tools
│   ├── tables-tools.ts      # Custom tables tools
│   ├── benefits-tools.ts    # Benefits tools
│   ├── payroll-tools.ts     # Payroll tools
│   ├── goals-tools.ts       # Goals tools
│   ├── training-tools.ts    # Training tools
│   ├── files-tools.ts       # File management tools
│   └── webhooks-tools.ts    # Webhook tools
├── types/
│   └── index.ts             # TypeScript type definitions
├── ui/
│   └── react-app/           # 18+ React UI components
├── server.ts                # MCP server implementation
└── main.ts                  # Entry point
```

## Development

```bash
# Watch mode
npm run dev

# Build
npm run build

# Start
npm start
```

## Error Handling

The client includes comprehensive error handling for:
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 429 Rate Limit
- 500 Internal Server Error
- Network errors

All errors are returned in a consistent format:

```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

## Resources

The server exposes two MCP resources:
- `bamboohr://employees` - Employee directory
- `bamboohr://time-off` - Time off requests

## License

MIT

## Contributing

Contributions welcome! Please ensure all tools follow the established patterns and include proper error handling.

## Support

For BambooHR API documentation, visit: https://documentation.bamboohr.com/docs
